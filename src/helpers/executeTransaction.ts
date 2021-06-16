import { Safe, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import { Contract } from 'ethers'
import safeAbi from '@gnosis.pm/safe-core-sdk/dist/src/abis/SafeAbiV1-2-0.json'

export async function estimateGasForTransactionExecution (
  contract: any,
  from: string,
  tx: SafeTransaction
): Promise<number> {
  try {
    const gas = await contract.estimateGas.execTransaction(
      tx.data.to,
      tx.data.value,
      tx.data.data,
      tx.data.operation,
      tx.data.safeTxGas,
      tx.data.baseGas,
      tx.data.gasPrice,
      tx.data.gasToken,
      tx.data.refundReceiver,
      tx.encodedSignatures(),
      { from, gasPrice: tx.data.gasPrice }
    )
    // Double the gasLimit for RSK networks. In the end, it will use the original gasEstimage
    // but for it to work on RSK, it needs to be increased
    const newGasEstimate = gas.toNumber() * 2

    return newGasEstimate
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Execute a transaction on the RSK network estimating double the gas that it should.
 * @param safe An EthersSafe which is used to get the safe and signer address
 * @param safeTransaction SafeTransaction ready to be executed
 * @returns ContractTransaction
 */
export const executeRskTransaction = async (
  safe: Safe,
  safeTransaction: SafeTransaction
) => {
  const signer = safe.getSigner()
  const address = await signer?.getAddress() || ''

  const safeContract = new Contract(safe.getAddress(), safeAbi, signer)

  const gasLimit = await estimateGasForTransactionExecution(
    safeContract,
    address,
    safeTransaction
  )

  const txResponse = await safeContract.execTransaction(
    safeTransaction.data.to,
    safeTransaction.data.value,
    safeTransaction.data.data,
    safeTransaction.data.operation,
    safeTransaction.data.safeTxGas,
    safeTransaction.data.baseGas,
    safeTransaction.data.gasPrice,
    safeTransaction.data.gasToken,
    safeTransaction.data.refundReceiver,
    safeTransaction.encodedSignatures(),
    { gasLimit }
  )

  return txResponse
}
