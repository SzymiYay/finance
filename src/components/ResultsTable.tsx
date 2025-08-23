import { useEffect, useState } from 'react'
import type { ResultRow } from '../types/gem'

export default function ResultsTable() {
  const [rows, setRows] = useState<ResultRow[]>([])

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}/data/results.json`)
      .then((res) => res.json())
      .then((data: ResultRow[]) => setRows(data))
      .catch((err) => console.error('Data loading error:', err))
  }, [])

  return (
    <>
      <table id="results-table">
        <thead>
          <tr>
            <th>ETF</th>
            <th>12M Momentum (%)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td>{row.ETF}</td>
              <td>{row['12M Momentum (%)']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
