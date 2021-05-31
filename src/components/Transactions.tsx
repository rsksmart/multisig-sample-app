import EthersSafe, { SafeTransaction } from '@rsksmart/safe-core-sdk'
import { ContractTransaction, ethers } from 'ethers'
import React, { useState } from 'react'

interface Interface {
  safeAddress: string
  web3Provider: any
}

interface SafeTransactionWithHash {
  transaction: SafeTransaction
  hash: string
  signers?: string[]
}

const Transactions: React.FC<Interface> = ({ safeAddress, web3Provider }) => {
  // const [safe, setSafe] = useState<EthersSafe | null>(null)
  const [transactions, setTransactions] = useState<SafeTransactionWithHash[]>([])

  const getSigner = () => EthersSafe.create(
    ethers,
    safeAddress,
    new ethers.providers.Web3Provider(web3Provider).getSigner(0)
  )

  const createTransaction = () => getSigner().then((safe: EthersSafe) => {
    safe.createTransaction({
      to: '0x3dd03d7d6c3137f1eb7582ba5957b8a2e26f304a',
      value: '10000', // ethers.BigNumber.from('10000').toString(),
      data: '0x'
    })
      .then((transaction: SafeTransaction) => {
        safe.getTransactionHash(transaction)
          .then((hash: string) => {
            setTransactions([
              ...transactions,
              { hash, transaction }
            ])
          })
      })
  })

  const signTransaction = (transaction: SafeTransactionWithHash) => {
    getSigner().then((safe: EthersSafe) => {
      safe.approveTransactionHash(transaction.hash)
        .then((result: ContractTransaction) => {
          console.log('result!', result)
          safe.getOwnersWhoApprovedTx(transaction.hash)
            .then((signers: string[]) => {
              const newTransaction = { ...transaction, signers }
            })
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
    <section className="panel">
      <h3>Transactions</h3>
      <h4>Pending Transactions</h4>
      <table>
        <thead>
          <tr>
            <th>To</th>
            <th>Value</th>
            <th>Hash</th>
            <th>options</th>
          </tr>
        </thead>
        {transactions.map((transaction: SafeTransactionWithHash) => {
          return (
            <tr key={transaction.hash}>
              <td>{transaction.transaction.data.to}</td>
              <td>{transaction.transaction.data.value}</td>
              <td>{transaction.hash}</td>
              <td>
                <button onClick={() => signTransaction(transaction)}>sign</button>
                <button onClick={() => executeTransaction(transaction.transaction)}>execute</button>
              </td>
            </tr>
          )
        })}
      </table>

      <button onClick={createTransaction}>Create Transaction</button>
    </section>
  )
}

export default Transactions
