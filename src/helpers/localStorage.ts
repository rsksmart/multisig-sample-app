/* eslint-disable no-unused-vars */
export enum LocalStorageKeys {
  SAFES = 'SAFES',
  TRANSACTIONS = 'TRANSACTIONS'
}

const setKey = (key: LocalStorageKeys, value: string) =>
  localStorage.setItem(key, value)

const setJsonKey = (key: LocalStorageKeys, value: any) =>
  setKey(key, JSON.stringify(value))

export const getKey = (key: LocalStorageKeys) => {
  const content = localStorage.getItem(key)
  return content ? JSON.parse(content) : null
}

export const saveSafeAddresToLocalStorage = (safeAddress: string) => {
  const safes = getKey(LocalStorageKeys.SAFES) as string[]
  if (!safes) {
    return setJsonKey(LocalStorageKeys.SAFES, [safeAddress.toLowerCase()])
  }

  return !safes.includes(safeAddress.toLowerCase())
    ? setJsonKey(LocalStorageKeys.SAFES, [...safes, safeAddress.toLowerCase()])
    : null
}
