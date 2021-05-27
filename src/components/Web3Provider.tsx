import React from 'react'
import { RLoginButton } from '@rsksmart/rlogin'

interface Interface {
  rLogin: any
  setRLoginResponse: (response: any, address: string, chainId: number) => void
  handleError: (error: Error) => void
}

const Web3Provider: React.FC<Interface> = ({ rLogin, setRLoginResponse, handleError }) => {
  const handleLogin = () =>
    rLogin.connect()
      .then((rLoginResponse: any) => {
        Promise.all([
          rLoginResponse.provider.request({ method: 'eth_accounts' }),
          rLoginResponse.provider.request({ method: 'eth_chainId' })
        ]).then((response: any) => {
          setRLoginResponse(rLoginResponse, response[0][0], parseInt(response[1]))
        })
      })
      .catch(handleError)

  return (
    <section className="login">
      <h2>Login with your wallet</h2>
      <RLoginButton onClick={handleLogin}>Connect with rLogin!</RLoginButton>
    </section>
  )
}

export default Web3Provider
