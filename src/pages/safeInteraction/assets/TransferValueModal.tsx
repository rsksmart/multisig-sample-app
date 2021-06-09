import React, { useState } from 'react'

export interface NewTransaction {
  to: string, value: string, nonce: string, data: string
}

interface Interface {
  createTransaction: (data: NewTransaction) => void
}

const TransferValueModal: React.FC<Interface> = ({ createTransaction }) => {
  const [newTransaction, setNewTransaction] = useState<NewTransaction>({ to: '', value: '10000', nonce: '1', data: '' })

  const handleInputChange = (evt: React.FormEvent<HTMLInputElement>) =>
    setNewTransaction({
      ...newTransaction,
      [evt.currentTarget.id]: evt.currentTarget.value
    })

  return (
    <>
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
      <button onClick={() => createTransaction(newTransaction)}>Create Transaction</button>
    </>
  )
}

export default TransferValueModal
