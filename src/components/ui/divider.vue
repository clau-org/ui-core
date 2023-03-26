<template>
  <div class="relative">
    <div class="absolute inset-0 flex items-center">
      <div class="w-full border-t border-black"></div>
    </div>
    <div class="relative flex justify-center text-sm my-6">
      <span class="px-2 bg-white text-black font-bold">{{ text }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    text: {
      required: true,
      type: String,
      default: '',
    },
  })
</script>
