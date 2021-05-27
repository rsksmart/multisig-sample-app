import React, { useState } from 'react'
import RLogin from '@rsksmart/rlogin'
import EthersSafe from '@rsksmart/safe-core-sdk'

import './App.scss'
import Web3Provider from './components/Web3Provider'
import CreateSafe from './components/CreateSafe'
import ConnectToSafe from './components/ConnectToSafe'
import ConnectedBar from './components/ConnectedBar'

const rLogin = new RLogin({
  cacheProvider: false,
  supportedChains: [31]
})

function App () {
  const [error, setError] = useState<null | string>('')

  // Web3Provider and Safe variables
  const [rLoginResponse, setRLoginResponse] = useState<{ provider: any, disconnect: any } | null>(null)
  const [safe, setSafe] = useState<EthersSafe | null>(null)

  // provider variables
  const [address, setAddress] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)

  // UI variables
  const [isCreate, setIsCreate] = useState<boolean>(false)

  const web3ProviderResponse = (response: any, address: string, chainId: number) => {
    setRLoginResponse(response)
    setAddress(address)
    setChainId(chainId)
  }

  const handleError = (error: Error) => setError(error.message)

  const handleLogout = () => {
    rLoginResponse?.disconnect()
    setRLoginResponse(null)
    setSafe(null)
  }

  return (
    <div className="App">
      <div className="App-header">
        RIF Multisig Sample App
      </div>

      {!rLoginResponse ? (
        <Web3Provider
          rLogin={rLogin}
          setRLoginResponse={web3ProviderResponse}
          handleError={handleError}
        />
      ) : <ConnectedBar handleLogout={handleLogout} address={address} chainId={chainId} />
      }

      {error && (
        <section className="error">
          <p>{error}</p>
          <button onClick={() => setError(null)}>x</button>
        </section>
      )}

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
    </div>
  )
}

export default App
