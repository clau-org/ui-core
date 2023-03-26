export const useConfig = () => {
  // Runtime configuration
  const { public: publicRuntimeConfig, ...runtimeConfig } = useRuntimeConfig()

  // App configuration
  const appConfig = useAppConfig()

  // Brand
  const { BASE_BUCKET } = publicRuntimeConfig
  const favicon = `${BASE_BUCKET}/favicon.ico`
  const logo = `${BASE_BUCKET}/logo.jpg`
  const name = `Clau`

  return {
    ...runtimeConfig,
    ...publicRuntimeConfig,
    ...appConfig,
    brand: {
      favicon,
      logo,
      name,
    },
  }
}
