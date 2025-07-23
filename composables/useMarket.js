import {useMarketStore} from "~/store/market.js";

export const useMarket = (symbolsList) => {

    const marketStore = useMarketStore()
    const visibleTimerId = ref(null)
    const hiddenDelay = 10_000

// if one minute the page is not visible disconnect to save resources
// connect again if the page is visible again
    const initVisibilityChange = () => {
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                // marketStore.destroyMarketList()
                visibleTimerId.value = setTimeout(() => {
                    // if (!marketStore.marketList) return
                    marketStore.destroyMarketList()
                }, hiddenDelay)
            } else {
                if (visibleTimerId.value) clearTimeout(visibleTimerId.value)
                if (marketStore.marketList) return
                marketStore.initMarketList(symbolsList.value)
            }
        });
    }

    onMounted(async () => {
        try {
            await marketStore.getMarketList(symbolsList.value)
            // marketStore.initMarketList(symbolsList.value)
            marketStore.initWsMarketList(symbolsList.value)
            initVisibilityChange()
        } catch (e) {}
    })

    onUnmounted(() => {
        marketStore.destroyWsMarketList()
    })
}