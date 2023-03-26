<template>
  <div>
    <UiPre :json="{ pages }" />
    <NuxtPage> </NuxtPage>
  </div>
</template>

<script setup>
  const { pages, navbar, sidebar, footer } = useStoreNavigation()
</script>
