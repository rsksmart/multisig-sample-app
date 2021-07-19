import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import React, { useEffect, useState } from 'react'
import ValueWithButtons from '../../../components/ValueWithButtons'
import refreshIcon from '../../../images/refresh.svg'

import safeAbi from '@gnosis.pm/safe-core-sdk/dist/src/abis/SafeAbiV1-2-0.json'
import erc20Abi from '../assets/erc20.json'
import InputDataDecoder from 'ethereum-input-data-decoder'
import { TransactionBundle } from '..'
import CopyValueButton from '../../../components/CopyValueButton'
import { TransactionStatus } from '../../../constants'
import { EthSignSignature } from '@gnosis.pm/safe-core-sdk/dist/src/utils/signatures/SafeSignature'

interface Interface {
  safe: Safe
  transactionBundle: TransactionBundle
  walletAddress: string
  approveTransaction?: (transaction: TransactionBundle, onChain: boolean) => Promise<any>
  executeTransaction?: (transactionBundle: TransactionBundle) => void
  rejectTransaction?: (transaction: SafeTransaction) => void
  publishTransaction?: (transaction: TransactionBundle) => void
  handleError?: (error: Error) => void
}

interface SignatureType {
  signature: string,
  isOnChain: boolean
}

const TransactionDetailComponent: React.FC<Interface> = ({
  safe, transactionBundle, walletAddress, handleError, approveTransaction, executeTransaction, rejectTransaction, publishTransaction
}) => {
  const { transaction, hash, confirmations } = transactionBundle

  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [signatures, setSignatures] = useState<SignatureType[]>([])
  const [threshold, setThreshold] = useState<number>(0)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [formatted, setFormatted] = useState<any>(null)

  useEffect(() => {
    // get transaction approvals
    getApprovals()

    // try to decode the data
    const formatted = new InputDataDecoder(safeAbi).decodeData(transaction.data.data)
    if (formatted.method) {
      setFormatted(formatted)
    } else {
      setFormatted(new InputDataDecoder(erc20Abi).decodeData(transaction.data.data))
    }

    safe.getThreshold().then((safeThreshold: number) => setThreshold(safeThreshold))
  }, [transaction])

  const getApprovals = () => {
    setIsRefreshing(true)

    if (confirmations) {
      confirmations.forEach((confirmation) => {
        transaction.addSignature(new EthSignSignature(confirmation.owner, confirmation.signature))
      })
    }
    const offChainSigners = Array.from(transaction.signatures.keys()).map((signature: string) => ({ signature, isOnChain: false }))

    safe.getOwnersWhoApprovedTx(hash)
      .then((signers: string[]) => {
        const onChainSigners = signers.map((signature: string) => ({ signature, isOnChain: true }))
        setSignatures([...offChainSigners, ...onChainSigners])
      })
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

  const handleApprove = (onChain: boolean) =>
    approveTransaction && approveTransaction(transactionBundle, onChain)
      .then(() => getApprovals())

  const handleReject = () =>
    rejectTransaction && rejectTransaction(transaction)

  const walletHasSigned = signatures.filter((value: SignatureType) => value.signature.toLowerCase() === walletAddress.toLowerCase()).length === 1
  const canExecute = threshold > signatures.length

  return (
    <div className="transaction">
      <table>
        <thead>
          <tr>
            <th colSpan={2}>{formatted && getTransactionName()}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>to:</th>
            <td>
              {transaction.data.to === safe.getAddress() && <em>(Safe) </em>}
              <ValueWithButtons value={transaction.data.to} />
            </td>
          </tr>
          {transactionBundle.status === TransactionStatus.PENDING && (
            <tr>
              <th>approvals:</th>
              <td>
                {isRefreshing ? 'loading...' : `${signatures.length} out of ${threshold}`}
                <button className="icon" onClick={getApprovals}>
                  <img src={refreshIcon} alt="refresh" />
                </button>
              </td>
            </tr>
          )}
          {transaction.data.value !== '0' && (
            <tr>
              <th>value:</th>
              <td><p>{transaction.data.value}</p></td>
            </tr>
          )}
          <tr>
            <th>nonce:</th>
            <td><p>{transaction.data.nonce}</p></td>
          </tr>
        </tbody>
      </table>

      <div className="buttons">
        <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide ' : 'show '}details</button>
        {approveTransaction && (
          <>
            <button
              disabled={walletHasSigned}
              onClick={() => handleApprove(true)}>approve on-chain</button>
            <button
              disabled={walletHasSigned}
              onClick={() => handleApprove(false)}>approve off-chain</button>
            <button
              disabled={transactionBundle.isPublished}
              onClick={() => publishTransaction && publishTransaction(transactionBundle)}>Publish</button>
          </>
        )}
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
                <>
                  <ol >
                    {signatures.map((approval: SignatureType) =>
                      <li key={approval.signature}>
                        <ValueWithButtons value={approval.signature} />
                        {`(${approval.isOnChain ? 'on' : 'off'}-chain)`}
                        {walletAddress.toLowerCase() === approval.signature.toLowerCase() && <em>(Connected Account)</em>}
                      </li>)}
                  </ol>
                </>
              )}
            </td>
          </tr>
        </tbody></table>
      )}
    </div>
  )
}

export default TransactionDetailComponent
