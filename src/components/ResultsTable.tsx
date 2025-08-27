import { useEffect, useState } from 'react'
import type { ResultsData } from '../types/gem'
import styles from './ResultsTable.module.css'

export default function ResultsTable() {
  const [data, setData] = useState<ResultsData | null>(null)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}/data/results.json`)
      .then((res) => res.json())
      .then((data: ResultsData) => setData(data))
      .catch((err) => console.error('Data loading error:', err))
  }, [])

  if (!data) return <p>Loading...</p>

  return (
    <>
      <section className={styles.container}>
        <h3>
          Okno czasowe: {data.start_date} - {data.end_date}
        </h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ETF</th>
              <th>12M Momentum (%)</th>
            </tr>
          </thead>
          <tbody>
            {data.results.map((row, i) => (
              <tr key={i}>
                <td>{row.ETF}</td>
                <td>{row['12M Momentum (%)']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}
