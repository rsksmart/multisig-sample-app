import React, { useState } from 'react'
import { Safe } from '@gnosis.pm/safe-core-sdk'
import { EthersSafeFactory } from '@rsksmart/safe-core-sdk'
import { ethers } from 'ethers'

import CreateSafeComponent from './CreateSafeComponent'
import ConnectToSafe from './ConnectToSafe'
import { proxyFactoryAddress, safeSingletonAddress } from '../config/testnet.json'

interface Interface {
  web3Provider: any
  handleSetSafe: (safe: Safe) => void
  handleError: (error: Error) => void
  address: string | null
}

const ChooseSafe: React.FC<Interface> = ({ web3Provider, handleSetSafe, handleError, address }) => {
  // UI variables
  const [isCreate, setIsCreate] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Create a new safe:
  const createSafe = (addresses: string[], threshold: number) => {
    setIsLoading(true)

    const provider = new ethers.providers.Web3Provider(web3Provider)
    const signer = provider.getSigner()

    const safeFactory = new EthersSafeFactory(
      signer,
      proxyFactoryAddress.toLowerCase(),
      safeSingletonAddress.toLowerCase()
    )

    safeFactory.createSafe({ owners: addresses, threshold })
      .then(handleSetSafe)
      .catch(handleError)
      .finally(() => setIsLoading(false))
  }

  return isLoading ? <div style={{ textAlign: 'center' }}>Loading...</div>
    : (
      <section className="connect panel">
        <h2>
        Create a safe, or connect to an existing one
          <button onClick={() => setIsCreate(!isCreate)}>
            {isCreate ? 'Connect to Safe' : 'Create Safe'}
          </button>
        </h2>
        {isCreate ? (
          <CreateSafeComponent
            createSafe={createSafe}
            handleError={handleError}
            connectAddress={address}
          />
        ) : (
          <ConnectToSafe
            web3Provider={web3Provider}
            setSafe={handleSetSafe}
            handleError={handleError}
            switchView={() => setIsCreate(!isCreate)}
          />
        )}
      </section>
    )
}

export default ChooseSafe
