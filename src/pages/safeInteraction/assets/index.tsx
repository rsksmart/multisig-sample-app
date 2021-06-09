import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import React, { useState } from 'react'

interface Interface {
  safe: Safe
  handleError: (err: Error) => void
  addTransaction: (transaction: SafeTransaction) => void
}

const AssetsComponent: React.FC<Interface> = ({ safe, addTransaction, handleError }) => {
  const [newTransaction, setNewTransaction] = useState<{
    to: string, value: string, nonce: string, data: string
  }>({ to: '', value: '10000', nonce: '1', data: '' })

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
      data: newTransaction.data !== '' ? newTransaction.data : '0x'
    })
      .then((transaction: SafeTransaction) => addTransaction(transaction))
      .catch(handleError)
  return (
    <>
      <div className="panel">
        <h2>Assets</h2>

      </div>
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
        <p>
          <label>Data: (leave blank for just sending rbtc)</label>
          <input type="string" id="data" value={newTransaction.data} onChange={handleInputChange} />
        </p>
        <button onClick={createTransaction}>Create Transaction</button>
      </section>
    </>
  )
}

export default AssetsComponent
