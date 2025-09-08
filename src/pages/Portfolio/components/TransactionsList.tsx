import { useEffect, useState } from 'react'
import { type Transaction, TransactionsService } from '../../../api'
import styles from './TransactionsList.module.css'

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    TransactionsService.getAll()
      .then((res) => setTransactions(res))
      .catch((err) => console.error('API error:', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading)
    return (
      <section className={styles.container}>
        <p>Loading...</p>
      </section>
    )

  return (
    <>
      <section className={styles.container}>
        <h3>Lista transakcji</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Typ</th>
              <th>Wolumen</th>
              <th>Cena otwarcia</th>
              <th>Aktualna cena</th>
              <th>Zysk/Strata</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.symbol}</td>
                <td>{tx.type}</td>
                <td>{tx.volume}</td>
                <td>{tx.openPrice}</td>
                <td>{tx.marketPrice}</td>
                <td style={{ color: (tx.grossPL ?? 0) >= 0 ? 'green' : 'red' }}>
                  {tx.grossPL}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}
