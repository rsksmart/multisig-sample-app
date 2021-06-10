import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import { ERC20TransactionBuilder } from '@rsksmart/safe-transactions-sdk'
import { BigNumber, Contract } from 'ethers'
import React, { useEffect, useState } from 'react'
import Modal from '../../../components/Modal'
import TransferValueModal from './TransferValueModal'
import erc20Abi from './erc20.json'
import refreshIcon from '../../../images/refresh.svg'
import TransferTokenModal from './TransferTokenModal'
import { getContracts } from '../../../config'

interface Interface {
  safe: Safe
  handleError: (err: Error) => void
  addTransaction: (transaction: SafeTransaction) => void
}

export interface Erc20Token {
  symbol: string
  decimals: number
  amount: number
  contractAddress: string
}

const AssetsComponent: React.FC<Interface> = ({ safe, addTransaction, handleError }) => {
  const [showTransfer, setShowTransfer] = useState<boolean>(false)
  const [showTokenTransfer, setShowTokenTransfer] = useState<Erc20Token | null>(null)

  const [balance, setBalance] = useState<string>('0')
  const [tokens, setTokens] = useState<any[]>([])

  useEffect(() => {
    getSafeBalance()

    safe.getChainId().then((chainId: number) =>
      getERC2Balance({ symbol: 'tRIF', decimals: 18, amount: 0, contractAddress: getContracts(chainId).rifToken }))
  }, [safe])

  const getSafeBalance = () => safe.getBalance().then((balance: BigNumber) => setBalance(balance.toString()))

  const getERC2Balance = (token: Erc20Token) => {
    const signer = safe.getSigner()
    const contract = new Contract(token.contractAddress, erc20Abi, signer)
    contract.balanceOf(safe.getAddress())
      .then((result: BigNumber) => result.toString())
      .then((result: string) => {
        const updateToken = { ...token, amount: parseInt(result) / Math.pow(10, 18) }
        const isListed = tokens.find((findToken: Erc20Token) => findToken.symbol === token.symbol)

        const newTokenList = isListed
          ? tokens.map((findToken: Erc20Token) => findToken.symbol === token.symbol ? updateToken : findToken)
          : [...tokens, updateToken]

        setTokens(newTokenList)
      })
      .catch((err: Error) => console.log('error', err))
  }

  // Create transaction to send rbtc or data
  const createTransaction = (to: string, amount: number) =>
    safe.createTransaction({
      to,
      value: amount.toString(),
      data: '0x'
    })
      .then((transaction: SafeTransaction) => addTransaction(transaction))
      .catch(handleError)
      .finally(() => setShowTransfer(false))

  // Create transaction to send an ERC20 token:
  const createTokenTransaction = (token: Erc20Token, amount: number, to: string) => {
    const contract = new Contract(token.contractAddress, erc20Abi, safe.getSigner())
    const txBuilder = new ERC20TransactionBuilder(safe, contract)

    const bigAmount = BigNumber.from(amount).mul(BigNumber.from(10).pow(token.decimals))

    txBuilder.transfer(to, bigAmount)
      .then((transaction: SafeTransaction) => addTransaction(transaction))
      .catch(handleError)
      .finally(() => setShowTokenTransfer(null))
  }

  return (
    <>
      <div className="panel">
        <h2>Assets</h2>
        <table>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><p>rBTC</p></td>
              <td>
                <p>
                  {(parseInt(balance) / 1000000000000000000).toString()}
                  <button className="icon" onClick={getSafeBalance}>
                    <img src={refreshIcon} alt="refresh balance" />
                  </button>
                  <button className="icon" onClick={() => setShowTransfer(true)}>transfer</button>
                </p>
              </td>
            </tr>
            {tokens.map((token: any) => (
              <tr key={token.contractAddress}>
                <td><p>{token.symbol}</p></td>
                <td>
                  {token.amount}
                  <button className="icon" onClick={() => getERC2Balance(token)}>
                    <img src={refreshIcon} alt="refresh balance" />
                  </button>
                  <button className="icon" onClick={() => setShowTokenTransfer(token)}>
                    transfer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showTransfer && (
        <Modal handleClose={() => setShowTransfer(false)}>
          <TransferValueModal
            createTransaction={createTransaction}
            handleError={handleError}
          />
        </Modal>
      )}
      {showTokenTransfer && (
        <Modal handleClose={() => setShowTokenTransfer(null)}>
          <TransferTokenModal
            token={showTokenTransfer}
            handleError={handleError}
            createTransaction={createTokenTransaction}
          />
        </Modal>
      )}
    </>
  )
}

export default AssetsComponent
