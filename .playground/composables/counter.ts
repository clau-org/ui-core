import { defineStore } from 'pinia'


export const useSumActions = defineStore('sumActions', () => {

    const a = ref(78)
    const b = ref(4)
    const resul = ref(0)

    function sum(){
        return useAsyncFn({
           input: {a,b},
           fn: async() => {
               return new Promise(function(resolve, reject) { 
                   setTimeout(() => {
                       logger.debug({a,b})
                       resul.value = a.value+b.value 
                       resolve(a.value+b.value);
                   }, 10000)
               });
           },
       })
    }

    return {
        a,
        b,
        resul,
        sum,
    }
})