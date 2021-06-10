import { isAddress } from '@ethersproject/address'
import React, { useState } from 'react'
import { Erc20Token } from '.'

interface Interface {
  token: Erc20Token
  handleError: (err: Error) => void
  createTransaction: (token: Erc20Token, amount: number, to: string) => void
}

const TransferTokenModal: React.FC<Interface> = ({ token, createTransaction, handleError }) => {
  const [transaction, setTransaction] = useState<{amount: number, address: string}>({ amount: 0, address: '' })

  const validateTransaction = () => {
    if (!isAddress(transaction.address)) {
      return handleError(new Error('Recipient is not an address!'))
    }
    if (transaction.amount > token.amount) {
      return handleError(new Error('Amount is higher than safe balance!'))
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
        <input type="number" value={transaction.amount} onChange={evt => setTransaction({ ...transaction, amount: parseInt(evt.target.value) })} />
      </p>
      <p>
        <label>Recipient</label>
        <input type="string" value={transaction.address} onChange={evt => setTransaction({ ...transaction, address: evt.target.value })} />
      </p>

      <p><button onClick={validateTransaction}>Create Transaction</button></p>
    </div>
  )
}

export default TransferTokenModal
