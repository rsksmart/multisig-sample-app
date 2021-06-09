import React from 'react'
import rifSafeLogo from '../images/rif-safe-header.svg'

interface Interface {
  chainId: number | null
  walletAddress: string | null
}

const ConnectedBar: React.FC<Interface> = ({ walletAddress, chainId }) => {
  const chainIdtoString = (id: number) => {
    switch (id) {
      case 31: return 'RSK Testnet'
      case 30: return 'RSK Mainnet'
      default: return 'Local'
    }
  }
  return (
    <section className="header">
      <ul className="inline">
        <li><img src={rifSafeLogo} alt="RIF Safe" /></li>
        {walletAddress && (
          <li className="address">
            {`${walletAddress.slice(0, 8)}...${walletAddress.slice(walletAddress.length - 6)}`}
          </li>
        )}
        <li className="chainId"><span>{chainId && chainIdtoString(chainId)}</span></li>
      </ul>
    </section>
  )
}

export default ConnectedBar
