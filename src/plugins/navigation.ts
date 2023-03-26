export default defineNuxtPlugin((nuxtApp) => {
  logger.info('plugin')
  useStoreNavigation().setupPages()
})
