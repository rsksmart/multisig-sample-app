import { SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import React from 'react'

interface Interface {
  transactions: SafeTransaction[]
  signTransaction?: (transaction: SafeTransaction) => void
  signTransactionHash: (transaction: SafeTransaction) => void
  executeTransaction: (transaction: SafeTransaction) => void
}

const TransactionListComponent: React.FC<Interface> = ({ transactions, signTransactionHash, executeTransaction }) => {
  return transactions.length === 0
    ? <></>
    : (
      <table>
        <thead>
          <tr>
            <th>To</th>
            <th>Value</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction: SafeTransaction, index: number) => {
            console.log('1', transaction)
            return (
              <tr key={index}>
                <td>{transaction.data.to}</td>
                <td>{transaction.data.value}</td>
                <td>
                  <button onClick={() => signTransactionHash(transaction)}>sign</button>
                  <button onClick={() => executeTransaction(transaction)}>execute</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
}

export default TransactionListComponent
