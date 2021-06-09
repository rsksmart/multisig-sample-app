import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import React, { useEffect, useState } from 'react'
import ValueWithButtons from '../../../components/ValueWithButtons'

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

  useEffect(() => {
    safe.getTransactionHash(transaction).then((txHash: string) => {
      setHash(txHash)
      getApprovals(txHash)
    })

    safe.getThreshold().then((safeThreshold: number) => setThreshold(safeThreshold))
  }, [transaction])

  const getApprovals = (txHash: string) => safe.getOwnersWhoApprovedTx(txHash)
    .then((signers: string[]) => setSignatures(signers))
    .catch(handleError)

  return (
    <div className="transaction">
      <div className="summary">
        <p><strong>to: </strong>
          <ValueWithButtons value={transaction.data.to} />
        </p>
        <p><strong>value: </strong>{transaction.data.value}</p>
        <p><strong>approvals: </strong>
          {signatures.length} out of {threshold}
          <button onClick={() => getApprovals(hash)}>refresh</button>
        </p>
      </div>
      <div className="buttons">
        <button
          onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide ' : 'show '}details</button>
        <button
          disabled={signatures.filter((value: string) => value === walletAddress).length === 1}
          onClick={() => approveTransactionHash(transaction)}>approve</button>
        <button
          disabled={threshold > signatures.length}
          onClick={() => executeTransaction(transaction)}>execute</button>
      </div>

      {showDetails && (
        <table>
          <tr>
            <th>Transaction Hash</th>
            <td><ValueWithButtons value={hash} /></td>
          </tr>
          <tr>
            <th>Nonce</th>
            <td><p>{transaction.data.nonce}</p></td>
          </tr>
          <tr>
            <th>Data</th>
            <td><p className="data">{transaction.data.data}</p></td>
          </tr>
          <tr>
            <th>Approvals:</th>
            <td>
              {signatures.length === 0 ? <p><em>No signatures</em></p> : (
                <ol>
                  {signatures.map((approval: string) => <li key={approval}><ValueWithButtons value={approval} /></li>)}
                </ol>
              )}
            </td>
          </tr>
        </table>
      )}
    </div>
  )
}

export default TransactionDetailComponent
