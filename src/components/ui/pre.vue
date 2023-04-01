<template>
  <div
    class="p-1 text-white bg-black rounded-lg overflow-auto min-w-min max-w-lg"
  >
    <JsonViewer :value="json" copyable sort theme="jv-dark" class="" />
  </div>
</template>

<script setup>
  import { JsonViewer } from 'vue3-json-source-viewer'
  import 'vue3-json-source-viewer/dist/index.css'

  const props = defineProps({
    json: {
      Object,
      default: {},
    },
  })
</script>
