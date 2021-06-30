// Adapter between the transaction service (and localStorage) and this app

import { SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import { TransactionStatus } from '../constants'
import { TransactionBundle } from '../pages/safeInteraction'

// source: https://docs.gnosis.io/safe/docs/services_transactions/
interface TransactionServiceResponse {
  'safe': string, // '<address>',
  'to': string, // '<address>',
  'value': string, // '<stringified-int>',
  'data': string, // '<hex>',
  'operation': number, // '<int>',
  'gasToken': string, // '<address>',
  'safeTxGas': string, // '<stringified-int>',
  'baseGas': string, // '<stringified-int>',
  'gasPrice': string, // '<stringified-int>',
  'refundReceiver'?: string, // '<address>',
  'nonce': number, // '<int>',
  'safeTxHash': string, // '<hex>',
  'blockNumber'?: number, // '<int>',
  'transactionHash'?: string, // '<hex>',
  'submissionDate'?: string, // '<string>',
  'isExecuted': boolean // '<bool>',
  'isSuccesful': boolean // '<bool>',
  'executionDate'?: string, // '<string>',
  'executor'?: string, // '<address>',
  'confirmations'?: string[], // ['<address>'],
  'signatures'?: string, // '<hex>'
}

export const bundleToService = (bundle: TransactionBundle, safeAddress: string) => {
  const response:TransactionServiceResponse = {
    safe: safeAddress,
    ...bundle.transaction.data,
    safeTxGas: bundle.transaction.data.safeTxGas.toString(),
    baseGas: bundle.transaction.data.baseGas.toString(),
    gasPrice: bundle.transaction.data.gasPrice.toString(),
    safeTxHash: bundle.hash,
    isExecuted: bundle.status === TransactionStatus.EXECUTED,
    isSuccesful: bundle.status === TransactionStatus.EXECUTED
  }

  return response
}

export const serviceToBundle = (transaction: TransactionServiceResponse) => {
  const safeTransaction = new SafeTransaction({
    to: transaction.to,
    value: transaction.value,
    data: transaction.data,
    safeTxGas: parseInt(transaction.safeTxGas),
    baseGas: parseInt(transaction.baseGas),
    gasPrice: parseInt(transaction.gasPrice),
    nonce: transaction.nonce,
    operation: transaction.operation,
    gasToken: transaction.gasToken,
    refundReceiver: transaction.refundReceiver || ''
  })

  const bundle:TransactionBundle = ({
    transaction: safeTransaction,
    status: transaction.isExecuted ? TransactionStatus.EXECUTED : TransactionStatus.PENDING,
    hash: transaction.safeTxHash,
    isReject: false // @todo: figure out how a REJECTED tranasction is encoded.
  })

  return bundle
}

export const bundleToServiceArray = (bundles: TransactionBundle[], safeAddress: string) => {
  const serviceArray: TransactionServiceResponse[] = []
  bundles.map((bundle: TransactionBundle) => serviceArray.push(bundleToService(bundle, safeAddress)))
  return serviceArray
}

export const serviceToBundles = (serviceResponse: TransactionServiceResponse[]) => {
  const bundles: TransactionBundle[] = []
  serviceResponse.map((response: TransactionServiceResponse) => bundles.push(serviceToBundle(response)))
  return bundles
}
