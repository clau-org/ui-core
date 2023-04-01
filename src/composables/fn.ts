import { ref, reactive } from 'vue'
export function useAsyncFn({
  input: _input,
  fn: _fn,
}: {
  input?: any
  fn: Function
}) {
  const input = reactive(_input ?? {})

  const data = ref<any>(null)
  const error = ref<any>(null)

  const isLoading = ref<Boolean>(false)

  const fn = ref(async () => {
    isLoading.value = true

    try {
      data.value = await _fn(input)
    } catch (e) {
      error.value = e
    }

    isLoading.value = false
  })

  return {
    input,
    fn,

    data,
    error,

    isLoading,
  }
}
