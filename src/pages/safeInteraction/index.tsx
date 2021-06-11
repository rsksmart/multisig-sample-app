import React, { useState, MouseEvent } from 'react'
import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import Navigation from './Navigation'
import TransactionsPanel from './transactions'
import Dashboard from './Dashboard'
import PolicyComponent from './policies'
import AssetsComponent from './assets'
import TransactionCreatedModal from '../../components/TransactionCreatedModal'

interface Interface {
  safe: Safe
  walletAddress: string
  handleLogout: () => void
  handleError: (err: Error) => void
}

export interface TransactionStatus {
  transaction: SafeTransaction
  hash: string
  status: 'PENDING' | 'EXECUTED'
}

const SafeInteraction: React.FC<Interface> = ({ safe, walletAddress, handleError, handleLogout }) => {
  // UI Only
  const [selectedTab, setSelectedTab] = useState<string>('dashboard')
  const [showTransactionInfo, setShowTransactionInfo] = useState<boolean>(false)
  const changeActive = (evt: MouseEvent<HTMLButtonElement>) => setSelectedTab(evt.currentTarget.id)

  // Transaction Management, pending transactions:
  const [transactions, setTransactions] = useState<TransactionStatus[]>([])
  const addTransaction = (transaction: SafeTransaction) => {
    // get the hash to be used as an identifier
    safe.getTransactionHash(transaction)
      .then((hash: string) => {
        setTransactions([...transactions, { status: 'PENDING', transaction, hash }])
        setShowTransactionInfo(true)
      })
  }

  // update a transaction to 'EXECUTED'
  const updateTransactionStatus = (transaction: SafeTransaction) => {
    safe.getTransactionHash(transaction)
      .then((hash: string) => {
        const newTransactionList = transactions.map((item: TransactionStatus) =>
          item.hash === hash ? { ...item, status: 'EXECUTED' } : item
        )
        setTransactions(newTransactionList as TransactionStatus[])
      })
  }

  const closeModalAndSwitchScreen = () => {
    setShowTransactionInfo(false)
    setSelectedTab('transactions')
  }

  return (
    <section className="selectedSafe">
      <Navigation handleLogout={handleLogout} changeActive={changeActive} selected={selectedTab} />
      {selectedTab === 'dashboard' && <Dashboard safe={safe} />}
      {selectedTab === 'transactions' && <TransactionsPanel safe={safe} transactions={transactions} handleError={handleError} updateTransactionStatus={updateTransactionStatus} walletAddress={walletAddress} />}
      {selectedTab === 'assets' && <AssetsComponent safe={safe} handleError={handleError} addTransaction={addTransaction} />}
      {selectedTab === 'policy' && <PolicyComponent safe={safe} addTransaction={addTransaction} handleError={handleError} />}

      {showTransactionInfo && <TransactionCreatedModal closeModal={() => setShowTransactionInfo(false)} changeScreen={closeModalAndSwitchScreen} />}
    </section>
  )
}

export default SafeInteraction
