import { useEffect, useState } from 'react'
import type { Transaction } from '../../api'
import { TransactionsClient } from '../../clients/transactions.client'
import { DataTable } from './DataTable'

export default function TransactionsSubTable({ symbol }: { symbol: string }) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    TransactionsClient.getAll({ symbol })
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error('API error:', err))
      .finally(() => setLoading(false))
  }, [symbol])

  return (
    <DataTable<Transaction>
      title={`Transakcje ${symbol}`}
      data={transactions}
      columns={[
        {
          header: 'Date',
          accessor: (t) => new Date(t.openTime).toLocaleDateString()
        },
        {
          header: 'Symbol',
          accessor: 'symbol'
        },
        { header: 'Typ', accessor: 'type' },
        {
          header: 'Wolumen',
          accessor: 'volume'
        },
        {
          header: 'Cena otwarcia',
          accessor: 'openPrice'
        },
        {
          header: 'Aktualna cena',
          accessor: 'marketPrice'
        },
        {
          header: 'Zysk/Strata',
          accessor: (row) => (
            <span style={{ color: (row.grossPL ?? 0) >= 0 ? 'green' : 'red' }}>
              {row.grossPL}
            </span>
          )
        },
        {
          header: 'Waluta',
          accessor: 'currency'
        }
      ]}
      page={1}
      total={transactions.length}
      limit={transactions.length}
      totalPages={1}
      onPageChange={() => {}}
      onLimitChange={() => {}}
      onSortChange={() => {}}
      loading={loading}
    />
  )
}
