import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import React, { useEffect, useState } from 'react'
import ValueWithButtons from '../../../components/ValueWithButtons'
import refreshIcon from '../../../images/refresh.svg'

import safeAbi from '@gnosis.pm/safe-core-sdk/dist/src/abis/SafeAbiV1-2-0.json'
import erc20Abi from '../assets/erc20.json'
import InputDataDecoder from 'ethereum-input-data-decoder'

interface Interface {
  safe: Safe
  transaction: SafeTransaction
  walletAddress: string
  approveTransactionHash: (transaction: SafeTransaction) => Promise<any>
  executeTransaction: (transaction: SafeTransaction) => void
  handleError: (error: Error) => void
}

const TransactionDetailComponent: React.FC<Interface> = ({
  safe, transaction, walletAddress, handleError, approveTransactionHash, executeTransaction
}) => {
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [hash, setHash] = useState<string>('')
  const [signatures, setSignatures] = useState<string[]>([])
  const [threshold, setThreshold] = useState<number>(0)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [formatted, setFormatted] = useState<any>(null)

  useEffect(() => {
    safe.getTransactionHash(transaction).then((txHash: string) => {
      setHash(txHash)
      getApprovals(txHash)

      // try to decode the data
      const formatted = new InputDataDecoder(safeAbi).decodeData(transaction.data.data)
      if (formatted.method) {
        setFormatted(formatted)
      } else {
        setFormatted(new InputDataDecoder(erc20Abi).decodeData(transaction.data.data))
      }
    })

    safe.getThreshold().then((safeThreshold: number) => setThreshold(safeThreshold))
  }, [transaction])

  const getApprovals = (txHash: string) => {
    setIsRefreshing(true)
    safe.getOwnersWhoApprovedTx(txHash)
      .then((signers: string[]) => setSignatures(signers))
      .catch(handleError)
      .finally(() => setIsRefreshing(false))
  }

  const getTransactionName = () => {
    if (transaction.data.data === '0x') {
      return 'Send Value'
    } else if (formatted.method) {
      return formatted.method
    } else {
      return 'unknown'
    }
  }

  const walletHasSigned = signatures.filter((value: string) => value.toLowerCase() === walletAddress.toLowerCase()).length === 1
  const canExecute = threshold > signatures.length

  return (
    <div className="transaction">
      <div className="summary">
        <p><strong>{formatted && getTransactionName()}</strong></p>
        <p><strong>to: </strong>
          {transaction.data.to === safe.getAddress() && <em>(Safe) </em>}
          <ValueWithButtons value={transaction.data.to} />
        </p>
        {transaction.data.value !== '0' && <p><strong>value: </strong>{transaction.data.value}</p>}
        <p><strong>approvals: </strong>
          {isRefreshing ? 'loading...' : `${signatures.length} out of ${threshold}`}
          <button className="icon" onClick={() => getApprovals(hash)}>
            <img src={refreshIcon} alt="refresh" />
          </button>
        </p>
      </div>
      <div className="buttons">
        <button
          onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide ' : 'show '}details</button>
        <button
          disabled={walletHasSigned}
          onClick={() => approveTransactionHash(transaction)}>approve</button>
        <button
          disabled={canExecute}
          onClick={() => executeTransaction(transaction)}>execute</button>
      </div>

      {showDetails && (
        <table><tbody>
          <tr>
            <th>Transaction Hash</th>
            <td><ValueWithButtons value={hash} /></td>
          </tr>
          <tr>
            <th>Nonce</th>
            <td><p>{transaction.data.nonce}</p></td>
          </tr>
          {transaction.data.data !== '0x' && (
            <>
              <tr>
                <th>Raw Data</th>
                <td><p className="data">{transaction.data.data}</p></td>
              </tr>
              <tr>
                <th>Decoded Data</th>
                <td>
                  <pre>{JSON.stringify(formatted, null, 2)}</pre>
                </td>
              </tr>
            </>
          )}
          <tr>
            <th>Approvals:</th>
            <td>
              {signatures.length === 0 ? <p><em>No signatures</em></p> : (
                <ol >
                  {signatures.map((approval: string) =>
                    <li key={approval}>
                      <ValueWithButtons value={approval} />
                      {walletAddress.toLowerCase() === approval.toLowerCase() && <em>(Connected Account)</em>}
                    </li>)}
                </ol>
              )}
            </td>
          </tr>
        </tbody></table>
      )}
    </div>
  )
}

export default TransactionDetailComponent
