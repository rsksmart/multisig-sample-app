import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import React, { useEffect, useState } from 'react'
import ValueWithButtons from '../../../components/ValueWithButtons'
import refreshIcon from '../../../images/refresh.svg'

import safeAbi from '@gnosis.pm/safe-core-sdk/dist/src/abis/SafeAbiV1-2-0.json'
import erc20Abi from '../assets/erc20.json'
import InputDataDecoder from 'ethereum-input-data-decoder'
import { TransactionBundle } from '..'
import CopyValueButton from '../../../components/CopyValueButton'

interface Interface {
  safe: Safe
  transactionBundle: TransactionBundle
  walletAddress: string
  approveTransactionHash?: (transaction: SafeTransaction) => Promise<any>
  executeTransaction?: (transactionBundle: TransactionBundle) => void
  rejectTransaction?: (transaction: SafeTransaction) => void
  handleError?: (error: Error) => void
}

const TransactionDetailComponent: React.FC<Interface> = ({
  safe, transactionBundle, walletAddress, handleError, approveTransactionHash, executeTransaction, rejectTransaction
}) => {
  const { transaction, hash } = transactionBundle

  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [signatures, setSignatures] = useState<string[]>([])
  const [threshold, setThreshold] = useState<number>(0)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [formatted, setFormatted] = useState<any>(null)

  useEffect(() => {
    safe.getTransactionHash(transaction).then((txHash: string) => {
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
    if (transactionBundle.isReject) {
      return 'Rejection Transaction'
    } else if (transaction.data.data === '0x') {
      return 'Send Value'
    } else if (formatted.method) {
      return formatted.method
    } else {
      return 'Transaction'
    }
  }

  const handleApprove = () =>
    approveTransactionHash && approveTransactionHash(transaction)
      .then(() => getApprovals(hash))

  const handleReject = () =>
    rejectTransaction && rejectTransaction(transaction)

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
        <p><strong>nonce:</strong> {transaction.data.nonce}</p>
        <button
          onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide ' : 'show '}details</button>
      </div>
      <div className="buttons">
        {approveTransactionHash && <button
          disabled={walletHasSigned}
          onClick={handleApprove}>approve</button>}
        {!transactionBundle.isReject && rejectTransaction && <button
          onClick={handleReject}
        >create rejection</button>}
        {executeTransaction && <button
          disabled={canExecute}
          onClick={() => executeTransaction(transactionBundle)}>execute</button>}
      </div>

      {showDetails && (
        <table><tbody>
          <tr>
            <th>Transaction Hash</th>
            <td>
              <p>{hash}<CopyValueButton value={hash} /></p>
            </td>
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
