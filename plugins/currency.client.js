// plugins/binance.ts
export default defineNuxtPlugin(() => {
    const getCurrencies = (symbols) => {
        return $fetch(`https://open.er-api.com/v6/latest/USD`)
    }

    return {
        provide: {
            currency: {
                getCurrencies
            }
        }
    }
})