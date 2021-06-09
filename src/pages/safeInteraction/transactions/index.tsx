import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import { Contract, ContractTransaction } from 'ethers'
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
  const [newTransaction, setNewTransaction] = useState<{ to: string, value: string, nonce: string }>({ to: '0x3dd03d7d6c3137f1eb7582ba5957b8a2e26f304a', value: '10000', nonce: '1' })

  const [showApprovedModal, setShowApprovedModal] = useState<string | null>(null)
  const [showExecutedModal, setShowExecutedModal] = useState<string | null>(null)

  const handleInputChange = (evt: React.FormEvent<HTMLInputElement>) =>
    setNewTransaction({
      ...newTransaction,
      [evt.currentTarget.id]: evt.currentTarget.value
    })

  // Create transaction to send rbtc
  const createTransaction = () =>
    safe.createTransaction({
      to: newTransaction.to.toLowerCase(),
      value: newTransaction.value,
      nonce: parseInt(newTransaction.nonce),
      data: '0x'
    })
      .then((transaction: SafeTransaction) => addTransaction(transaction))
      .catch(handleError)

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
        <h3>Pending Transactions</h3>
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

      <section className="panel">
        <h3>Create Transaction</h3>
        <p>
          <label>Recepient:</label>
          <input type="text" id="to" value={newTransaction.to} onChange={handleInputChange} />
        </p>
        <p>
          <label>Value:</label>
          <input type="number" id="value" value={newTransaction.value} onChange={handleInputChange} />
        </p>
        <p>
          <label>Nonce:</label>
          <input type="number" id="nonce" value={newTransaction.nonce} onChange={handleInputChange} />
        </p>
        <button onClick={createTransaction}>Create Transaction</button>
      </section>

      {showApprovedModal && <ApprovedModal hash={showApprovedModal} handleClose={() => setShowApprovedModal(null)} />}
      {showExecutedModal && <ExecutedModal hash={showExecutedModal} handleClose={() => setShowExecutedModal(null)} />}
    </>
  )
}

export default TransactionsPanel
