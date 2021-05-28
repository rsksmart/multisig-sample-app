import React from 'react'
import rifSafeLogo from '../images/rif-safe-header.svg'

interface Interface {
  chainId: number | null
  handleLogout: () => void
}

const ConnectedBar: React.FC<Interface> = ({ chainId, handleLogout }) => {
  return (
    <section className="header">
      <ul className="inline">
        <li><img src={rifSafeLogo} alt="RIF Safe" /></li>
        <li className="chainId"><span>{chainId === 31 ? 'RSK Testnet' : 'RSK Mainnet'}</span></li>
      </ul>
    </section>
  )
}

export default ConnectedBar
