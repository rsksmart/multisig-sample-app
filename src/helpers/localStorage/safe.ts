import { getParsedItem, LocalStorageKeys, setJsonKey } from './utils'

const getSafeAddressKey = (chainId: number) =>
  `${LocalStorageKeys.SAFES}_${chainId.toString()}`

export const getSafeAddresses = (chainId: number) => {
  return getParsedItem<string>(getSafeAddressKey(chainId)) || []
}

export const saveSafeAddressToLocalStorage = (
  safeAddress: string,
  chainId: number
) => {
  const safeAddressKey = getSafeAddressKey(chainId)
  const safes = getSafeAddresses(chainId)
  if (!safes) {
    return setJsonKey(safeAddressKey, [safeAddress.toLowerCase()])
  }

  return !safes.includes(safeAddress.toLowerCase())
    ? setJsonKey(safeAddressKey, [...safes, safeAddress.toLowerCase()])
    : null
}
