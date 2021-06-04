import React, { useState } from 'react'
import { ethers } from 'ethers'
import EthersSafe from '@rsksmart/safe-core-sdk'
import { Safe } from '@gnosis.pm/safe-core-sdk'

interface Interface {
  web3Provider: any
  setSafe: (safe: Safe) => void
  handleError: (error: Error) => void
  switchView: () => void
}

const ConnectToSafe: React.FC<Interface> = ({ web3Provider, setSafe, handleError, switchView }) => {
  const [safeAddress, setSafeAddress] = useState<string>('0xFa5C0Ff042F54158613D755d5a61c1A00dD1ccE1')

  /*
  const connectToSafe = () =>
    EthersSafe.create(
      ethers,
      safeAddress.toLowerCase(),
      new ethers.providers.Web3Provider(web3Provider)
    )
      .then((safe: Safe) => setSafe(safe))
      .catch(handleError)
  */

  return (
    <div className="panel connectSafe">
      <h3>
        Connect to an existing safe
        <button onClick={switchView}>Create Safe</button>
      </h3>
      <label>Safe address</label>
      <input type="text" value={safeAddress} onChange={evt => setSafeAddress(evt.target.value)} />
      <button onClick={() => console.log('connecting...')}>Connect</button>
    </div>
  )
}

export default ConnectToSafe
