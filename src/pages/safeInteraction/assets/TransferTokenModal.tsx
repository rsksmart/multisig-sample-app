import { isAddress } from '@ethersproject/address'
import React, { useState } from 'react'
import { Erc20Token } from '.'

interface Interface {
  token: Erc20Token
  handleError: (err: Error | null) => void
  createTransaction: (token: Erc20Token, amount: number, to: string) => void
}

const TransferTokenModal: React.FC<Interface> = ({ token, createTransaction, handleError }) => {
  const [transaction, setTransaction] = useState<{amount: number, address: string}>({ amount: 0, address: '' })

  const validateTransaction = () => {
    handleError(null)

    if (!isAddress(transaction.address)) {
      return handleError(new Error('Recipient is not an address.'))
    }

    if (transaction.amount > token.amount || transaction.amount < 1) {
      return handleError(new Error(`Amount should be between 1 and ${token.amount}.`))
    }

    return createTransaction(token, transaction.amount, transaction.address.toLowerCase())
  }

  return (
    <div>
      <h2>Transfer ERC20 Token: {token.symbol}</h2>
      <p>
        <label>You have:</label>
        <input type="text" className="readonly" defaultValue={token.amount} />
      </p>
      <p>
        <label>Amount to sent:</label>
        <input type="number" className="amount" value={transaction.amount} onChange={evt => setTransaction({ ...transaction, amount: parseInt(evt.target.value) })} />
      </p>
      <p>
        <label>Recipient</label>
        <input type="string" className="recipient" value={transaction.address} onChange={evt => setTransaction({ ...transaction, address: evt.target.value })} />
      </p>

      <p>
        <button className="submit" onClick={validateTransaction}>
          Create Transaction
        </button>
      </p>
    </div>
  )
}

export default TransferTokenModal
