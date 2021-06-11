import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import { ContractTransaction } from 'ethers'
import React, { useState } from 'react'
import { TransactionBundle } from '..'
import ApprovedModal from './ApprovedModal'
import ExecutedModal from './ExecutedModal'
import TransactionDetailComponent from './TransactionDetailComponent'

interface Interface {
  safe: Safe
  handleError: (err: Error) => void
  updateTransactionStatus: (transaction: TransactionBundle) => void
  transactions: TransactionBundle[]
  walletAddress: string
}

const TransactionsPanel: React.FC<Interface> = ({ safe, handleError, updateTransactionStatus, walletAddress, transactions }) => {
  const [showApprovedModal, setShowApprovedModal] = useState<string | null>(null)
  const [showExecutedModal, setShowExecutedModal] = useState<string | null>(null)

  // Sign transaction "on-chain"
  const approveTransactionHash = (transaction: SafeTransaction) =>
    safe.getTransactionHash(transaction)
      .then((hash: string) =>
        safe.approveTransactionHash(hash)
          .then((result: ContractTransaction) => setShowApprovedModal(result.hash))
          .catch(handleError))

  // Execute transaction
  const executeTransaction = (transaction: TransactionBundle) =>
    safe.executeTransaction(transaction.transaction)
      .then((result: ContractTransaction) => {
        setShowExecutedModal(result.hash)
        updateTransactionStatus(transaction)
      })
      .catch(handleError)

  return (
    <>
      <section className="panel">
        <h2>Transactions</h2>
        <h3>Pending Transactions</h3>
        {transactions.map((transaction: TransactionBundle, index: number) =>
          transaction.status === 'PENDING' && <TransactionDetailComponent
            safe={safe}
            transactionBundle={transaction}
            handleError={handleError}
            approveTransactionHash={approveTransactionHash}
            executeTransaction={executeTransaction}
            walletAddress={walletAddress}
            key={index}
          />
        )}

        <h3>Executed Transactions</h3>
        {transactions.map((transaction: TransactionBundle, index: number) =>
          transaction.status === 'EXECUTED' && <TransactionDetailComponent
            safe={safe}
            transactionBundle={transaction}
            walletAddress={walletAddress}
            key={index}
          />
        )}
      </section>

      {showApprovedModal && <ApprovedModal hash={showApprovedModal} handleClose={() => setShowApprovedModal(null)} />}
      {showExecutedModal && <ExecutedModal hash={showExecutedModal} handleClose={() => setShowExecutedModal(null)} />}
    </>
  )
}

export default TransactionsPanel
