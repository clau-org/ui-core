<template>
    <div class="mx-5">
      <div v-for="pageLabel in pageLabels" class="my-2">
        <div v-if="getIfShouldShow(pageLabel)" class="my-2">
          <button
            class="flex w-full rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
          >
            <span class="underline">{{ pageLabel.title ?? pageLabel.id }}</span>
          </button>
        </div>
  
        <div v-else>
          <HeadlessDisclosure v-slot="{ open }">
            <HeadlessDisclosureButton
              class="flex w-full rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
            >
              <span>{{ pageLabel.title ?? pageLabel.id }}</span>
  
              <ChevronDownIcon v-if="open" class="h-5 w-5 text-purple-500" />
  
              <ChevronRightIcon v-else class="h-5 w-5 text-purple-500" />
            </HeadlessDisclosureButton>
  
            <HeadlessDisclosurePanel class="text-sm text-gray-500">
              <UiPageLabel :pageLabels="pageLabel.subPageLabels" />
            </HeadlessDisclosurePanel>
          </HeadlessDisclosure>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
    import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
    const getIfShouldShow = (pageLabel) => pageLabel.subPageLabels.length === 0
    const props = defineProps(['pageLabels'])
  </script>
  