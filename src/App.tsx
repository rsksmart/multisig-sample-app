import React, { useState } from 'react'
import RLogin from '@rsksmart/rlogin'
import { Safe } from '@gnosis.pm/safe-core-sdk'

import './styles/App.scss'
import Web3Provider from './pages/start/ConnectWalletComponent'
import ConnectedBar from './components/ConnectedBar'
import SafeInteraction from './pages/safeInteraction'
import ChooseSafe from './pages/connectToSafe'
import FooterComponent from './components/FooterComponent'
import { saveSafeAddresToLocalStorage } from './helpers/localStorage'

const rLogin = new RLogin({
  cacheProvider: false,
  supportedChains: [4, 31, 1337]
})

function App () {
  const [error, setError] = useState<null | string>('')

  // Web3Provider and Safe variables
  const [rLoginResponse, setRLoginResponse] = useState<{ provider: any, disconnect: any } | null>(null)
  const [safe, setSafe] = useState<Safe | null>(null)

  // provider variables
  const [address, setAddress] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)

  const web3ProviderResponse = (response: any, address: string, chainId: number) => {
    setRLoginResponse(response)
    setAddress(address)
    setChainId(chainId)

    // listen for address change and update:
    response.provider.on('accountsChanged', (accounts: string[]) => setAddress(accounts[0]))
  }

  const handleSetSafe = (safe: Safe) => {
    setSafe(safe)
    handleError(null)
    chainId && saveSafeAddresToLocalStorage(safe.getAddress(), chainId)
  }

  const handleError = (error: Error | null) => error ? setError(error.message) : setError(null)

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
      ) : <ConnectedBar chainId={chainId} walletAddress={address} />
      }

      {error && (
        <section className="error">
          <p>{error}</p>
          <button onClick={() => handleError(null)}>x</button>
        </section>
      )}

      {rLoginResponse && chainId && !safe && (
        <ChooseSafe
          web3Provider={rLoginResponse.provider}
          chainId={chainId}
          handleSetSafe={handleSetSafe}
          handleError={handleError}
          address={address}
        />
      )}

      {rLoginResponse && address && safe && (
        <SafeInteraction
          safe={safe}
          walletAddress={address}
          handleLogout={handleLogout}
          handleError={handleError}
        />
      )}

      {rLoginResponse && <FooterComponent />}
    </div>
  )
}

export default App
