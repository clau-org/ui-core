<template>
  <div class="bg-red-500 h-screen">
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
  definePageMeta({
    id: 'index',
    route: '/',
    title: 'index',
    description: 'index-description',
    navbar: {
      show: true,
    },
  })

  // const [loading, toggleLoading] = useToggle()
</script>
