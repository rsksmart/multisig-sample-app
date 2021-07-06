import React, { useState, useEffect } from 'react'
import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import Navigation from './Navigation'
import TransactionsPanel from './transactions'
import Dashboard from './Dashboard'
import PolicyComponent from './policies'
import AssetsComponent from './assets'
import TransactionCreatedModal from '../../components/TransactionCreatedModal'
import { Screens, TransactionStatus } from '../../constants'
import { getTransactions } from '../../helpers/safeServiceClient'

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
  isReject: boolean
  isPublished: boolean
}

const SafeInteraction: React.FC<Interface> = ({ safe, walletAddress, handleError, handleLogout }) => {
  // UI Only
  const [selectedTab, setSelectedTab] = useState<Screens>(Screens.DASHBOARD)
  const [showTransactionInfo, setShowTransactionInfo] = useState<boolean>(false)
  const changeActive = (screen: Screens) => setSelectedTab(screen)

  // Keep track of the Apps transaction nonce, starting with the safe's nonce
  const [appNonce, setAppNonce] = useState(0)

  useEffect(() => {
    safe.getNonce().then((nonce: number) => {
      setAppNonce(nonce)

      // get transactions from the service
      getTransactions(safe, nonce)
        .then((bundles: TransactionBundle[]) => {
          setTransactions(bundles)
          // update the app's nonce
          bundles.length !== 0 &&
            setAppNonce(bundles[bundles.length - 1].transaction.data.nonce + 1)
        })
        .catch(handleError)
    })
  }, [safe])

  // Transaction Management, all transactions:
  const [transactions, setTransactions] = useState<TransactionBundle[]>([])

  // Add a new PENDING transaction to the list
  const addTransaction = (incomingTransaction: SafeTransaction, isReject?: boolean) => {
    // set the correct nonce if there are pending transactions:
    const transaction = !isReject
      ? new SafeTransaction({ ...incomingTransaction.data, nonce: appNonce })
      : incomingTransaction

    // get the hash to be used as an identifier
    safe.getTransactionHash(transaction)
      .then((hash: string) => {
        // create new transaction list
        const newTransactionList = [...transactions, { status: TransactionStatus.PENDING, transaction, hash, isReject: isReject || false, isPublished: false }]

        // sort the order of transactions by nonce:
        const nonceSorted = newTransactionList.sort((a: TransactionBundle, b: TransactionBundle) =>
          (a.transaction.data.nonce > b.transaction.data.nonce) ? 1 : -1)

        // set the sorted transactions
        setTransactions(nonceSorted)
        setShowTransactionInfo(true)

        // increase the app's nonce by 1 if it isn't a reject transaction
        !isReject && setAppNonce(appNonce + 1)
      })
  }

  // update a transaction bundle
  const updateTransactionBundle = (transactionBundle: TransactionBundle) => {
    let list = transactions.map((bundle: TransactionBundle) =>
      bundle.hash === transactionBundle.hash ? transactionBundle : bundle)

    // if the status is EXECUTED, then also update other transactions with the same nonce to REJECTED:
    if (transactionBundle.status === TransactionStatus.EXECUTED) {
      list = list.map((bundle: TransactionBundle) =>
        (bundle.transaction.data.nonce === transactionBundle.transaction.data.nonce &&
          bundle.status === TransactionStatus.PENDING)
          ? { ...bundle, status: TransactionStatus.REJECTED } : bundle
      )
    }

    setTransactions(list)
  }

  const closeModalAndSwitchScreen = () => {
    setShowTransactionInfo(false)
    setSelectedTab(Screens.TRANSACTIONS)
  }

  return (
    <section className="selectedSafe">
      <Navigation handleLogout={handleLogout} changeActive={changeActive} selected={selectedTab} />
      {selectedTab === Screens.DASHBOARD && <Dashboard safe={safe} />}
      {selectedTab === Screens.TRANSACTIONS && (
        <TransactionsPanel
          safe={safe}
          transactions={transactions}
          handleError={handleError}
          addTransaction={addTransaction}
          updateTransactionBundle={updateTransactionBundle}
          walletAddress={walletAddress} />
      )}
      {selectedTab === Screens.ASSETS && <AssetsComponent safe={safe} handleError={handleError} addTransaction={addTransaction} />}
      {selectedTab === Screens.POLICY && <PolicyComponent safe={safe} addTransaction={addTransaction} handleError={handleError} />}

      {showTransactionInfo && <TransactionCreatedModal closeModal={() => setShowTransactionInfo(false)} changeScreen={closeModalAndSwitchScreen} />}
    </section>
  )
}

export default SafeInteraction
