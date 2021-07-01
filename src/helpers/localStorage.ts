/* eslint-disable no-unused-vars */
export enum LocalStorageKeys {
  SAFES = 'SAFES',
  TRANSACTIONS = 'TRANSACTIONS'
}

const setKey = (key: string, value: string) =>
  localStorage.setItem(key, value)

const setJsonKey = (key: LocalStorageKeys, chainId: number, value: any) =>
  setKey(`${key}_${chainId.toString()}`, JSON.stringify(value))

export const getKey = (key: LocalStorageKeys, chainId: number) => {
  const content = localStorage.getItem(`${key}_${chainId.toString()}`)
  return content ? JSON.parse(content) : null
}

export const saveSafeAddresToLocalStorage = (safeAddress: string, chainId: number) => {
  const safes = getKey(LocalStorageKeys.SAFES, chainId)
  if (!safes) {
    return setJsonKey(LocalStorageKeys.SAFES, chainId, [safeAddress.toLowerCase()])
  }

  return !safes.includes(safeAddress.toLowerCase())
    ? setJsonKey(LocalStorageKeys.SAFES, chainId, [...safes, safeAddress.toLowerCase()])
    : null
}
