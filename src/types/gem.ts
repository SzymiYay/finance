export type ResultRow = {
  ETF: string
  '12M Momentum (%)': number
}

export type ResultsData = {
  start_date: string
  end_date: string
  results: ResultRow[]
}

export type HistoryData = {
  index: string[]
  columns: string[]
  data: number[][]
}
