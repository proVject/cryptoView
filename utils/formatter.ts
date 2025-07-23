import getSymbolFromCurrency from 'currency-symbol-map'

export const formatCurrency = (value: number, currency = 'USD') => {
    const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value)

    const customSymbol = getSymbolFromCurrency(currency)

    if (customSymbol) {
        return formatted.replace(/^(\D+)/, customSymbol); // замінює валютний префікс
    }
}

export const formatNumber = (value: number) => {
    if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1) + 'B'
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + 'M'
    if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K'
    return value.toString()
}

export const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
}