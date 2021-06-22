import { isAddress } from '@ethersproject/address'
import React, { useState } from 'react'

interface Interface {
  nonce: number
  createTransaction: (recipient: string, amount: number, data: string, nonce: number) => void
  handleError: (error: Error | null) => void
}

const TransferValueModal: React.FC<Interface> = ({ createTransaction, handleError, nonce }) => {
  const [transaction, setTransaction] = useState<{amount: number, address: string, nonce: number, data: string}>({ amount: 10000, address: '', nonce, data: '' })

  const validateTransaction = () => {
    handleError(null)

    if (!isAddress(transaction.address)) {
      return handleError(new Error('Recipient is not an address.'))
    }

    const formattedData = transaction.data === '' ? '0x' : transaction.data
    createTransaction(
      transaction.address.toLowerCase(),
      transaction.amount,
      formattedData,
      transaction.nonce
    )
  }

  return (
    <>
      <h3>Create Transaction</h3>
      <p>
        <label>Recepient address:</label>
        <input type="text" className="to" value={transaction.address} onChange={evt => setTransaction({ ...transaction, address: evt.target.value })} />
      </p>
      <p>
        <label>Amount:</label>
        <input type="number" className="amount" value={transaction.amount} onChange={evt => setTransaction({ ...transaction, amount: parseInt(evt.target.value) })} />
      </p>
      <p>
        <label>
          Data: (optional field used for advanced transactions)
        </label>
        <textarea className="data" value={transaction.data} onChange={evt => setTransaction({ ...transaction, data: evt.target.value })} />
      </p>
      <p>
        <label>Nonce:</label>
        <input type="number" className="nonce" value={transaction.nonce} onChange={evt => setTransaction({ ...transaction, nonce: parseInt(evt.target.value) })} />
      </p>
      <button className="submit" onClick={validateTransaction}>Create Transaction</button>
    </>
  )
}

export default TransferValueModal
