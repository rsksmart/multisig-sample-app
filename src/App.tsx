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
  const [rLoginResponse, setRLoginResponse] = useState<{ provider: any, disconnect: any } | null>(null)
  const [safe, setSafe] = useState<EthersSafe | null>(null)

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
      />

      {rLoginResponse && !safe && (
        <section className="connect">
          <h2>Create a safe, or connect to an existing one</h2>
          <CreateSafe web3Provider={rLoginResponse.provider} setSafe={(safe: EthersSafe) => setSafe(safe)} />
          <ConnectToSafe web3Provider={rLoginResponse.provider} setSafe={(safe: EthersSafe) => setSafe(safe)} />
        </section>
      )}

      {safe && (
        <section className="selectedSafe">
          <h2>Safe Connected!</h2>
          <p><strong>Safe Address: </strong>{safe.getAddress()}</p>
        </section>
      )}

      {error && <section className="error">{error}</section>}
    </div>
  )
}

export default App
