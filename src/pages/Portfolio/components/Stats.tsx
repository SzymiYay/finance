import { useEffect, useState } from 'react'
import {
  StatisticsService,
  StatisticsSortableFields,
  type Statistics
} from '../../../api'
import { DataTable, type Column } from '../../../components/DataTable/DataTable'

export default function Stats() {
  const [stats, setStats] = useState<Statistics[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)
  const [sortBy, setSortBy] = useState<StatisticsSortableFields>(
    StatisticsSortableFields.SYMBOL
  )
  const [order, setOrder] = useState<'ASC' | 'DESC'>('DESC')

  useEffect(() => {
    setLoading(true)

    StatisticsService.getStats(sortBy, order, limit, (page - 1) * limit)
      .then((res) => {
        setStats(res.data)
        setTotal(res.total)
      })
      .catch((err) => console.error('API error:', err))
      .finally(() => setLoading(false))
  }, [page, limit, sortBy, order])

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
      setSortBy(field as StatisticsSortableFields)
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
