export enum LocalStorageKeys {
    SAFES = 'SAFES'
  }

export const setKey = (key: string, value: string) => localStorage.setItem(key, value)

export const removeKey = (key: string) => localStorage.removeItem(key)

export const setJsonKey = (key: string, value: any, serializer?: (value: any) => string) => {
  const serializedValue = serializer ? serializer(value) : JSON.stringify(value)
  setKey(key, serializedValue)
}

export const safeParse = <T>(content: string): T[] | null => {
  try {
    return JSON.parse(content)
  } catch (error) {
    console.warn('Error on parsing localstorage content', content)
    return null
  }
}

export const getParsedItem = <T>(key: string, parser?: (content: string) => T[]): T[] | null => {
  const content = localStorage.getItem(key)
  if (!content) {
    return null
  }
  return parser ? parser(content) : safeParse(content)
}
