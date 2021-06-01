import React from 'react'
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
  return (
    <section className="selectedSafe">
      <Navigation handleLogout={handleLogout} />
      <Dashboard safe={safe} />
      <Transactions safeAddress={safe.getAddress()} web3Provider={web3Provider} />
    </section>
  )
}

export default SafeInteraction
