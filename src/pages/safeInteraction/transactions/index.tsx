import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import { rejectTx, executeTransaction } from '@rsksmart/safe-transactions-sdk'
import { ContractTransaction } from 'ethers'
import React, { useEffect, useState } from 'react'
import { TransactionBundle } from '..'
import { TransactionStatus } from '../../../constants'
import { transactionListener } from '../../../helpers/transactionListener'
import ApprovedModal from './ApprovedModal'
import ExecutedModal from './ExecutedModal'
import TransactionDetailComponent from './TransactionDetailComponent'
import TransactionMenu from './TransactionMenu'
import TransactionTabHelperText from './TransactionTabHelperText'

interface Interface {
  safe: Safe
  handleError: (err: Error) => void
  addTransaction: (transaction: SafeTransaction, isReject: boolean) => void
  updateTransactionBundle: (transaction: TransactionBundle) => void
  transactions: TransactionBundle[]
  walletAddress: string
}

const TransactionsPanel: React.FC<Interface> = ({ safe, handleError, updateTransactionBundle, addTransaction, walletAddress, transactions }) => {
  const [showApprovedModal, setShowApprovedModal] = useState<string | null>(null)
  const [showExecutedModal, setShowExecutedModal] = useState<{ status: string, hash?: string } | null>(null)

  const [currentSubTab, setCurrentSubTab] = useState<TransactionStatus>(TransactionStatus.PENDING)
  const [currentTransactions, setCurrentTransactions] = useState<TransactionBundle[]>([])

  const [safeNonce, setSafeNonce] = useState<number>(0)

  const changeCurrentTab = (name: TransactionStatus) => {
    setCurrentSubTab(name)
    setCurrentTransactions(transactions.filter((tran: TransactionBundle) => tran.status === name))
  }

  useEffect(() => {
    changeCurrentTab(TransactionStatus.PENDING)
    safe.getNonce().then((nonce: number) => setSafeNonce(nonce))
  }, [transactions])

  const createRejectionTransaction = (transaction: SafeTransaction) =>
    rejectTx(safe, transaction)
      .then((transaction: SafeTransaction) => addTransaction(transaction, true))

  // Approve/Sign a transaction
  const approveTransaction = (transaction: TransactionBundle, onChain: boolean) =>
    onChain ? approveTransactionHash(transaction) : approveTransactionOffChain(transaction)

  // Sign transaction "on-chain"
  const approveTransactionHash = (bundle: TransactionBundle) => {
    setShowApprovedModal('LOADING')

    return safe.getTransactionHash(bundle.transaction)
      .then((hash: string) =>
        safe.approveTransactionHash(hash)
          .then((result: ContractTransaction) => transactionListener(safe.getProvider(), result.hash))
          .then((receipt: any) => setShowApprovedModal(receipt.transactionHash)))
      .catch((err: Error) => {
        setShowApprovedModal(null)
        handleError(err)
      })
  }

  const approveTransactionOffChain = (bundle: TransactionBundle) =>
    safe.signTransaction(bundle.transaction)
      .then(() => {
        updateTransactionBundle(bundle)
      })
      .catch(handleError)

  // Execute transaction
  const handleExecutionTransaction = (bundle: TransactionBundle) => {
    executeTransaction(safe, bundle.transaction)
      .then((result: ContractTransaction) => {
        setShowExecutedModal({ status: 'LOADING', hash: result.hash })
        return transactionListener(safe.getProvider(), result.hash)
      })
      .then((receipt: any) => {
        setShowExecutedModal({ status: 'COMPLETE', hash: receipt.transactionHash })
        updateTransactionBundle({ ...bundle, status: TransactionStatus.EXECUTED })
      })
      .catch((err: Error) => {
        setShowExecutedModal(null)
        handleError(err)
      })
  }

  return (
    <>
      <section className="panel">
        <h2>Transactions</h2>

        <TransactionMenu
          selected={currentSubTab}
          handleClick={changeCurrentTab}
        />

        <h3>{`${currentSubTab.toString()} Transactions:`}</h3>

        <TransactionTabHelperText count={currentTransactions.length} screen={currentSubTab} />

        {currentTransactions.map((transaction: TransactionBundle) => {
          const currentNonce = safeNonce === transaction.transaction.data.nonce
          const isPending = currentSubTab === TransactionStatus.PENDING
          const hasDuplicate = currentTransactions.filter((t: TransactionBundle) => t.transaction.data.nonce === transaction.transaction.data.nonce).length > 1

          return <TransactionDetailComponent
            key={transaction.hash}
            safe={safe}
            transactionBundle={transaction}
            walletAddress={walletAddress}
            handleError={handleError}
            approveTransaction={currentSubTab === TransactionStatus.PENDING ? approveTransaction : undefined}
            executeTransaction={(isPending && currentNonce) ? handleExecutionTransaction : undefined}
            rejectTransaction={(isPending && currentNonce && !hasDuplicate) ? createRejectionTransaction : undefined}
          />
        })}
      </section>

      {showApprovedModal && <ApprovedModal hash={showApprovedModal} handleClose={() => setShowApprovedModal(null)} />}
      {showExecutedModal && <ExecutedModal status={showExecutedModal} handleClose={() => setShowExecutedModal(null)} />}
    </>
  )
}

export default TransactionsPanel
