import { TransactionSortableFields, TransactionsService } from '../api'

export const TransactionsClient = {
  getAll(query: {
    sortBy?: TransactionSortableFields
    order?: 'ASC' | 'DESC'
    limit?: number
    offset?: number
  }) {
    return TransactionsService.getAll(
      query.sortBy,
      query.order,
      query.limit,
      query.offset
    )
  }
}
