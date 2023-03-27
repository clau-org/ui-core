<template>
  <div class="">
    Index page

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

    <button @click="toggleLoading()">toggleLoading - {{ loading }}</button>

    <UiLoading :loading="loading">
      <UiPre :json="{ pages, navbar, sidebar, footer }" />
    </UiLoading>

    <UiImg src="/logo.jpg" class="max-w-lg rounded-lg m-1" />
    <UiDivider text="Hi" />
    <UiSpinner />
  </div>
</template>

<script setup>
  const [loading, toggleLoading] = useToggle()
  /**
   * WARNING: Index page should not appear on navbar, footer or sidebar
   */
  definePageMeta({
    navbar: {
      show: false,
    },
    footer: {
      show: false,
    },
    sidebar: {
      show: false,
    },
    layout: 'dev',
  })

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
