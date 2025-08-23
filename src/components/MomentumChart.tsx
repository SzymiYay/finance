import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom'
import type { HistoryData } from '../types/gem'

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
)

function getColor(i: number) {
  const colors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ]
  return colors[i % colors.length]
}

export default function MomentumChart() {
  const [history, setHistory] = useState<HistoryData | null>(null)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}/data/history.json`)
      .then((res) => res.json())
      .then((data: HistoryData) => setHistory(data))
      .catch((err) => console.error('Data loading error:', err))
  }, [])

  if (!history) return <p>Loading chart...</p>

  const labels = history.index.map((d) =>
    new Date(d).toLocaleDateString('pl-PL')
  )

  const datasets = history.columns.map((ticker, i) => ({
    label: ticker,
    data: history.data.map((row) => row[i]),
    borderColor: getColor(i),
    fill: false,
    tension: 0.1
  }))

  return (
    <>
      <div id="chart-container">
        <Line
          data={{ labels, datasets }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              zoom: {
                pan: {
                  enabled: true,
                  mode: 'x'
                },
                zoom: {
                  wheel: {
                    enabled: true
                  },
                  pinch: {
                    enabled: true
                  },
                  mode: 'x'
                }
              }
            },
            scales: {
              y: { title: { display: true, text: 'Momentum (%)' } },
              x: { title: { display: true, text: 'Data' } }
            }
          }}
        />
      </div>
    </>
  )
}
