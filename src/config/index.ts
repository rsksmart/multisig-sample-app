import local from './local.json'
import testnet from './testnet.json'
import rinkeby from './rinkeby.json'

export const getContracts = (chainId: number) => {
  switch (chainId) {
    case 4: return rinkeby
    case 31: return testnet
    default: return local
  }
}
