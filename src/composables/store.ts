import { storeToRefs } from 'pinia'

export function useCustomStore(storeInstance: any) {
  const storeRefs = storeToRefs(storeInstance)
  const storeFunctions = Object.keys(storeInstance)
    .filter((key) => typeof storeInstance[key] === 'function')
    .reduce((acc, key) => {
      acc[key] = storeInstance[key]
      return acc
    }, {} as Record<string, any>)

  return {
    ...storeRefs,
    ...storeFunctions,
  }
}
