<template>
  <div>
    <UiPre
      :json="{
        appPages,
        nuxtPages,

        navbar,
        footer,
        sidebar,

        navbarGrouped,
        footerGrouped,
        sidebarGrouped,
      }"
    />
    <div class="max-w-sm">
      <h1>NAVBAR</h1>
      <UiPageLabel :pageLabels="navbarGrouped" />
    </div>

    <div class="max-w-sm">
      <h1>FOOTER</h1>
      <UiPageLabel :pageLabels="footerGrouped" />
    </div>

    <div class="max-w-sm">
      <h1>SIDEBAR</h1>
      <UiPageLabel :pageLabels="sidebarGrouped" />
    </div>

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
