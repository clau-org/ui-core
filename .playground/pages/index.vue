<template>
  <div class="">
    Index page

    <!-- <button @click="toggleLoading()">toggleLoading - {{ loading }}</button>

    <UiLoading :loading="loading">
      <UiPre :json="{ pages, navbar, sidebar, footer }" />
    </UiLoading>

    <UiImg src="/logo.jpg" class="max-w-lg rounded-lg m-1" />
    <UiDivider text="Hi" />
    <UiSpinner /> -->
  </div>
</template>

<script setup>

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
  })
</script>
