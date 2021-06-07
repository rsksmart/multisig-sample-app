import React, { useState, MouseEvent } from 'react'
import { Safe } from '@gnosis.pm/safe-core-sdk'
import Navigation from './Navigation'
import TransactionsPanel from './TransactionsPanel'
import Dashboard from './Dashboard'
import PolicyComponent from './PolicyComponent'

interface Interface {
  web3Provider: any
  safe: Safe
  handleLogout: () => void
  handleError: (err: Error) => void
}

const SafeInteraction: React.FC<Interface> = ({ safe, web3Provider, handleError, handleLogout }) => {
  const [selectedTab, setSelectedTab] = useState<string>('dashboard')
  const changeActive = (evt: MouseEvent<HTMLButtonElement>) => setSelectedTab(evt.currentTarget.id)

  return (
    <section className="selectedSafe">
      <Navigation handleLogout={handleLogout} changeActive={changeActive} selected={selectedTab} />
      {selectedTab === 'dashboard' && <Dashboard safe={safe} />}
      {selectedTab === 'transactions' && <TransactionsPanel safe={safe} handleError={handleError} web3Provider={web3Provider} />}
      {selectedTab === 'policy' && <PolicyComponent safe={safe} handleError={handleError} />}
    </section>
  )
}

export default SafeInteraction
