import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import { ContractTransaction } from 'ethers'
import React, { useState } from 'react'
import { TransactionBundle } from '..'
import { executeRskTransaction } from '../../../helpers/executeTransaction'
import { transactionListener } from '../../../helpers/transactionListener'
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

  const pendingTransactions: TransactionBundle[] = []
  const executedTransactions: TransactionBundle[] = []

  transactions.map((bundle: TransactionBundle) =>
    bundle.status === 'PENDING' ? pendingTransactions.push(bundle) : executedTransactions.push(bundle))

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
  const executeTransaction = (transactionBundle: TransactionBundle) => {
    setShowExecutedModal('LOADING')

    executeRskTransaction(safe, transactionBundle.transaction)
      .then((result: ContractTransaction) => transactionListener(safe.getProvider(), result.hash))
      .then((receipt: any) => {
        setShowExecutedModal(receipt.transactionHash)
        updateTransactionStatus(transactionBundle)
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
        {pendingTransactions.length === 0 && executedTransactions.length === 0 && (
          <p><em>There are no transactions.</em></p>
        )}
        {pendingTransactions.length !== 0 && (
          <>
            <h3>Pending Transactions</h3>
            {pendingTransactions.map((transaction: TransactionBundle, index: number) =>
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
          </>
        )}

        {executedTransactions.length !== 0 && (
          <>
            <h3>Executed Transactions</h3>
            {executedTransactions.map((transaction: TransactionBundle, index: number) =>
              <TransactionDetailComponent
                safe={safe}
                transactionBundle={transaction}
                walletAddress={walletAddress}
                key={index}
              />
            )}
          </>
        )}
      </section>

      {showApprovedModal && <ApprovedModal hash={showApprovedModal} handleClose={() => setShowApprovedModal(null)} />}
      {showExecutedModal && <ExecutedModal hash={showExecutedModal} handleClose={() => setShowExecutedModal(null)} />}
    </>
  )
}

export default TransactionsPanel
