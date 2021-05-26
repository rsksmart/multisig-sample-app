import React, { useState } from 'react'
import RLogin, { RLoginButton } from '@rsksmart/rlogin'
import { ethers, Signer } from 'ethers'
import EthersSafe, { EthersSafeFactory } from '@rsksmart/safe-core-sdk'
import './App.scss'

const rLogin = new RLogin({
  cacheProvider: false,
  supportedChains: [31]
})

function App () {
  const [error, setError] = useState<null | string>(null)
  const [rLoginResponse, setRLoginResponse] = useState<{ provider: any, disconnect: any } | null>(null)
  const [currentWallet, setCurrentWallet] = useState<{ account: string, chainId: number } | null>(null)
  const [safe, setSafe] = useState<EthersSafe | null>(null)
  const [safeAddress, setSafeAddress] = useState<string>('0xFa5C0Ff042F54158613D755d5a61c1A00dD1ccE1')

  const handleLogin = () =>
    rLogin.connect()
      .then((response: any) => {
        setRLoginResponse(response)

        Promise.all([response.provider.request({ method: 'eth_accounts' }), response.provider.request({ method: 'eth_chainId' })])
          .then((values: any) =>
            setCurrentWallet({
              account: values[0][0],
              chainId: parseInt(values[1])
            }))
      })
      .catch((err: Error) => setError(`rLogin connect error: ${err.message}`))

  const handleLogout = () => {
    rLoginResponse?.disconnect()
    setRLoginResponse(null)
    setError(null)
    setCurrentWallet(null)
  }

  const safeSingletonAddress = '0xffd41b816f2821e579b4da85c7352bf4f17e4fa5'
  const proxyFactoryAddress = '0x5b836117aed4ca4dee8e2e464f97f7f59b426c5a'

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
      new ethers.providers.Web3Provider(rLoginResponse?.provider),
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
      {!rLoginResponse && (
        <section className="login">
          <h2>Login with your wallet</h2>
          <RLoginButton onClick={handleLogin}>Connect with rLogin!</RLoginButton>
        </section>
      )}

      {rLoginResponse && (
        <>
          <section className="currentWallet">
            <h2>Current Wallet</h2>
            <p><strong>address:</strong> {currentWallet?.account}</p>
            <p><strong>chainId:</strong> {currentWallet?.chainId}</p>
          </section>

          <button type="button" onClick={handleLogout}>Disconnect</button>
        </>
      )}

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
