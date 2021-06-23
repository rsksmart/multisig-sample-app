import React from 'react'
import rifGray from '../images/rifGray.svg'

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
        <li className="logo">
          <img src={rifGray} alt="RIF Safe" />
          Safe and Vault Sample App
        </li>
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
