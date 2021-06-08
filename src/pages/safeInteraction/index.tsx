import React, { useState, MouseEvent } from 'react'
import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import Navigation from './Navigation'
import TransactionsPanel from './transactions'
import Dashboard from './Dashboard'
import PolicyComponent from './policies'

interface Interface {
  safe: Safe
  handleLogout: () => void
  handleError: (err: Error) => void
}

const SafeInteraction: React.FC<Interface> = ({ safe, handleError, handleLogout }) => {
  // UI Only
  const [selectedTab, setSelectedTab] = useState<string>('dashboard')
  const changeActive = (evt: MouseEvent<HTMLButtonElement>) => setSelectedTab(evt.currentTarget.id)

  // Transaction Management
  const [transactions, setTransactions] = useState<SafeTransaction[]>([])
  const addTransaction = (transaction: SafeTransaction) => setTransactions([...transactions, transaction])

  return (
    <section className="selectedSafe">
      <Navigation handleLogout={handleLogout} changeActive={changeActive} selected={selectedTab} />
      {selectedTab === 'dashboard' && <Dashboard safe={safe} />}
      {selectedTab === 'transactions' && <TransactionsPanel transactions={transactions} addTransaction={addTransaction} safe={safe} handleError={handleError} />}
      {selectedTab === 'policy' && <PolicyComponent safe={safe} addTransaction={addTransaction} handleError={handleError} />}
    </section>
  )
}

export default SafeInteraction
