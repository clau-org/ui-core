<template>
  <div>
    <UiPre :json="{ navbarGrouped, navbar }" />
    <div>
      <TestSelect :elements="navbarGrouped" :indent="1"/>
  </div>

    <!-- <NuxtPage> </NuxtPage> -->
  </div>
</template>

<script setup>
  const { navbarGrouped, navbar } = useStoreNavigation()
</script>
