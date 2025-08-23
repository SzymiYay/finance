import { render, screen } from '@testing-library/react'
import ResultsTable from './ResultsTable'

describe('ResultsTable', () => {
  test('renders table headers', () => {
    render(<ResultsTable />)
    expect(screen.getByText(/ETF/i)).toBeInTheDocument()
    expect(screen.getByText(/12M Momentum/i)).toBeInTheDocument()
  })
})
