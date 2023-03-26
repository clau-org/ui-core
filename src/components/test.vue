<template>
  <div>
    <select v-model="selectedPage">
      <option value="">Select a page</option>
      <option v-for="page in navbarGrouped" :value="page">
        {{ page.title }}
      </option>
    </select>

    <select v-if="selectedPage" v-model="selectedSubPage">
      <option value="">Select a sub-page</option>
      <option v-for="subPage in selectedPage.subPageLabels" :value="subPage">
        {{ subPage.title }}
      </option>
    </select>
  </div>
</template>

<script setup>
  const { navbarGrouped } = useStoreNavigation()
  const selectedPage = ref(null)
  const selectedSubPage = ref(null)
</script>
