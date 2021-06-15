import { Provider, TransactionReceipt } from '@ethersproject/providers'

export const transactionListener = (web3Provider: Provider, tx: string) =>
  new Promise((resolve, reject) => {
    const checkInterval = setInterval(() =>
      web3Provider.getTransactionReceipt(tx)
        .then((response: TransactionReceipt) => {
          console.log('checking...', response)
          if (response) {
            clearInterval(checkInterval)
            response.status && response.status === 1 ? resolve(response) : reject(new Error('Transaction Failed'))
          }
        })
        .catch((err: Error) => reject(err))
    , 2000)
  })
