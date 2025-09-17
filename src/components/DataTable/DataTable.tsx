import type React from 'react'
import styles from './DataTable.module.css'
import { useEffect, useState } from 'react'

export type SortOrder = 'ASC' | 'DESC'

export interface Column<T> {
  header: string
  accessor: keyof T | ((row: T) => React.ReactNode)
  sortable?: boolean
  field?: string
  align?: 'left' | 'center' | 'right'
}

export interface DataTabelProps<T> {
  title: string
  data: T[]
  columns: Column<T>[]
  page: number
  total: number
  limit: number
  totalPages: number
  sortBy?: string
  order?: SortOrder
  loading?: boolean
  description?: string

  onPageChange: (page: number) => void
  onLimitChange: (limit: number) => void
  onSortChange: (sortBy: string) => void
}

export function DataTable<T extends { id: string | number }>({
  title,
  data,
  columns,
  page,
  total,
  limit,
  totalPages,
  sortBy,
  order,
  loading,
  description,
  onPageChange,
  onLimitChange,
  onSortChange
}: DataTabelProps<T>) {
  const [showSkeleton, setShowSkeleton] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    if (loading) {
      timer = setTimeout(() => setShowSkeleton(true), 200)
    } else {
      setShowSkeleton(false)
    }

    return () => clearTimeout(timer)
  }, [loading])

  const handleSort = (field?: string) => {
    if (!field || !onSortChange) return
    onSortChange(field)
  }

  return (
    <>
      <section className={styles.container}>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    style={{ textAlign: col.align ?? 'center' }}
                    className={col.sortable ? styles.sortable : ''}
                    onClick={() =>
                      col.sortable && handleSort(col.field as string)
                    }
                  >
                    {col.header}
                    {col.sortable && sortBy === col.field && (
                      <span className={styles.sortIndicator}>
                        {order === 'ASC' ? '▲' : '▼'}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {showSkeleton ? (
                Array.from({ length: limit }).map((_, i) => (
                  <tr key={`skeleton-${i}`}>
                    {columns.map((_, j) => (
                      <td key={j}>
                        <div className={styles.skeleton}></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                    No data
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr key={row.id}>
                    {columns.map((col, idx) => {
                      const value =
                        typeof col.accessor === 'function'
                          ? col.accessor(row)
                          : (row[col.accessor] as React.ReactNode)
                      return (
                        <td
                          key={idx}
                          style={{ textAlign: col.align ?? 'center' }}
                        >
                          {value}
                        </td>
                      )
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* {loading && (
            <div className={styles.overlay}>
              <div className={styles.spinner}></div>
              <span>Ładowanie...</span>
            </div>
          )} */}
        </div>

        <div className={styles.pagination}>
          <div className={styles.paginationCenter}>
            <button
              disabled={page === 1}
              onClick={() => onPageChange(page - 1)}
            >
              Poprzednia
            </button>
            <span>
              Strona {page} z {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
            >
              Następna
            </button>
          </div>

          <div className={styles.paginationRight}>
            <label>
              Ilość na stronę
              <select
                value={limit}
                onChange={(e) => onLimitChange(Number(e.target.value))}
              >
                {[5, 10, 25, 50, total].map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {opt === total && ![5, 10, 25, 50].includes(opt)
                      ? 'Wszystkie'
                      : opt}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>
    </>
  )
}
