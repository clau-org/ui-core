export const useConfig = () => {
  // env
  const env = useRuntimeConfig().public
  const { BASE_BUCKET } = env

  // Brand
  const favicon = `${BASE_BUCKET}/favicon.ico`
  const logo = `${BASE_BUCKET}/logo.jpg`
  const name = `Clau`

  return {
    ...env,
    brand: {
      favicon,
      logo,
      name,
    },
  }
}
