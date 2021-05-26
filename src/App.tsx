import React, { useState } from 'react'
import RLogin from '@rsksmart/rlogin'
import { ethers } from 'ethers'
import EthersSafe, { EthersSafeFactory } from '@rsksmart/safe-core-sdk'
import './App.scss'
import Web3Provider from './components/Web3Provider'

const rLogin = new RLogin({
  cacheProvider: false,
  supportedChains: [31]
})

function App () {
  const [error, setError] = useState<null | string>(null)
  const [rLoginResponse, setRLoginResponse] = useState<{ provider: any, disconnect: any } | null>(null)
  const [safe, setSafe] = useState<EthersSafe | null>(null)

  const [safeAddress, setSafeAddress] = useState<string>('0xFa5C0Ff042F54158613D755d5a61c1A00dD1ccE1')

  const safeSingletonAddress = '0xffd41b816f2821e579b4da85c7352bf4f17e4fa5'
  const proxyFactoryAddress = '0x5b836117aed4ca4dee8e2e464f97f7f59b426c5a'

  const handleLogout = () => {
    rLoginResponse?.disconnect()
    setRLoginResponse(null)
  }

  const createSave = () => {
    const provider = new ethers.providers.Web3Provider(rLoginResponse?.provider)
    const signer = provider.getSigner()

    const safeFactory = new EthersSafeFactory(
      signer,
      proxyFactoryAddress,
      safeSingletonAddress
    )

    safeFactory.createSafe({
      owners: ['0x3dd03d7d6c3137f1eb7582ba5957b8a2e26f304a', '0xee3d5f22ea0ff393aeef5cf88a81e7d44979633b'],
      threshold: 2
    })
      .then((response: EthersSafe) => setSafe(response))
      .catch((err: Error) => setError(`Create Safe error: ${err.message}`))
  }

  const connectToSafe = () => {
    EthersSafe.create(
      ethers,
      safeAddress.toLowerCase(),
      rLoginResponse?.provider
    )
      .then((response: EthersSafe) => setSafe(response))
      .catch((err: Error) => setError(`Connect to Safe error: ${err.message}`))
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
        <section className="safeCreate">
          <h2>Safe</h2>
          <h3>Create a Safe!</h3>
          <button onClick={createSave}>Create Safe</button>
          <h3>Connect to a safe:</h3>
          <input type="text" value={safeAddress} onChange={evt => setSafeAddress(evt.target.value)} />
          <button onClick={connectToSafe}>Connect to Safe</button>
        </section>
      )}

      {rLoginResponse && safe && (
        <section className="selectedSafe">
          <h2>Connected Safe:</h2>
          <p><strong>Safe Address: </strong>{safe.getAddress()}</p>
        </section>
      )}

      {error && <section className="error">{error}</section>}
    </div>
  )
}

export default App
