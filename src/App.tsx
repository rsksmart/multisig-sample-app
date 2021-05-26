import React, { useState } from 'react'
import RLogin, { RLoginButton } from '@rsksmart/rlogin'
import './App.scss'

const rLogin = new RLogin({
  cacheProvider: false,
  supportedChains: [31]
})

function App () {
  const [error, setError] = useState<null | string>(null)
  const [rLoginResponse, setRLoginResponse] = useState<{ provider: any, disconnect: any } | null>(null)
  const [currentWallet, setCurrentWallet] = useState<{ account: string, chainId: number } | null>(null)

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

      {error && <section className="error">{error}</section>}
    </div>
  )
}

export default App
