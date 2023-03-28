<template>
  <div class="">
    Index page

    <UiPre
      :json="{
        appPages,
        nuxtPages,

        navbar,
        footer,
        sidebar,

        navbarGrouped,
        footerGrouped,
        sidebarGrouped,
      }"
    />
    <div class="max-w-sm bg-blue-200">
      <h1>NAVBAR</h1>
      <div class="mx-5">
        <UiPageLabel :pageLabels="navbarGrouped">
          
          <template #child="{ pageLabel, index }" >
            <div>
              <button class="mb-2 flex w-full rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span class="underline">{{ pageLabel.title ?? pageLabel.id }} - {{ index }}</span>
              </button>
            </div>
          </template>
          
          <template #parent="{ open, pageLabel, index }">    
            <div>
              <div class="mb-2 flex w-full rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>{{ pageLabel.title ?? pageLabel.id }} - {{index}}</span>
                <ChevronDownIcon v-if="open" class="h-5 w-5 text-purple-500" />
                <ChevronRightIcon v-else class="h-5 w-5 text-purple-500" />              
              </div>
            </div>        
          </template>
  
        </UiPageLabel>  
      </div>
    </div>

    <!-- <div class="max-w-sm">
      <h1>FOOTER</h1>
      <UiPageLabel :pageLabels="footerGrouped">
        
        <template #child="{ pageLabel }" >
          <button class="mb-2 flex w-full rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
            <span class="underline">{{ pageLabel.title ?? pageLabel.id }}</span>
          </button>
        </template>
        
        <template #parent="{ open, pageLabel }">
            <div class="mb-2 flex w-full rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>{{ pageLabel.title ?? pageLabel.id }}</span>
                <ChevronDownIcon v-if="open" class="h-5 w-5 text-purple-500" />
                <ChevronRightIcon v-else class="h-5 w-5 text-purple-500" />
            </div>
        </template>

      </UiPageLabel>  
    </div> -->

    <!-- <div class="max-w-sm">
      <h1>SIDEBAR</h1>
      <UiPageLabel :pageLabels="sidebarGrouped" >
        
        <template #child="{ pageLabel }" >
          <button class="mb-2 flex w-full rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
            <span class="underline">{{ pageLabel.title ?? pageLabel.id }}</span>
          </button>
        </template>
        
        <template #parent="{ open, pageLabel }">
            <div class="mb-2 flex w-full rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>{{ pageLabel.title ?? pageLabel.id }}</span>
                <ChevronDownIcon v-if="open" class="h-5 w-5 text-purple-500" />
                <ChevronRightIcon v-else class="h-5 w-5 text-purple-500" />
            </div>
        </template>

      </UiPageLabel>  
    </div> -->

    <button @click="toggleLoading()">toggleLoading - {{ loading }}</button>

    <!-- <UiLoading :loading="loading">
      <UiPre :json="{ pages, navbar, sidebar, footer }" />
    </UiLoading> -->

    <UiImg src="/logo.jpg" class="max-w-lg rounded-lg m-1" />
    <UiDivider text="Hi" />
    <UiSpinner />
  </div>
</template>

<script setup>
  import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
  const [loading, toggleLoading] = useToggle()
  /**
   * WARNING: Index page should not appear on navbar, footer or sidebar
   */
  definePageMeta({
    navbar: {
      show: false,
    },
    footer: {
      show: false,
    },
    sidebar: {
      show: false,
    },
    layout: 'dev',
  })

  const {
    appPages,
    nuxtPages,

    navbar,
    footer,
    sidebar,

    navbarGrouped,
    footerGrouped,
    sidebarGrouped,
  } = useStoreNavigation()
</script>
