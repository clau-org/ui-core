<template>
  <img :src="image" v-bind="$attrs" />
</template>

<script setup >
const { BASE_BUCKET } = useRuntimeConfig().public;
const props = defineProps(["src"]);
const image = `${BASE_BUCKET}${props.src}`;
</script>
