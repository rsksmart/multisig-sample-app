import React from 'react'
import ValueWithButtons from './shared/ValueWithButtons'

interface Interface {
  address: string | null
  chainId: number | null
  handleLogout: () => void
}

const ConnectedBar: React.FC<Interface> = ({ address, chainId, handleLogout }) => {
  return (
    <div className="connectedBar">
      <ul className="inline">
        <li><strong>Wallet connected</strong></li>
        <li>{address && <ValueWithButtons value={address} />}</li>
        <li><em>{chainId === 31 ? 'RSK Testnet' : 'RSK Mainnet'}</em></li>
        <li><button className="disconnect" onClick={handleLogout}>Disconnect</button></li>
      </ul>
    </div>
  )
}

export default ConnectedBar
