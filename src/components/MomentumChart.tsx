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
import styles from './MomentumChart.module.css'

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

const ranges: Record<string, number | null> = {
  All: null,
  '6M': 180,
  '3M': 90,
  '1M': 30,
  '2W': 14,
  '1W': 7
}

export default function MomentumChart() {
  const [history, setHistory] = useState<HistoryData | null>(null)
  const [range, setRanges] = useState<string>(
    window.innerWidth < 768 ? '3M' : 'All'
  )

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

  const totalPoints = history.index.length
  const days = ranges[range]
  const minX = days ? totalPoints - days : undefined
  const maxX = totalPoints

  return (
    <>
      <div className={styles.chartContainer}>
        <div className={styles.buttons}>
          {Object.keys(ranges).map((key) => (
            <button
              key={key}
              onClick={() => setRanges(key)}
              className={range === key ? styles.active : ''}
            >
              {key}
            </button>
          ))}
        </div>
        <div className={styles.chart}>
          <Line
            data={{ labels, datasets }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
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
                y: {
                  title: { display: true, text: 'Momentum (%)' }
                },
                x: {
                  title: { display: true, text: 'Data' },
                  min: minX,
                  max: maxX
                }
              }
            }}
          />
        </div>
      </div>
    </>
  )
}
