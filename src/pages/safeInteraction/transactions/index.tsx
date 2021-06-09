import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import { ContractTransaction } from 'ethers'
import React, { useState } from 'react'
import ApprovedModal from './ApprovedModal'
import ExecutedModal from './ExecutedModal'
import TransactionDetailComponent from './TransactionDetailComponent'

interface Interface {
  safe: Safe
  handleError: (err: Error) => void
  transactions: SafeTransaction[]
  addTransaction: (transaction: SafeTransaction) => void
  walletAddress: string
}

const TransactionsPanel: React.FC<Interface> = ({ safe, handleError, addTransaction, walletAddress, transactions }) => {
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
  const executeTransaction = (transaction: SafeTransaction) =>
    safe.executeTransaction(transaction)
      .then((result: ContractTransaction) => {
        setShowExecutedModal(result.hash)
        // @todo move transaction from pending to confirmed ;-)
      })
      .catch(handleError)

  return (
    <>
      <section className="panel">
        <h2>Transactions</h2>
        {transactions.map((transaction: SafeTransaction, index: number) =>
          <TransactionDetailComponent
            safe={safe}
            transaction={transaction}
            handleError={handleError}
            approveTransactionHash={approveTransactionHash}
            executeTransaction={executeTransaction}
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
