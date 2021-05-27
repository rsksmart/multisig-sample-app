import React, { useState } from 'react'
import { ethers } from 'ethers'
import EthersSafe from '@rsksmart/safe-core-sdk'

interface Interface {
  web3Provider: any
  setSafe: (safe: EthersSafe) => void
  handleError: (error: Error) => void
}

const ConnectToSafe: React.FC<Interface> = ({ web3Provider, setSafe, handleError }) => {
  const [safeAddress, setSafeAddress] = useState<string>('0xFa5C0Ff042F54158613D755d5a61c1A00dD1ccE1')

  const connectToSafe = () =>
    EthersSafe.create(
      ethers,
      safeAddress.toLowerCase(),
      new ethers.providers.Web3Provider(web3Provider)
    )
      .then((safe: EthersSafe) => setSafe(safe))
      .catch(handleError)

  return (
    <div>
      <h3>Connect to an existing safe</h3>
      <input type="text" value={safeAddress} onChange={evt => setSafeAddress(evt.target.value)} />
      <button onClick={connectToSafe}>Connect</button>
    </div>
  )
}

export default ConnectToSafe
