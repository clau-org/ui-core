<template>
  <div class="mx-5">
    <div v-for="element in elements" class="my-2">
      <div v-if="getShow(element)" class="my-2">
        <button
          class="flex w-full rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
        >
          <span class="underline">{{ element.title }}</span>
        </button>
      </div>

      <div v-else>
        <HeadlessDisclosure v-slot="{ open }">
          <HeadlessDisclosureButton
            class="flex w-full rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
          >
            <span>{{ element.title }}</span>

            <ChevronDownIcon v-if="open" class="h-5 w-5 text-purple-500" />

            <ChevronRightIcon v-else class="h-5 w-5 text-purple-500" />
          </HeadlessDisclosureButton>

          <HeadlessDisclosurePanel class="text-sm text-gray-500">
            <TestSelect
              :elements="element.subPageLabels"
              :indent="indent + 1"
            />
          </HeadlessDisclosurePanel>
        </HeadlessDisclosure>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
  const [open, toggleOpen] = useToggle()
  const getShow = (element) => element.subPageLabels.length === 0
  const props = defineProps(['elements', 'indent'])
</script>
