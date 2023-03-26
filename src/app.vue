<template>
  <div>
    <UiPre :json="{ pages, navbar, groupedNavbar }" />
    <NuxtPage> </NuxtPage>
  </div>
</template>

<script setup>
  const { pages, navbar, groupedNavbar } = useStoreNavigation()
</script>
