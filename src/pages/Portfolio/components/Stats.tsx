import { useEffect, useState } from 'react'
import { StatisticsService, type Statistics } from '../../../api'
import { DataTable, type Column } from '../../../components/DataTable/DataTable'

export default function Stats() {
  const [stats, setStats] = useState<Statistics[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)
  const [sortBy, setSortBy] = useState<string>('symbol') //FIXME: naprawic po zmianie backendu
  const [order, setOrder] = useState<'ASC' | 'DESC'>('DESC')

  useEffect(() => {
    setLoading(true)

    StatisticsService.getStats()
      .then((res) => {
        setStats(res)
        setTotal(6) //FIXME: naprawic po zmianie backendu
      })
      .catch((err) => console.error('API error:', err))
      .finally(() => setLoading(false))
  }, [])

  const totalPages = Math.ceil(total / limit)

  const columns: Column<Statistics>[] = [
    {
      header: 'Symbol',
      accessor: 'symbol',
      sortable: true,
      field: 'symbol'
    },
    {
      header: 'Wolumen',
      accessor: 'totalVolume',
      sortable: true,
      field: 'totalVolume'
    },
    {
      header: 'Koszt',
      accessor: 'totalCost',
      sortable: true,
      field: 'totalCost'
    },
    {
      header: 'Wartość',
      accessor: 'currentValue',
      sortable: true,
      field: 'currentValue'
    },
    {
      header: 'Średnia cena',
      accessor: 'avgPrice',
      sortable: true,
      field: 'avgPrice'
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
      setSortBy(field)
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
      <DataTable
        title="Statystyki portfela"
        data={stats.map((s) => ({ id: s.symbol, ...s }))}
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
