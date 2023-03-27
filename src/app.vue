<template>
  <div>
    <NuxtPage> </NuxtPage>
  </div>
</template>

<script setup>
  const {
    appPages,
    nuxtPages,

    navbar,
    footer,
    sidebar,

    navbarGrouped,
    footerGrouped,
    sidebarGrouped,
  } = useStoreNavigation()
</script>
