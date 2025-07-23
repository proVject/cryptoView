import {mapBinanceTickerMessage, mapHttpMarketList} from "~/utils/marketMapping.js";
import {setInterval} from "#app/compat/interval.js";

const MARKET_LIST_INTERVAL = 3_000

export const useMarketStore = defineStore('market', {
    state: () => ({
        marketList: [],
        marketListLoading: false,
        marketListError: null,

        marketListTimerId: null,

        marketListWs: null,
    }),
    actions: {
        async getMarketList(symbols) {
            try {
                const {$binance} = useNuxtApp()
                this.marketListLoading = true;
                const marketList = await $binance.getMarketList(symbols)
                this.marketList = mapHttpMarketList(marketList)
            } catch (e) {
                console.log(e)
                this.marketListError = 'Failed to fetch prices'
                return Promise.reject(e)
            }
            this.marketListLoading = false
        },
        initMarketList(symbols) {
            const {$binance} = useNuxtApp()

            if (this.marketListTimerId) return
            this.marketListTimerId = setInterval(async () => {
                try {
                    const marketList = await $binance.getMarketList(symbols)
                    if (!marketList) throw Error()
                    const marketListChanged = marketList.map((t, idx) => {
                        if (Number(t.lastPrice) > Number(this.marketList[idx].lastPrice)) {
                            t.priceChange = 'up'
                        } else if (Number(t.lastPrice) < Number(this.marketList[idx].lastPrice)) {
                            t.priceChange = 'down'
                        }
                        return t
                    })
                    this.marketList = mapHttpMarketList(marketListChanged)
                } catch (e) {
                }
            }, MARKET_LIST_INTERVAL)
        },
        destroyMarketList() {
            if (this.marketListTimerId) clearInterval(this.marketListTimerId)
            this.marketListTimerId = null
        },
        initWsMarketList(symbols) {
            try {
                const {$binance} = useNuxtApp()
                this.marketListWs = $binance.initWsMarketList(symbols)

                this.marketListWs.onmessage = event => {
                    const msg = JSON.parse(event.data)
                    const newPriceTicker = mapBinanceTickerMessage(msg)
                    const oldPriceTickerId = this.marketList.findIndex(t => t.symbol === newPriceTicker.symbol)
                    newPriceTicker.priceChange = 'same'
                    if (Number(newPriceTicker.lastPrice) > Number(this.marketList[oldPriceTickerId].lastPrice)) {
                        newPriceTicker.priceChange = 'up'
                    } else if (Number(newPriceTicker.lastPrice) < Number(this.marketList[oldPriceTickerId].lastPrice)) {
                        newPriceTicker.priceChange = 'down'
                    }
                    this.marketList[oldPriceTickerId] = mapHttpMarketItem(newPriceTicker)

                }
                this.marketListWs.onerror = event => {
                    // marketListError.value = 'Failed to fetch prices'
                }
            }catch  (e) {
                console.log(e)
            }
        },
        destroyWsMarketList() {
            console.log(this.marketListWs?.close)
            this.marketListWs?.close?.()
            this.marketListWs = null
        },
    }
})