import coins from '../data/coinsObj.json'


export const mapHttpMarketItem = (item) => {
    const coinName = item.symbol.replace('USDT', '')
    return {
        ...item,
        name: coins[coinName].name,
        shortName: coinName,
        image: coins[coinName].image
    }
}
export const mapHttpMarketList = (list) => {
    return list.map(mapHttpMarketItem)
}

export const mapBinanceTickerMessage = (msg) => {
    return {
        symbol: msg.s,                    // Symbol
        priceChange: msg.p,              // Price change
        priceChangePercent: msg.P,       // Price change percent
        weightedAvgPrice: msg.w,         // Weighted average price
        prevClosePrice: msg.x,           // Previous close price
        lastPrice: msg.c,                // Last price
        lastQty: msg.Q,                  // Last quantity
        bidPrice: msg.b,                 // Best bid price
        bidQty: msg.B,                   // Best bid quantity
        askPrice: msg.a,                 // Best ask price
        askQty: msg.A,                   // Best ask quantity
        openPrice: msg.o,                // Open price
        highPrice: msg.h,                // High price
        lowPrice: msg.l,                 // Low price
        volume: msg.v,                   // Volume
        quoteVolume: msg.q,              // Quote volume
        openTime: msg.O,                 // Open time
        closeTime: msg.C,                // Close time
        firstId: msg.F,                  // First trade ID
        lastId: msg.L,                   // Last trade ID
        count: msg.n                     // Trade count
    };
}