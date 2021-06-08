import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import React, { useEffect, useState } from 'react'
import ValueWithButtons from '../../../components/ValueWithButtons'

interface Interface {
  safe: Safe
  transaction: SafeTransaction
  handleError: (error: Error) => void
}

const TransactionDetailComponent: React.FC<Interface> = ({ safe, transaction, handleError }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [hash, setHash] = useState<string>('')
  const [signatures, setSignatures] = useState<string[]>([])
  const [threshold, setThreshold] = useState<number>(0)

  console.log(safe)

  useEffect(() => {
    safe.getTransactionHash(transaction).then((txHash: string) => {
      setHash(txHash)
      getApprovals(txHash)
    })

    safe.getThreshold().then((safeThreshold: number) => setThreshold(safeThreshold))
  }, [transaction])

  // Sign transaction "on-chain"
  const approveTransactionHash = () =>
    safe.approveTransactionHash(hash)
      .then((result: any) => getApprovals(hash))
      .catch(handleError)

  const executeTransaction = (transaction: SafeTransaction) =>
    safe.executeTransaction(transaction)
      .then((result: any) => console.log('result!', result))
      .catch(handleError)

  const getApprovals = (txHash: string) => safe.getOwnersWhoApprovedTx(txHash)
    .then((signers: string[]) => {
      console.log('getting signers', signers)
      setSignatures(signers)
    })
    .catch(handleError)

  return (
    <div className="transaction">
      <p><strong>to: </strong> {transaction.data.to}</p>
      <p><strong>value:</strong> {transaction.data.value}</p>
      <p><strong>approvals:</strong> {signatures.length} out of {threshold}</p>
      <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide ' : 'show '}details</button>

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
            <td><p>{transaction.data.data}</p></td>
          </tr>
          <tr>
            <th>Approvals:</th>
            <td>
              <ol>
                {signatures.map((approval: string) => <li key={approval}><ValueWithButtons value={approval} /></li>)}
              </ol>
            </td>
          </tr>
          <tr>
            <th>Options</th>
            <td>
              <button onClick={() => approveTransactionHash()}>approve</button>
              <button onClick={() => executeTransaction(transaction)}>execute</button>
            </td>
          </tr>
        </table>
      )}
    </div>
  )
}

export default TransactionDetailComponent
