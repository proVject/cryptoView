<template>
  <div class="p-4 bg-white dark:bg-stone-800 rounded-b-xl shadow">
    <!--    <canvas ref="canvasEl" height="300"></canvas>-->
    <apex-charts ref="chart" class="mx-auto max-w-7xl" :options="chartOptions" :series="series"></apex-charts>
  </div>
</template>

<script setup>
import ApexCharts from 'vue3-apexcharts'
import {useMarketStore} from "~/store/market.js";
import {useDark} from "@vueuse/core";
import moment from "moment";
const { t } = useI18n();

const chart = ref()

const route = useRoute()
const props = defineProps({
  prices: {
    type: Array,
    required: true
  }
})

const isDark = useDark()

const marketStore = useMarketStore()

const coin = marketStore.marketList[0]

const currentCoinPrice = Number(coin.lastPrice)

const prices = computed(() => {
  return [...props.prices, [Date.now(), currentCoinPrice]]
})

const labels = computed(() => prices.value.map(p => moment(p[0]).format('hh:mm DD-MM-YYYY')))
const data = computed(() => prices.value.map(p => p[1]))

const chartOptions = computed(() => ({
  chart: {
    id: route.name,
    type: 'area',
    foreColor: isDark.value ? 'var(--color-white)' : 'var(--color-gray-900)',
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false
    },
  },
  annotations: {
    yaxis: [
      {
        y: data.value.at(-1),
        borderColor: 'var(--color-amber-500)',
        label: {
          borderColor: 'var(--color-amber-500)',
          style: {
            color: '#fff',
            background: 'var(--color-amber-500)'
          },
          text: String(data.value.at(-1))
        }
      }
    ]
  },
  dataLabels: {
    enabled: false
  },
  fill: {
    colors: ['var(--color-amber-500)'],
    type: 'gradient',
    gradient: {
      colors: undefined,
      shade: 'light',
      gradientToColors: ['var(--color-amber-200)'], // колір переходу
      opacityFrom: 0.8,
      opacityTo: 0.2,
    },
  },
  stroke: {
    curve: 'straight'
  },
  xaxis: {
    // show: false,
    categories: labels.value,
    labels: {
      show: false,
      // formatter: function (value) {
      //   return `${value}$`;
      // }
    }
  },
  grid: {
    show: false,
  },
  tooltip: {
    enabled: true,
    enabledOnSeries: undefined,
    followCursor: true,
    // custom: undefined,
    // fillSeriesColor: 'rgba(245, 158, 11, 0.2)',
    theme: isDark.value ? 'dark': 'light',
    // style: {
    //   fontSize: '12px',
    //   fontFamily: undefined
    // },
    // onDatasetHover: {
    //   highlightDataSeries: false,
    // },
    // x: {
    //   show: true,
    //   format: 'dd MMM',
    //   formatter: undefined,
    // },
    // y: {
    //   formatter: undefined,
    //   title: {
    //     formatter: (seriesName) => seriesName,
    //   },
    // },
    // z: {
    //   formatter: undefined,
    //   title: 'Size: '
    // },
    // marker: {
    //   show: true,
    // },
    // items: {
    //   display: flex,
    // },
    // fixed: {
    //   enabled: false,
    //   position: 'topRight',
    //   offsetX: 0,
    //   offsetY: 0,
    // },
  },
  yaxis: {
    opposite: true
  },
  legend: {
    show: true,
  },
}))

const series = computed(() => [
  {
    name: t('chart.tooltip_text', { currency: 'USDT' }),
    data: data.value,
    parsing: {
      x: 'date'  // Global x field
    },
  }
])

// watch([data], () => {
// chart.value.refresh()
// })

//
// chartInstance = new Chart(ctx, {
//   type: 'line',
//   data: {
//     labels,
//     datasets: [{
//       label: 'Price (USDT)',
//       data,
//       borderColor: '#f59e0b', // amber
//       backgroundColor: 'rgba(245, 158, 11, 0.2)',
//       tension: 0.4,
//       fill: true
//     }]
//   },
//   options: {
//     responsive: true,
//     plugins: {
//       legend: {display: false},
//       tooltip: {mode: 'index', intersect: false}
//     },
//     scales: {
//       x: {
//         ticks: {color: '#888'}
//       },
//       y: {
//         ticks: {color: '#888'}
//       }
//     }
//   }
// })
// }
</script>