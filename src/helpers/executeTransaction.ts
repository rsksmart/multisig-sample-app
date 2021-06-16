import { Safe, SafeSignature, SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import { Contract } from 'ethers'
import safeAbi from '@gnosis.pm/safe-core-sdk/dist/src/abis/SafeAbiV1-2-0.json'
import { EthSignSignature } from '@gnosis.pm/safe-core-sdk/dist/src/utils/signatures/SafeSignature'

// COPIED from https://github.com/gnosis/safe-core-sdk/blob/main/packages/safe-core-sdk/src/utils/transactions/gas.ts#L84-L107
// the function is as is and not modified other than removal of 'export'
async function estimateGasForTransactionExecution (
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

    return gas.toNumber()
  } catch (error) {
    return Promise.reject(error)
  }
}

// copied from https://github.com/gnosis/safe-core-sdk/blob/main/packages/safe-core-sdk/src/utils/signatures/index.ts
// the function is as is and not modified other than removal of 'export'
const generatePreValidatedSignature = (ownerAddress: string): SafeSignature => {
  const signature =
    '0x000000000000000000000000' +
    ownerAddress.slice(2) +
    '0000000000000000000000000000000000000000000000000000000000000000' +
    '01'

  return new EthSignSignature(ownerAddress, signature)
}

/**
 * A modified version of Gnosis's safe.executeTransaction function. For RSK, it
 * doubles the gas estimation which is required on RSK.
 * @param safe An EthersSafe which is used to get the safe and signer address
 * @param safeTransaction SafeTransaction ready to be executed
 * @returns ContractTransaction
 */
export const executeRskTransaction = async (
  safe: Safe,
  safeTransaction: SafeTransaction
) => {
  const signer = safe.getSigner()
  const signerAddress = await signer?.getAddress()

  if (!signerAddress) {
    throw new Error('No signer provided')
  }

  const safeContract = new Contract(safe.getAddress(), safeAbi, signer)
  const txHash = await safe.getTransactionHash(safeTransaction)
  const ownersWhoApprovedTx = await safe.getOwnersWhoApprovedTx(txHash)

  // add the signatures to the safeTransaction object
  for (const owner of ownersWhoApprovedTx) {
    safeTransaction.addSignature(generatePreValidatedSignature(owner))
  }

  const threshold = await safe.getThreshold()
  if (threshold > safeTransaction.signatures.size) {
    const signaturesMissing = threshold - safeTransaction.signatures.size
    throw new Error(
      `There ${signaturesMissing > 1 ? 'are' : 'is'} ${signaturesMissing} signature${
        signaturesMissing > 1 ? 's' : ''
      } missing`
    )
  }

  const gasLimit = await estimateGasForTransactionExecution(
    safeContract,
    signerAddress.toLowerCase(),
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
    { gasLimit: gasLimit * 2 }
  )

  return txResponse
}
