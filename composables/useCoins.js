export const useCoins = () => {
    const coins = ref([])
    const loading = ref(false)
    const error = ref(null)

    const fetchCoins = async (symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT']) => {
        const {$binance} = useNuxtApp()
        loading.value = true
        try {
            coins.value = await $binance.getPriceList(symbols)
        } catch (err) {
            error.value = 'Failed to fetch prices'
        } finally {
            loading.value = false
        }
    }

    const fetchCoinHistory = async (symbol, interval = '1d', limit = 30) => {
        const {$binance} = useNuxtApp()
        try {
            const raw = await $binance.getPriceHistory(symbol, interval, limit)
            // Chart.js expects [timestamp, price] pairs
            return raw.map(([time, open]) => [time, parseFloat(open)])
        } catch (err) {
            return []
        }
    }

    return {
        coins,
        loading,
        error,
        fetchCoins,
        fetchCoinHistory,
    }
}