import React from 'react'
import { RLoginButton } from '@rsksmart/rlogin'
import rifSafeLogo from '../../images/rif-safe.svg'
import poweredByLogo from '../../images/powered-by-iov.svg'

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
      <img src={rifSafeLogo} alt="RIF Safe" />
      <h2>Login with your wallet</h2>
      <p><RLoginButton onClick={handleLogin}>Connect with rLogin!</RLoginButton></p>
      <img src={poweredByLogo} alt="Powered by IOV Labs" />
      <p className="legal">Copyright © 2021 IOV Labs. All rights reserved.</p>
    </section>
  )
}

export default Web3Provider
