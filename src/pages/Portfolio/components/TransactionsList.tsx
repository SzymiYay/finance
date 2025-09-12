import { useEffect, useState } from 'react'
import { TransactionSortableFields, type Transaction } from '../../../api'
import { TransactionsClient } from '../../../clients/transactions.client'
import { DataTable, type Column } from '../../../components/DataTable/DataTable'

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)
  const [sortBy, setSortBy] = useState<TransactionSortableFields>(
    TransactionSortableFields.OPEN_TIME
  )
  const [order, setOrder] = useState<'ASC' | 'DESC'>('DESC')

  useEffect(() => {
    setLoading(true)

    TransactionsClient.getAll({
      sortBy,
      order,
      limit,
      offset: (page - 1) * limit
    })
      .then((res) => {
        return new Promise<typeof res>((resolve) =>
          setTimeout(() => resolve(res), 0)
        )
      })
      .then((res) => {
        setTransactions(res.data)
        setTotal(res.total)
      })
      .catch((err) => console.error('API error:', err))
      .finally(() => setLoading(false))
  }, [page, limit, sortBy, order])

  const totalPages = Math.ceil(total / limit)

  const columns: Column<Transaction>[] = [
    {
      header: 'Symbol',
      accessor: 'symbol',
      sortable: true,
      field: 'symbol'
    },
    { header: 'Typ', accessor: 'type' },
    { header: 'Wolumen', accessor: 'volume', sortable: true, field: 'volume' },
    {
      header: 'Cena otwarcia',
      accessor: 'openPrice',
      sortable: true,
      field: 'openPrice'
    },
    {
      header: 'Aktualna cena',
      accessor: 'marketPrice',
      sortable: true,
      field: 'marketPrice'
    },
    {
      header: 'Zysk/Strata',
      accessor: (row) => (
        <span style={{ color: (row.grossPL ?? 0) >= 0 ? 'green' : 'red' }}>
          {row.grossPL}
        </span>
      ),
      sortable: true,
      field: 'grossPL'
    },
    {
      header: 'Waluta',
      accessor: 'currency',
      sortable: true,
      field: 'currency'
    }
  ]

  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setOrder(order === 'ASC' ? 'DESC' : 'ASC')
    } else {
      setSortBy(field as TransactionSortableFields)
      setOrder('ASC')
    }
  }

  const handleLimitChange = (newLimit: number) => {
    const firstVisibleItemIndex = (page - 1) * limit + 1
    const newPage = Math.ceil(firstVisibleItemIndex / newLimit)

    setLimit(newLimit)
    setPage(newPage)
  }

  return (
    <>
      <DataTable<Transaction>
        title="Lista transakcji"
        data={transactions}
        columns={columns}
        page={page}
        total={total}
        limit={limit}
        totalPages={totalPages}
        sortBy={sortBy}
        order={order}
        loading={loading}
        onPageChange={setPage}
        onLimitChange={handleLimitChange}
        onSortChange={handleSortChange}
      />
    </>
  )
}
