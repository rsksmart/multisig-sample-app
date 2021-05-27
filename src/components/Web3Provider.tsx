import React, { useState } from 'react'
import { RLoginButton } from '@rsksmart/rlogin'

interface Interface {
  rLogin: any
  setRLoginResponse: (provider: any) => void
  handleLogout: () => void
  handleError: (error: Error) => void
}

const Web3Provider: React.FC<Interface> = ({ rLogin, setRLoginResponse, handleLogout, handleError }) => {
  const [account, setAccount] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)

  const handleLogin = () =>
    rLogin.connect()
      .then((response: any) => {
        setRLoginResponse(response)

        response.provider.request({ method: 'eth_accounts' })
          .then((accounts: string[]) => accounts[0])
          .then((account: string) => setAccount(account))
          .catch(handleError)

        response.provider.request({ method: 'eth_chainId' })
          .then((chainId: string) => setChainId(parseInt(chainId)))
          .catch(handleError)
      })
      .catch(handleError)

  const logout = () => {
    setAccount(null)
    setChainId(null)
    handleLogout()
  }

  return (
    <div>
      {!account && (
        <section className="login">
          <h2>Step 1: Login with your wallet</h2>
          <RLoginButton onClick={handleLogin}>Connect with rLogin!</RLoginButton>
        </section>
      )}

      {account && chainId && (
        <div className="connectedBar">
          <ul className="inline">
            <li><strong>Wallet connected</strong></li>
            <li><strong>address:</strong> {account}</li>
            <li><em>{chainId === 31 ? 'RSK Testnet' : 'RSK Mainnet'}</em></li>
            <li><button onClick={logout}>Disconnect</button></li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Web3Provider
