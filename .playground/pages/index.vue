<template>
  <div class="bg-red-500 h-screen">
    Hola
    <button @click="toggleLoading()">toggleLoading - {{ loading }}</button>

    <UiLoading :loading="loading">
      <UiPre :json="{ favicon, logo }" />
    </UiLoading>

    <UiImg src="/logo.jpg" class="max-w-lg rounded-lg m-1" />
    <UiDivider text="Hi" />
    <UiSpinner />
  </div>
</template>

<script setup>
const {
  brand: { favicon, logo },
} = useClauConfig();

const [loading, toggleLoading] = useToggle();

loading.value = true;
logger.info("hola");
logger.info({
  favicon,
  logo,
});
</script>
