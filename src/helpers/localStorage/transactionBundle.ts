import { SafeSignature, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import { TransactionBundle } from '../../pages/safeInteraction'
import { EthSignSignature } from '../missingTypes'
import { getParsedItem, LocalStorageKeys, removeKey, setJsonKey } from './utils'

const getTransactionKey = (safeAddress: string) =>
  `${LocalStorageKeys.TRANSACTIONS}_${safeAddress}`

const serializeTransactionBundles = (transactionBundle: TransactionBundle[]) => {
  const serializableObjs = transactionBundle.map(txBundle => ({
    ...txBundle,
    transactionSignatures: Array.from(txBundle.transaction.signatures.entries())
  }))
  return JSON.stringify(serializableObjs)
}

const parseTransactionBundles = (str: string): TransactionBundle[] => {
  const content = JSON.parse(str)
  return content.map((tx: any) => {
    const safeTx = new SafeTransaction(tx.transaction.data)
    const signatures = new Map<string, SafeSignature>(tx.transactionSignatures)
    signatures.forEach((value) => {
      const signature = new EthSignSignature(value.signer, value.data)
      safeTx.addSignature(signature)
    })
    const { transactionSignatures, ...ret } = tx
    ret.transaction = safeTx
    return ret
  })
}

export const getTransactions = (safeAddress: string) => {
  const storedTransactions = getParsedItem<TransactionBundle>(getTransactionKey(safeAddress), parseTransactionBundles)
  return storedTransactions
}

const serializeAndStore = (key: string, value: TransactionBundle[]) => {
  return setJsonKey(key, value, serializeTransactionBundles)
}

export const storeTransaction = (
  safeAddress: string,
  transaction: TransactionBundle
) => {
  const transactionKey = getTransactionKey(safeAddress)
  const transactions = getTransactions(safeAddress)
  if (!transactions) {
    return serializeAndStore(transactionKey, [transaction])
  }
  const txIndex = transactions.findIndex(
    (tx) => tx.hash === transaction.hash
  )
  if (txIndex === -1) {
    // item not found, store it as new item
    serializeAndStore(transactionKey, [...transactions, transaction])
  } else {
    // item found, replace the old one
    transactions[txIndex] = transaction
    serializeAndStore(transactionKey, transactions)
  }
}

export const removeTransaction = (
  safeAddress: string,
  transaction: TransactionBundle
) => {
  const transactionKey = getTransactionKey(safeAddress)
  const transactions = getTransactions(safeAddress)
  if (!transactions) {
    return
  }
  const txIndex = transactions.findIndex(
    (tx) => tx.hash === transaction.hash
  )
  if (txIndex < 0 || txIndex >= transactions.length) {
    return
  }
  transactions.splice(txIndex, 1)
  if (transactions.length === 0) {
    return removeKey(transactionKey)
  }
  serializeAndStore(transactionKey, transactions)
}
