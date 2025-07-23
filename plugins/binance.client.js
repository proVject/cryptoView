// plugins/binance.ts
export default defineNuxtPlugin(() => {
    const BASE_URL = 'https://data-api.binance.vision'
    const BASE_WS_URL = 'wss://stream.binance.com:9443/ws'

    const initWsMarketList = (symbols) => {
        const params = symbols.map(t => `${t.toLowerCase()}@ticker`)?.join('/')
        return new WebSocket(`${BASE_WS_URL}/${params}`);
    }
    const getMarketList = (symbols) => {
        return $fetch(`${BASE_URL}/api/v3/ticker/24hr`, {
            params: { symbols: JSON.stringify(symbols) },
        })
    }


    const getCoinHistory = async (symbol = 'BTCUSDT', interval = '1d', limit = 30) => {
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
                getCoinHistory,
                initWsMarketList,
                getMarketList
            }
        }
    }
})