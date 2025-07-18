// plugins/binance.ts
export default defineNuxtPlugin(() => {
    const BASE_URL = 'https://api.binance.com'

    const getPriceList = async (symbols = ['BTCUSDT', 'ETHUSDT']) => {
        const requests = symbols.map((symbol) =>
            $fetch(`/api/v3/ticker/24hr`, {
                baseURL: BASE_URL,
                params: { symbol },
            })
        )
        return Promise.all(requests)
    }

    const getPriceHistory = async (symbol = 'BTCUSDT', interval = '1d', limit = 30) => {
        return $fetch('/api/v3/klines', {
            baseURL: BASE_URL,
            params: {
                symbol,
                interval,
                limit,
            }
        })
    }

    return {
        provide: {
            binance: {
                getPriceList,
                getPriceHistory,
            }
        }
    }
})