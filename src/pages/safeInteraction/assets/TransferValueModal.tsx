import { isAddress } from '@ethersproject/address'
import React, { useState } from 'react'

interface Interface {
  createTransaction: (recipient: string, amount: number, data: string) => void
  handleError: (error: Error | null) => void
}

const TransferValueModal: React.FC<Interface> = ({ createTransaction, handleError }) => {
  const [recipient, setRecipient] = useState<string>('')
  const [amount, setAmount] = useState<number>(10000)
  const [data, setData] = useState<string>('')

  const validateTransaction = () => {
    handleError(null)

    if (!isAddress(recipient)) {
      return handleError(new Error('Recipient is not an address.'))
    }

    const formattedData = data === '' ? '0x' : data
    createTransaction(recipient.toLowerCase(), amount, formattedData)
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
      <p>
        <label>
          Data: (optional field used for advanced transactions)
        </label>
        <textarea className="data" value={data} onChange={evt => setData(evt.target.value)} />
      </p>
      <button className="submit" onClick={validateTransaction}>Create Transaction</button>
    </>
  )
}

export default TransferValueModal
