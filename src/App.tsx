import React from 'react'
import RLogin, { RLoginButton } from '@rsksmart/rlogin'
import './App.scss'

const rLogin = new RLogin({
  cacheProvider: false,
  supportedChains: [30, 31]
})

function App () {
  return (
    <div className="App">
      <header className="App-header">
        RIF Multisig Sample App
      </header>
      <section className="login">
        <h2>Login with your wallet</h2>
        <RLoginButton />
      </section>
    </div>
  )
}

export default App
