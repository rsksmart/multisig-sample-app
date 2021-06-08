import React, { useState } from 'react'
import EthersSafe, { Safe } from '@gnosis.pm/safe-core-sdk'
import { EthersSafeFactory } from '@rsksmart/safe-factory-sdk'
import { ethers } from 'ethers'

import CreateSafeComponent from './CreateSafeComponent'
import ConnectToSafeComponent from './ConnectToSafeComponent'
import { getContracts } from '../../config'

interface Interface {
  web3Provider: any
  handleSetSafe: (safe: Safe | EthersSafe) => any
  handleError: (error: Error) => void
  address: string | null
}

const ChooseSafe: React.FC<Interface> = ({ web3Provider, handleSetSafe, handleError, address }) => {
  // UI variables
  const [isCreate, setIsCreate] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Create a new safe:
  const createSafe = (addresses: string[], threshold: number) => {
    setIsLoading(true)

    const contracts = getContracts(1337)
    const provider = new ethers.providers.Web3Provider(web3Provider)
    const signer = provider.getSigner()

    const safeFactory = new EthersSafeFactory(
      signer,
      contracts.proxyFactoryAddress.toLowerCase(),
      contracts.safeSingletonAddress.toLowerCase()
    )

    safeFactory.createSafe({ owners: addresses, threshold })
      .then(handleSetSafe)
      .catch(handleError)
      .finally(() => setIsLoading(false))
  }

  // Connect to an existing safe:
  const connectToSafe = (safeAddress: string) => {
    setIsLoading(true)

    const provider = new ethers.providers.Web3Provider(web3Provider)
    const signer = provider.getSigner()

    EthersSafe.create(ethers, safeAddress.toLowerCase(), signer)
      .then((safe: any) => handleSetSafe(safe))
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
          <ConnectToSafeComponent
            connectToSafe={connectToSafe}
          />
        )}
      </section>
    )
}

export default ChooseSafe
