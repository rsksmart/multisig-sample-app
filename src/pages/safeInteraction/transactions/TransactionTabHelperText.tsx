import React from 'react'
import { TransactionStatus } from '../../../constants'

interface Interface {
  screen: TransactionStatus
  count: number
}

const TransactionTabHelperText: React.FC<Interface> = ({ count, screen }) => {
  if (count === 0) {
    return (
      <p><em>No {screen.toString()} transactions</em></p>
    )
  }

  switch (screen) {
    case TransactionStatus.PENDING:
      return (
        <p>Transactions must be executed in nonce order. Please execute the first transaction before interacting with the next. If you do not want to execute the next transaction, create and execute a rejection transaction which will move to the next nonce.</p>
      )
    case TransactionStatus.REJECTED:
      return (
        <p>These transactions have a corresponding &quot;Executed&quot; transaction with the same nonce.</p>
      )
  }

  return (<></>)
}

export default TransactionTabHelperText
