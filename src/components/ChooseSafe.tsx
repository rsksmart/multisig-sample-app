import React, { useState } from 'react'
import CreateSafe from './CreateSafe'
import ConnectToSafe from './ConnectToSafe'
import EthersSafe from '@rsksmart/safe-core-sdk'

interface Interface {
  web3Provider: any
  handleSetSafe: (safe: EthersSafe) => void
  handleError: (error: Error) => void
  address: string | null
}

const ChooseSafe: React.FC<Interface> = ({ web3Provider, handleSetSafe, handleError, address }) => {
  // UI variables
  const [isCreate, setIsCreate] = useState<boolean>(false)

  return (
    <section className="connect">
      <h2>Create a safe, or connect to an existing one</h2>
      <button onClick={() => setIsCreate(!isCreate)}>
        {isCreate ? 'Connect to existing safe' : 'Create new safe'}
      </button>
      {isCreate ? (
        <CreateSafe
          web3Provider={web3Provider}
          setSafe={handleSetSafe}
          handleError={handleError}
          connectAddress={address}
        />
      ) : (
        <ConnectToSafe
          web3Provider={web3Provider}
          setSafe={handleSetSafe}
          handleError={handleError}
        />
      )}
    </section>
  )
}

export default ChooseSafe
