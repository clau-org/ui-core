import { describe, test } from 'vitest'
import { useAsyncFn } from '../../src/composables/fn'
import { ref } from 'vue'
import { setup } from '@nuxt/test-utils'

describe('useAsyncFn - Async function utility', () => {
  const mockFn = async (input) => {
    return input.value * 2
  }

  test('expect data to be updated with the result of the async function', async ({
    expect,
  }) => {
    const { input, fn, data, isLoading } = useAsyncFn({
      input: ref(2),
      fn: mockFn,
    })

    await fn.value()

    expect(data.value).toBe(4)
  })

  test('expect isLoading to be true while the async function is running', async ({
    expect,
  }) => {
    const { input, fn, data, isLoading } = useAsyncFn({
      input: ref(2),
      fn: mockFn,
    })

    const promise = fn.value()
    expect(isLoading.value).toBe(true)
    await promise

    expect(isLoading.value).toBe(false)
  })

  test('expect error to be updated when the async function throws an error', async ({
    expect,
  }) => {
    const errorMockFn = async () => {
      throw new Error('Test error')
    }

    const { fn, error, isLoading } = useAsyncFn({
      fn: errorMockFn,
    })

    await fn.value()

    expect(error.value.message).toBe('Test error')
  })
})
