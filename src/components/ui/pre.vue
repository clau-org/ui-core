<template>
  <div class="p-1">
    <JsonViewer
      :value="json"
      copyable
      sort
      theme="jv-dark"
      class="text-white bg-black rounded-lg p-1 overflow-auto min-w-min max-w-lg"
    />
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
