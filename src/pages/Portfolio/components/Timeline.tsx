import { useEffect, useState } from 'react'
import { StatisticsService, type TimelinePoint } from '../../../api'
import { Line } from 'react-chartjs-2'
import styles from './Timeline.module.css'

export default function Timeline() {
  const [timeline, setTimeline] = useState<TimelinePoint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    StatisticsService.getTimeline()
      .then((res) => setTimeline(res))
      .catch((err) => console.error('Api error:', err))
      .finally(() => setLoading(false))
  }, [])

  const data = {
    labels: timeline.map((p) => p.date),
    datasets: [
      {
        label: 'Wartość portfela',
        data: timeline.map((p) => p.value),
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        fill: true,
        tension: 0.2
      }
    ]
  }

  if (loading) return <p>Loading...</p>

  return (
    <>
      <div className={styles.chartContainer}>
        <Line data={data} />
      </div>
    </>
  )
}
