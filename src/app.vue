<template>
  <div>
    <UiPre :json="{ navigationPages, navbarPageLabels, groupedNavbar }" />
    <!-- <div>
      <TestSelect :elements="navbarGrouped" :indent="1" />
    </div> -->

    <NuxtPage> </NuxtPage>
  </div>
</template>

<script setup>
  const { navigationPages, navbarPageLabels, groupedNavbar } = useStoreNavigation()
</script>
