import React, { useState, MouseEvent } from 'react'
import EthersSafe from '@rsksmart/safe-core-sdk'
import Navigation from './Navigation'
import Transactions from './Transactions'
import Dashboard from './Dashboard'

interface Interface {
  web3Provider: any
  safe: EthersSafe
  handleLogout: () => void
}

const SafeInteraction: React.FC<Interface> = ({ safe, web3Provider, handleLogout }) => {
  const [selectedTab, setSelectedTab] = useState<string>('dashboard')
  const changeActive = (evt: MouseEvent<HTMLButtonElement>) => setSelectedTab(evt.currentTarget.id)

  return (
    <section className="selectedSafe">
      <Navigation handleLogout={handleLogout} changeActive={changeActive} selected={selectedTab} />
      {selectedTab === 'dashboard' && <Dashboard safe={safe} />}
      {selectedTab === 'transactions' && <Transactions safeAddress={safe.getAddress()} web3Provider={web3Provider} />}
    </section>
  )
}

export default SafeInteraction
