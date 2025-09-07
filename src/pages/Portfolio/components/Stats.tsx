import styles from './Stats.module.css'
import { useEffect, useState } from 'react'
import { StatisticsService, type Statistics } from '../../../api'

export default function Stats() {
  const [stats, setStats] = useState<Statistics[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    StatisticsService.getStats()
      .then((res) => setStats(res))
      .catch((err) => console.error('API error:', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <>
      <section className={styles.container}>
        <h3>Statystyki portfela</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Symobl</th>
              <th>Wolumen</th>
              <th>Koszt</th>
              <th>Wartość</th>
              <th>Średnia cena</th>
              <th>Zysk/Strata</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((s) => (
              <tr key={s.symbol}>
                <td>{s.symbol}</td>
                <td>{s.totalVolume}</td>
                <td>{s.totalCost}</td>
                <td>{s.currentValue}</td>
                <td>{s.avgPrice}</td>
                <td style={{ color: s.grossPL >= 0 ? 'green' : 'red' }}>
                  {s.grossPL}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}
