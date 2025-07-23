export const useCurrencyStore = defineStore('currency', {
    state: () => ({
        currencies: null,
        currenciesLoading: false,
        currenciesError: null,
    }),
    actions: {
        async getCurrencies() {
            try {
                const {$currency} = useNuxtApp()
                this.currenciesLoading = true;
                const c = await $currency.getCurrencies()
                this.currencies = c.rates
            } catch (e) {
                console.log(e)
                this.currenciesError = 'Failed to fetch prices'
                return Promise.reject(e)
            }
            this.currenciesLoading = false
        },
    }
})