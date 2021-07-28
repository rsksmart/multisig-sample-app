import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import SafeServiceClient, { SafeMultisigTransactionListResponse, SafeMultisigTransactionResponse } from '@gnosis.pm/safe-service-client'
import { toChecksumAddress } from '@rsksmart/rsk-utils'
import { getContracts } from '../config'
import { TransactionStatus } from '../constants'
import { TransactionBundle } from '../pages/safeInteraction'
import axios from 'axios'

// the transaction service requires the Ethereum checksum
const toEthereumChecksum = (address: string) => toChecksumAddress(address)

const getSafeServiceUrl = (safe: Safe) => safe.getChainId().then((chainId: number) => getContracts(chainId).safeTransactionService)

// create the safe service client:
const getSafeService = (safe: Safe) => getSafeServiceUrl(safe).then(url => new SafeServiceClient(url))

// Convert the response from the transaction service to our Sample Apps "TransactionBundle"
const convertToBundle = (transactionResponse: SafeMultisigTransactionResponse, safeNonce: number) => {
  const transaction = new SafeTransaction({
    to: transactionResponse.to,
    value: transactionResponse.value,
    data: transactionResponse.data || '0x',
    safeTxGas: transactionResponse.safeTxGas,
    baseGas: transactionResponse.baseGas,
    gasPrice: parseInt(transactionResponse.gasPrice),
    nonce: transactionResponse.nonce,
    operation: transactionResponse.operation,
    gasToken: transactionResponse.gasToken,
    refundReceiver: transactionResponse.refundReceiver || ''
  })

  const isReject = (
    transactionResponse.to.toLowerCase() === transactionResponse.safe.toLowerCase() &&
    transactionResponse.value === '0' &&
    !transactionResponse.data)

  // Transaction Status
  let status = TransactionStatus.PENDING
  if (transactionResponse.isExecuted) {
    status = TransactionStatus.EXECUTED
  } else if (transactionResponse.nonce < safeNonce) {
    status = TransactionStatus.REJECTED
  }
  const { confirmations } = transactionResponse

  const response: TransactionBundle = {
    transaction,
    hash: transactionResponse.safeTxHash,
    status,
    isReject,
    confirmations
  }

  return response
}

export const getTransactions = (safe: Safe, safeNonce: number) =>
  getSafeService(safe).then((safeService: SafeServiceClient) =>
    safeService.getMultisigTransactions(toEthereumChecksum(safe.getAddress()))
      .then((value: SafeMultisigTransactionListResponse) => {
        if (value.results.length === 0) return []

        // convert the response into a bundles
        const bundleArray = value.results.map((transaction: SafeMultisigTransactionResponse) =>
          convertToBundle(transaction, safeNonce))

        // sort by nonce
        return bundleArray.sort((a: TransactionBundle, b: TransactionBundle) =>
          (a.transaction.data.nonce > b.transaction.data.nonce) ? 1 : -1)
      }))

export const createOrUpdateTransaction = (
  bundle: TransactionBundle,
  safe: Safe
) => new Promise((resolve, reject) =>
  Promise.all([getSafeServiceUrl(safe), safe.getSigner()?.getAddress()]).then(([safeServiceUrl, signerAddress]) => {
    if (!signerAddress) {
      return reject(new Error('The current safe has no signed associated.'))
    }
    const bodyWithoutSignature = {
      ...bundle.transaction.data,
      to: toEthereumChecksum(bundle.transaction.data.to),
      contractTransactionHash: bundle.hash,
      sender: signerAddress
    }
    const signature = bundle.transaction.signatures?.get(signerAddress.toLowerCase())
    const body = signature ? { ...bodyWithoutSignature, signature: signature.data } : bodyWithoutSignature

    const safeAddress = toEthereumChecksum(safe.getAddress())
    const url = `${safeServiceUrl}/api/v1/safes/${safeAddress}/multisig-transactions/`
    axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => resolve(true))
      .catch((error) => {
        reject(error)
      })
  }))
