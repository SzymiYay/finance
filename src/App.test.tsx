import App from './App'
import { render, screen } from '@testing-library/react'

describe('App component', () => {
  test('renders heading', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: /ETF Momentum/i })
    ).toBeInTheDocument()
  })

  test('App matches snapshot', () => {
    const { asFragment } = render(<App />)
    expect(asFragment()).toMatchSnapshot()
  })
})
