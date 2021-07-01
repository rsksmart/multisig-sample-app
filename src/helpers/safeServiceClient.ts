// import { SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import SafeServiceClient, { SafeMultisigTransactionListResponse, SafeMultisigTransactionResponse } from '@gnosis.pm/safe-service-client'
import { toChecksumAddress } from '@rsksmart/rsk-utils'
import { TransactionStatus } from '../constants'
import { TransactionBundle } from '../pages/safeInteraction'

// the transaction service requires the Ethereum checksum
const toEthereumChecksum = (address: string) => toChecksumAddress(address)
const safeService = new SafeServiceClient('https://safe-transaction.rinkeby.gnosis.io')

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

export const getTransactions = (safeAddress: string) =>
  safeService.getMultisigTransactions(toEthereumChecksum(safeAddress))
    .then((value: SafeMultisigTransactionListResponse) => {
      const bundleArray: TransactionBundle[] = []
      value.results.forEach((transaction: SafeMultisigTransactionResponse) =>
        bundleArray.push(convertToBundle(transaction)))

      // sort by nonce
      return bundleArray.sort((a: TransactionBundle, b: TransactionBundle) =>
        (a.transaction.data.nonce > b.transaction.data.nonce) ? 1 : -1)
    })

export const publishPendingTransaction = (
  bundle: TransactionBundle,
  safe: Safe
) => new Promise((resolve, reject) =>
  // get the signer to get the signature later
  safe.getSigner()?.getAddress().then((signerAddress: string) => {
    // get the signature on the transaction
    const signature = bundle.transaction.signatures.get(signerAddress.toLowerCase())

    if (!signature) { reject(new Error('Current account is not a signer on the transaction')) }

    signature && safeService.proposeTransaction(
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
  })
)
