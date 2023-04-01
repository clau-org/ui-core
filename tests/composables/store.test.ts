import { describe, test,     } from 'vitest'
import { useCustomStore } from '../../src/composables/store'
import { ref } from 'vue'
import { setup } from '@nuxt/test-utils'

import { defineStore, createPinia } from 'pinia'

const pinia = createPinia()

const useCounter = defineStore('counter', () => {
  const counter = ref(0)
  const name = ref('Eduardo')
  function increment() {
    counter.value++
  }
  function decrement() {
    counter.value--
  }
  return { counter, name, increment,decrement }
})

describe('useCustomStore - Custom store utility', () => {
  test('expect store state to be exposed as refs', ({ expect }) => {
    const {counter} = useCustomStore(useCounter(pinia))

    expect(counter).toBeDefined()
    expect(counter.value).toBe(0)
  })

  test('expect store functions to be exposed', ({ expect }) => {
    const {increment,decrement} = useCustomStore(useCounter(pinia))

    expect(increment).toBeDefined()
    expect(decrement).toBeDefined()
  })

  test('expect store functions to work correctly', ({ expect }) => {
    const {increment,counter,decrement} = useCustomStore(useCounter(pinia))

    increment()
    expect(counter.value).toBe(1)

    decrement()
    expect(counter.value).toBe(0)
  })
})
