export const useCoinsStore = defineStore('coins', {
    state: () => ({
        coinHistory: [],
        coinHistoryLoading: false,
        coinHistoryError: null,
    }),
    actions: {
        async getCoinHistory(symbol, interval = '1d', limit = 30) {
            try {
                const {$binance} = useNuxtApp()
                this.coinHistoryLoading = true;
                const coinHistory = await $binance.getCoinHistory(symbol, interval, limit)
                this.coinHistory = coinHistory.map(([time, open]) => [time, parseFloat(open)])
            } catch (e) {
                console.log(e)
                this.coinHistoryError = 'Failed to fetch prices'
                return Promise.reject(e)
            }
            this.coinHistoryLoading = false
        },
    }
})