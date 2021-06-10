import { isAddress } from '@ethersproject/address'
import React, { useState } from 'react'

interface Interface {
  createTransaction: (recipient: string, amount: number) => void
  handleError: (error: Error) => void
}

const TransferValueModal: React.FC<Interface> = ({ createTransaction, handleError }) => {
  const [recipient, setRecipient] = useState<string>('')
  const [amount, setAmount] = useState<number>(10000)

  const validateTransaction = () => {
    if (!isAddress(recipient)) {
      return handleError(new Error('Recipient is not an address.'))
    }

    createTransaction(recipient, amount)
  }

  return (
    <>
      <h3>Create Transaction</h3>
      <p>
        <label>Recepient:</label>
        <input type="text" className="to" value={recipient} onChange={evt => setRecipient(evt.target.value)} />
      </p>
      <p>
        <label>Amount:</label>
        <input type="number" className="amount" value={amount} onChange={evt => setAmount(parseInt(evt.target.value))} />
      </p>
      <button className="submit" onClick={validateTransaction}>Create Transaction</button>
    </>
  )
}

export default TransferValueModal
