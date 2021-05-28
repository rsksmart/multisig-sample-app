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
      {isCreate ? (
        <CreateSafe
          web3Provider={web3Provider}
          setSafe={handleSetSafe}
          handleError={handleError}
          connectAddress={address}
          switchView={() => setIsCreate(!isCreate)}
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
