export interface ResultRow {
  ETF: string
  '12M Momentum (%)': number
}

export interface HistoryData {
  index: string[]
  columns: string[]
  data: number[][]
}
