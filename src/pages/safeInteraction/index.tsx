import React, { useState, MouseEvent, useEffect } from 'react'
import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import Navigation from './Navigation'
import TransactionsPanel from './transactions'
import Dashboard from './Dashboard'
import PolicyComponent from './policies'
import AssetsComponent from './assets'
import TransactionCreatedModal from '../../components/TransactionCreatedModal'
import { TransactionStatus } from '../../constants'

interface Interface {
  safe: Safe
  walletAddress: string
  handleLogout: () => void
  handleError: (err: Error | null) => void
}

// Wrapper for transaction to keep track of the status, and hash to be used as an identifier
export interface TransactionBundle {
  transaction: SafeTransaction
  hash: string
  status: TransactionStatus
}

const SafeInteraction: React.FC<Interface> = ({ safe, walletAddress, handleError, handleLogout }) => {
  // UI Only
  const [selectedTab, setSelectedTab] = useState<string>('dashboard')
  const [showTransactionInfo, setShowTransactionInfo] = useState<boolean>(false)
  const changeActive = (evt: MouseEvent<HTMLButtonElement>) => setSelectedTab(evt.currentTarget.id)

  const [safeNonce, setSafeNonce] = useState(0)

  // Transaction Management, all transactions:
  const [transactions, setTransactions] = useState<TransactionBundle[]>([])

  // Add a new PENDING transaction to the list
  const addTransaction = (transaction: SafeTransaction) => {
    // get the hash to be used as an identifier
    safe.getTransactionHash(transaction)
      .then((hash: string) => {
        setTransactions([...transactions, { status: TransactionStatus.PENDING, transaction, hash }])
        setShowTransactionInfo(true)
      })
  }

  // update a transaction to 'EXECUTED' or 'REJECTED' if nonce is the same
  const updateTransactionStatus = (transactionBundle: TransactionBundle) => {
    const newTransactionList = transactions.map((item: TransactionBundle) => {
      if (item.hash === transactionBundle.hash || item.transaction.data.nonce === transactionBundle.transaction.data.nonce) {
        return {
          ...item,
          status: item.hash === transactionBundle.hash ? TransactionStatus.EXECUTED : TransactionStatus.REJECTED
        }
      } else {
        return item
      }
    })
    setTransactions(newTransactionList as TransactionBundle[])

    // get updated nonce:
    getSafeNonce()
  }

  const getSafeNonce = () => safe.getNonce().then((nonce: number) => setSafeNonce(nonce))

  useEffect(() => {
    getSafeNonce()
  }, [safe])

  const closeModalAndSwitchScreen = () => {
    setShowTransactionInfo(false)
    setSelectedTab('transactions')
  }

  return (
    <section className="selectedSafe">
      <Navigation handleLogout={handleLogout} changeActive={changeActive} selected={selectedTab} />
      {selectedTab === 'dashboard' && <Dashboard safe={safe} />}
      {selectedTab === 'transactions' && <TransactionsPanel safe={safe} transactions={transactions} handleError={handleError} updateTransactionStatus={updateTransactionStatus} walletAddress={walletAddress} />}
      {selectedTab === 'assets' && <AssetsComponent safe={safe} handleError={handleError} addTransaction={addTransaction} nonce={safeNonce} />}
      {selectedTab === 'policy' && <PolicyComponent safe={safe} addTransaction={addTransaction} handleError={handleError} />}

      {showTransactionInfo && <TransactionCreatedModal closeModal={() => setShowTransactionInfo(false)} changeScreen={closeModalAndSwitchScreen} />}
    </section>
  )
}

export default SafeInteraction
