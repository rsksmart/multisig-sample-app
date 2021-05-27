import React, { useState } from 'react'
import RLogin from '@rsksmart/rlogin'
import EthersSafe from '@rsksmart/safe-core-sdk'

import './App.scss'
import Web3Provider from './components/Web3Provider'
import CreateSafe from './components/CreateSafe'
import ConnectToSafe from './components/ConnectToSafe'

const rLogin = new RLogin({
  cacheProvider: false,
  supportedChains: [31]
})

function App () {
  const [error, setError] = useState<null | string>(null)

  // Web3Provider and Safe variables
  const [rLoginResponse, setRLoginResponse] = useState<{ provider: any, disconnect: any } | null>(null)
  const [safe, setSafe] = useState<EthersSafe | null>(null)

  // UI variables
  const [isCreate, setIsCreate] = useState<boolean>(false)

  const handleError = (error: Error) => setError(error.message)

  const handleLogout = () => {
    rLoginResponse?.disconnect()
    setRLoginResponse(null)
    setSafe(null)
  }

  return (
    <div className="App">
      <header className="App-header">
        RIF Multisig Sample App
      </header>

      <Web3Provider
        rLogin={rLogin}
        setRLoginResponse={(provider: any) => setRLoginResponse(provider)}
        handleLogout={handleLogout}
        handleError={handleError}
      />

      {rLoginResponse && !safe && (
        <section className="connect">
          <h2>Step 2: Create a safe, or connect to an existing one</h2>
          <button onClick={() => setIsCreate(!isCreate)}>
            {isCreate ? 'Connect to existing safe' : 'Create new safe'}
          </button>
          {isCreate ? (
            <CreateSafe
              web3Provider={rLoginResponse.provider}
              setSafe={(safe: EthersSafe) => setSafe(safe)}
              handleError={handleError} />
          ) : (
            <ConnectToSafe
              web3Provider={rLoginResponse.provider}
              setSafe={(safe: EthersSafe) => setSafe(safe)}
              handleError={handleError}
            />
          )}
        </section>
      )}

      {safe && (
        <section className="selectedSafe">
          <h2>Step 3: Safe Connected</h2>
          <p><strong>Safe Address: </strong>{safe.getAddress()}</p>
        </section>
      )}

      {error && <section className="error">{error}</section>}
    </div>
  )
}

export default App
