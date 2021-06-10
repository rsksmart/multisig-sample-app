import { isAddress } from '@ethersproject/address'
import React, { useState } from 'react'

export interface NewTransaction {
  to: string, amount: string, data: string
}

interface Interface {
  createTransaction: (data: NewTransaction) => void
  handleError: (error: Error) => void
}

const TransferValueModal: React.FC<Interface> = ({ createTransaction, handleError }) => {
  const [newTransaction, setNewTransaction] = useState<NewTransaction>({ to: '', amount: '10000', data: '' })

  const handleInputChange = (evt: React.FormEvent<HTMLInputElement>) =>
    setNewTransaction({
      ...newTransaction,
      [evt.currentTarget.id]: evt.currentTarget.value
    })

  const validateTransaction = () => {
    if (!isAddress(newTransaction.to)) {
      return handleError(new Error('Recipient is not an address.'))
    }

    createTransaction(newTransaction)
  }

  return (
    <>
      <h3>Create Transaction</h3>
      <p>
        <label>Recepient:</label>
        <input type="text" id="to" value={newTransaction.to} onChange={handleInputChange} />
      </p>
      <p>
        <label>Amount:</label>
        <input type="number" id="amount" value={newTransaction.amount} onChange={handleInputChange} />
      </p>
      <p>
        <label>Data: (leave blank for just sending rbtc)</label>
        <input type="string" id="data" value={newTransaction.data} onChange={handleInputChange} />
      </p>
      <button className="submit" onClick={validateTransaction}>Create Transaction</button>
    </>
  )
}

export default TransferValueModal
