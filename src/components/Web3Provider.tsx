import React, { useState } from 'react'
import { RLoginButton } from '@rsksmart/rlogin'

interface Interface {
  rLogin: any
  setRLoginResponse: (provider: any) => void
  handleLogout: () => void
}

const Web3Provider: React.FC<Interface> = ({ rLogin, setRLoginResponse, handleLogout }) => {
  const [account, setAccount] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)

  const handleLogin = () =>
    rLogin.connect()
      .then((response: any) => {
        setRLoginResponse(response)

        response.provider.request({ method: 'eth_accounts' })
          .then((accounts: string[]) => accounts[0])
          .then((account: string) => setAccount(account))

        response.provider.request({ method: 'eth_chainId' })
          .then((chainId: string) => setChainId(parseInt(chainId)))
      })

  const logout = () => {
    setAccount(null)
    setChainId(null)
    handleLogout()
  }

  return (
    <div>
      {!account && (
        <section className="login">
          <h2>Login with your wallet</h2>
          <RLoginButton onClick={handleLogin}>Connect with rLogin!</RLoginButton>
        </section>
      )}

      {account && chainId && (
        <section className="currentWallet">
          <h2>Current Wallet</h2>
          <p><strong>address:</strong> {account}</p>
          <p><strong>chainId:</strong> {chainId}</p>
          <button onClick={logout}>Disconnect</button>
        </section>
      )}
    </div>
  )
}

export default Web3Provider
