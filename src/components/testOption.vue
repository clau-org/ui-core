<template>
  <div>
    {{ title }}
    <button
      @click="toggleOpen()"
      class="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
    >
      <span>{{ title }}</span>
      <ChevronUpIcon
        :class="open ? 'rotate-180 transform' : ''"
        class="h-5 w-5 text-purple-500"
      />
    </button>
    <TestSelect :elements="element.subPageLabels" :indent="indent + 1" />
  </div>
</template>

<script setup>
  import { ChevronUpIcon } from '@heroicons/vue/20/solid'
  const props = defineProps(['element', 'indent'])
  const [open, toggleOpen] = useToggle()

  const title = props.element.title
</script>
