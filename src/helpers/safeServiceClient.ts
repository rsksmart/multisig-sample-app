// import { SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import SafeServiceClient, { SafeMultisigTransactionListResponse, SafeMultisigTransactionResponse } from '@gnosis.pm/safe-service-client'
import { toChecksumAddress } from '@rsksmart/rsk-utils'
import { getContracts } from '../config'
import { TransactionStatus } from '../constants'
import { TransactionBundle } from '../pages/safeInteraction'

// the transaction service requires the Ethereum checksum
const toEthereumChecksum = (address: string) => toChecksumAddress(address)

// create the safe service client:
const getSafeService = (safe: Safe) =>
  safe.getChainId().then((chainId: number) =>
    new SafeServiceClient(getContracts(chainId).safeTransactionService))

// Convert the response from the transaction service to our Sample Apps "TransactionByndle"
const convertToBundle = (transactionResponse: SafeMultisigTransactionResponse) => {
  const safeTransaction = new SafeTransaction({
    to: transactionResponse.to,
    value: transactionResponse.value,
    data: transactionResponse.data || '',
    safeTxGas: transactionResponse.safeTxGas,
    baseGas: transactionResponse.baseGas,
    gasPrice: parseInt(transactionResponse.gasPrice),
    nonce: transactionResponse.nonce,
    operation: transactionResponse.operation,
    gasToken: transactionResponse.gasToken,
    refundReceiver: transactionResponse.refundReceiver || ''
  })

  const response: TransactionBundle = {
    transaction: safeTransaction,
    hash: transactionResponse.safeTxHash,
    status: transactionResponse.isExecuted ? TransactionStatus.EXECUTED : TransactionStatus.PENDING,
    isReject: false
  }

  return response
}

export const getTransactions = (safe: Safe) =>
  getSafeService(safe).then((safeService: SafeServiceClient) =>
    safeService.getMultisigTransactions(toEthereumChecksum(safe.getAddress()))
      .then((value: SafeMultisigTransactionListResponse) => {
        const bundleArray: TransactionBundle[] = []
        value.results.forEach((transaction: SafeMultisigTransactionResponse) =>
          bundleArray.push(convertToBundle(transaction)))

        // sort by nonce
        return bundleArray.sort((a: TransactionBundle, b: TransactionBundle) =>
          (a.transaction.data.nonce > b.transaction.data.nonce) ? 1 : -1)
      }))

export const publishPendingTransaction = (
  bundle: TransactionBundle,
  safe: Safe
) => new Promise((resolve, reject) =>
  // get the signer to get the signature later
  safe.getSigner()?.getAddress().then((signerAddress: string) => {
    // get the signature on the transaction
    const signature = bundle.transaction.signatures.get(signerAddress.toLowerCase())

    if (!signature) { reject(new Error('Current account is not a signer on the transaction')) }

    signature && getSafeService(safe).then((safeService: SafeServiceClient) =>
      safeService.proposeTransaction(
        toEthereumChecksum(safe.getAddress()),
        {
          ...bundle.transaction.data,
          to: toEthereumChecksum(bundle.transaction.data.to)
        },
        bundle.hash,
        signature
      )
        .then((value: any) =>
          value === '' ? resolve(true) : reject(new Error(JSON.stringify(value))))
        .catch((err: Error) => reject(err))
    )
  })
)
