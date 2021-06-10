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

const SafeInteraction: React.FC<Interface> = ({ safe, walletAddress, handleError, handleLogout }) => {
  // UI Only
  const [selectedTab, setSelectedTab] = useState<string>('dashboard')
  const [showTransactionInfo, setShowTransactionInfo] = useState<boolean>(false)
  const changeActive = (evt: MouseEvent<HTMLButtonElement>) => setSelectedTab(evt.currentTarget.id)

  // Transaction Management
  const [transactions, setTransactions] = useState<SafeTransaction[]>([])
  const addTransaction = (transaction: SafeTransaction) => {
    console.log(transaction)
    setTransactions([...transactions, transaction])
    setShowTransactionInfo(true)
  }

  const closeModalAndSwitchScreen = () => {
    setShowTransactionInfo(false)
    setSelectedTab('transactions')
  }

  return (
    <section className="selectedSafe">
      <Navigation handleLogout={handleLogout} changeActive={changeActive} selected={selectedTab} />
      {selectedTab === 'dashboard' && <Dashboard safe={safe} />}
      {selectedTab === 'transactions' && <TransactionsPanel transactions={transactions} addTransaction={addTransaction} safe={safe} handleError={handleError} walletAddress={walletAddress} />}
      {selectedTab === 'assets' && <AssetsComponent safe={safe} handleError={handleError} addTransaction={addTransaction} />}
      {selectedTab === 'policy' && <PolicyComponent safe={safe} addTransaction={addTransaction} handleError={handleError} />}

      {showTransactionInfo && <TransactionCreatedModal closeModal={() => setShowTransactionInfo(false)} changeScreen={closeModalAndSwitchScreen} />}
    </section>
  )
}

export default SafeInteraction
