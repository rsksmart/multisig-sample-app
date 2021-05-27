import React, { useState } from 'react'
import { ethers } from 'ethers'
import EthersSafe from '@rsksmart/safe-core-sdk'

interface Interface {
  web3Provider: any
  setSafe: (safe: EthersSafe) => void
}

const ConnectToSafe: React.FC<Interface> = ({ web3Provider, setSafe }) => {
  const [safeAddress, setSafeAddress] = useState<string>('0xFa5C0Ff042F54158613D755d5a61c1A00dD1ccE1')
  const [error, setError] = useState<string | null>(null)

  const connectToSafe = () =>
    EthersSafe.create(
      ethers,
      safeAddress.toLowerCase(),
      new ethers.providers.Web3Provider(web3Provider)
    )
      .then((safe: EthersSafe) => setSafe(safe))
      .catch((err: Error) => setError(`Connect to Safe error: ${err.message}`))

  return (
    <div>
      <h3>Connect to an existing safe</h3>
      <input type="text" value={safeAddress} onChange={evt => setSafeAddress(evt.target.value)} />
      <button onClick={connectToSafe}>Connect</button>
      {error && <div className="error">{error}</div>}
    </div>
  )
}

export default ConnectToSafe
