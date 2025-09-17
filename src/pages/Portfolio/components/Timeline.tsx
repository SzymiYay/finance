import { useEffect, useState } from 'react'
import { StatisticsService, type TimelinePoint } from '../../../api'
import { Line } from 'react-chartjs-2'
import styles from './Timeline.module.css'
import type { ChartOptions, ScriptableContext, TooltipItem } from 'chart.js'

export default function Timeline() {
  const [timeline, setTimeline] = useState<TimelinePoint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    StatisticsService.getTimeline()
      .then((res) => setTimeline(res))
      .catch((err) => console.error('Api error:', err))
      .finally(() => setLoading(false))
  }, [])

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (ctx: TooltipItem<'line'>) {
            return `Wartość: ${ctx.formattedValue} PLN`
          }
        }
      }
    },
    interaction: { intersect: false, mode: 'index' as const },
    scales: {
      y: {
        ticks: {
          callback: (val: string | number) => `${val} PLN`
        }
      }
    }
  }

  const data = {
    labels: timeline.map((p) => p.date),
    datasets: [
      {
        label: 'Wartość portfela',
        data: timeline.map((p) => p.value),
        borderColor: '#007bff',
        pointBackgroundColor: '#007bff',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#007bff',
        pointRadius: 3,
        pointHoverRadius: 6,
        tension: 0.25,
        fill: true,
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(
            0,
            0,
            0,
            context.chart.height
          )
          gradient.addColorStop(0, 'rgba(0, 123, 255, 0.3)')
          gradient.addColorStop(1, 'rgba(0, 123, 255, 0)')
          return gradient
        }
      }
    ]
  }

  if (loading)
    return (
      <div className={styles.chartContainer}>
        <p>Loading...</p>
      </div>
    )

  return (
    <>
      <div className={styles.chartContainer}>
        <Line data={data} options={options} />
      </div>
    </>
  )
}
