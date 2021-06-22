import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import { ContractTransaction } from 'ethers'
import React, { useEffect, useState } from 'react'
import { TransactionBundle } from '..'
import { TransactionStatus } from '../../../constants'
import { transactionListener } from '../../../helpers/transactionListener'
import ApprovedModal from './ApprovedModal'
import ExecutedModal from './ExecutedModal'
import TransactionDetailComponent from './TransactionDetailComponent'
import TransactionMenu from './TransactionMenu'

interface Interface {
  safe: Safe
  handleError: (err: Error) => void
  updateTransactionStatus: (transaction: TransactionBundle) => void
  transactions: TransactionBundle[]
  walletAddress: string
}

const TransactionsPanel: React.FC<Interface> = ({ safe, handleError, updateTransactionStatus, walletAddress, transactions }) => {
  const [showApprovedModal, setShowApprovedModal] = useState<string | null>(null)
  const [showExecutedModal, setShowExecutedModal] = useState<{ status: string, hash?: string } | null>(null)

  const [currentSubTab, setCurrentSubTab] = useState<TransactionStatus>(TransactionStatus.PENDING)
  const [currentTransactions, setCurrentTransactions] = useState<TransactionBundle[]>([])

  const changeCurrentTab = (name: TransactionStatus) => {
    setCurrentSubTab(name)
    setCurrentTransactions(transactions.filter((tran: TransactionBundle) => tran.status === name))
  }

  useEffect(() => {
    changeCurrentTab(TransactionStatus.PENDING)
  }, [])

  // Sign transaction "on-chain"
  const approveTransactionHash = (transaction: SafeTransaction) => {
    setShowApprovedModal('LOADING')

    return safe.getTransactionHash(transaction)
      .then((hash: string) =>
        safe.approveTransactionHash(hash)
          .then((result: ContractTransaction) => transactionListener(safe.getProvider(), result.hash))
          .then((receipt: any) => setShowApprovedModal(receipt.transactionHash)))
      .catch((err: Error) => {
        setShowApprovedModal(null)
        handleError(err)
      })
  }

  // Execute transaction
  const executeTransaction = (transaction: TransactionBundle) => {
    safe.executeTransaction(transaction.transaction)
      .then((result: ContractTransaction) => {
        setShowExecutedModal({ status: 'LOADING', hash: result.hash })
        return transactionListener(safe.getProvider(), result.hash)
      })
      .then((receipt: any) => {
        setShowExecutedModal({ status: 'COMPLETE', hash: receipt.transactionHash })
        updateTransactionStatus(transaction)
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
        {currentTransactions.map((transaction: TransactionBundle, index: number) =>
          <TransactionDetailComponent
            safe={safe}
            transactionBundle={transaction}
            handleError={handleError}
            approveTransactionHash={approveTransactionHash}
            executeTransaction={executeTransaction}
            walletAddress={walletAddress}
            key={index}
          />
        )}
      </section>

      {showApprovedModal && <ApprovedModal hash={showApprovedModal} handleClose={() => setShowApprovedModal(null)} />}
      {showExecutedModal && <ExecutedModal status={showExecutedModal} handleClose={() => setShowExecutedModal(null)} />}
    </>
  )
}

export default TransactionsPanel
