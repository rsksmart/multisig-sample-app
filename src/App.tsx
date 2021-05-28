import React, { useState } from 'react'
import RLogin from '@rsksmart/rlogin'
import EthersSafe from '@rsksmart/safe-core-sdk'

import './styles/App.scss'
import Web3Provider from './components/Web3Provider'
import CreateSafe from './components/CreateSafe'
import ConnectToSafe from './components/ConnectToSafe'
import ConnectedBar from './components/ConnectedBar'
import SafeInteraction from './components/SafeInteraction'

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

  const handleSetSafe = (safe: EthersSafe) => {
    setSafe(safe)
    clearError()
  }

  const handleError = (error: Error) => setError(error.message)
  const clearError = () => setError(null)

  const handleLogout = () => {
    rLoginResponse?.disconnect()
    setRLoginResponse(null)
    setSafe(null)
    setError(null)
    setAddress(null)
    setChainId(null)
  }

  return (
    <div className={rLoginResponse ? 'App' : 'App signin'}>
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
          <button onClick={clearError}>x</button>
        </section>
      )}

      {rLoginResponse && !safe && (
        <section className="connect">
          <h2>Create a safe, or connect to an existing one</h2>
          <button onClick={() => setIsCreate(!isCreate)}>
            {isCreate ? 'Connect to existing safe' : 'Create new safe'}
          </button>
          {isCreate ? (
            <CreateSafe
              web3Provider={rLoginResponse.provider}
              setSafe={handleSetSafe}
              handleError={handleError}
              connectAddress={address}
            />
          ) : (
            <ConnectToSafe
              web3Provider={rLoginResponse.provider}
              setSafe={handleSetSafe}
              handleError={handleError}
            />
          )}
        </section>
      )}

      {safe && <SafeInteraction web3Provider={rLoginResponse?.provider} safe={safe} />}
    </div>
  )
}

export default App
