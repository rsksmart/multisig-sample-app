import EthersSafe, { SafeTransaction } from '@rsksmart/safe-core-sdk'
import { ContractTransaction, ethers } from 'ethers'
import React, { useState } from 'react'

interface Interface {
  safeAddress: string
  web3Provider: any
}

interface SafeTransactionWithHash {
  transaction: SafeTransaction
  signedTransaction?: ContractTransaction
  hash: string
  signers?: string[]
  status: 'CREATED' | 'SIGNED' | 'EXECUTED'
}

const Transactions: React.FC<Interface> = ({ safeAddress, web3Provider }) => {
  const [transactions, setTransactions] = useState<SafeTransactionWithHash[]>([])
  const [newTransaction, setNewTransaction] = useState<{ to: string, value: string, nonce: string }>({ to: '0x3dd03d7d6c3137f1eb7582ba5957b8a2e26f304a', value: '10000', nonce: '1' })

  const getSigner = () => EthersSafe.create(
    ethers,
    safeAddress,
    new ethers.providers.Web3Provider(web3Provider).getSigner(0)
  )

  const handleCreateTransaction = (evt: React.FormEvent<HTMLInputElement>) =>
    setNewTransaction({
      ...newTransaction,
      [evt.currentTarget.id]: evt.currentTarget.value
    })

  const createTransaction = () => getSigner().then((safe: EthersSafe) => {
    safe.createTransaction({
      to: newTransaction.to.toLowerCase(),
      value: newTransaction.value,
      nonce: parseInt(newTransaction.nonce),
      data: '0x'
    })
      .then((transaction: SafeTransaction) => {
        safe.getTransactionHash(transaction)
          .then((hash: string) => {
            setTransactions([
              ...transactions,
              { hash, transaction, status: 'CREATED' }
            ])
          })
      })
  })

  const signTransaction = (transaction: SafeTransactionWithHash) => {
    getSigner().then((safe: EthersSafe) => {
      safe.approveTransactionHash(transaction.hash)
        .then((result: ContractTransaction) => {
          // create new list
          const updateTransactions = transactions.map((item: SafeTransactionWithHash) => item.hash === transaction.hash ? { ...item, signedTransaction: result } : item)
          // update state
          setTransactions(updateTransactions)
        })
        .catch((err: Error) => console.log('error4', err))
    })
  }

  const executeTransaction = (transaction: SafeTransaction) => {
    getSigner().then((safe: EthersSafe) => {
      safe.executeTransaction(transaction)
        .then((result: any) => console.log('result!', result))
        .catch((err: Error) => console.log('error', err))
    })
  }

  return (
    <>
      <section className="panel">
        <h3>Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>To</th>
              <th>Value</th>
              <th>Status</th>
              <th>options</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction: SafeTransactionWithHash) => {
              return (
                <tr key={transaction.hash}>
                  <td>{transaction.transaction.data.to}</td>
                  <td>{transaction.transaction.data.value}</td>
                  <td>{transaction.status}</td>
                  <td>
                    <button onClick={() => signTransaction(transaction)}>sign</button>
                    <button onClick={() => executeTransaction(transaction.transaction)}>execute</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>

      <section className="panel">
        <h3>Create Transaction</h3>
        <p>
          <label>Recepient:</label>
          <input type="text" id="to" value={newTransaction.to} onChange={handleCreateTransaction} />
        </p>
        <p>
          <label>Value:</label>
          <input type="number" id="value" value={newTransaction.value} onChange={handleCreateTransaction} />
        </p>
        <p>
          <label>Nonce:</label>
          <input type="number" id="nonce" value={newTransaction.nonce} onChange={handleCreateTransaction} />
        </p>
        <button onClick={createTransaction}>Create Transaction</button>
      </section>
    </>
  )
}

export default Transactions
