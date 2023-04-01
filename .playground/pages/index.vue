<template>
  <div class="">
    Index page

    <UiPre
      :json="{
        input,
        fn,
        data,
        error,
        isLoading,

        a,
        b,
        resul,
        sumStore,
      }"
    />
    <!-- <div class="max-w-sm bg-blue-200">
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
    </div> -->

    <div>
      <button @click="toggleLoading()">toggleLoading - {{ loading }}</button>
    </div>

    <input type="number" v-model="input.a" />
    <input type="number" v-model="input.b" />
    <div>
      <button v-if="!isLoading" class="bg-blue-300 px-4" @click="fn()">
        Pito
      </button>
    </div>

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

  const { a, b, resul, sum: sumStore } = useCustomStore(useSumActions())

  // const sum = async({a,b}) => {
  //   a = parseInt(a)
  //   b = parseInt(b)
  //   return new Promise(function(resolve, reject) {
  //       setTimeout(() => {
  //           logger.debug({a,b})
  //           resolve(a+b);
  //       }, 10000)
  //   });

  // }

  const {
    input,
    fn,

    data,
    error,

    isLoading,
  } = sumStore()
</script>
