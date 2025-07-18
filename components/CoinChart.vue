<template>
  <div class="p-4 bg-white dark:bg-stone-800 rounded-xl shadow">
    <canvas ref="canvasEl" height="300"></canvas>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Filler } from 'chart.js'

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Filler)

const props = defineProps({
  prices: {
    type: Array,
    required: true
  }
})

const canvasEl = ref(null)
let chartInstance = null

const createChart = () => {
  const ctx = canvasEl.value.getContext('2d')
  if (chartInstance) {
    chartInstance.destroy()
  }

  const labels = props.prices.map(p => new Date(p[0]).toLocaleDateString())
  const data = props.prices.map(p => p[1])

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Price (USD)',
        data,
        borderColor: '#f59e0b', // amber
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {display: false},
        tooltip: {mode: 'index', intersect: false}
      },
      scales: {
        x: {
          ticks: {color: '#888'}
        },
        y: {
          ticks: {color: '#888'}
        }
      }
    }
  })
}

onMounted(() => {
  if (props.prices?.length) createChart()
})

onBeforeUnmount(() => {
  if (chartInstance) chartInstance.destroy()
})

watch(() => props.prices, () => {
  if (props.prices?.length) createChart()
})
</script>