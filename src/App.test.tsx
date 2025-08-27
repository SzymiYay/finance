import App from './App'
import { render } from '@testing-library/react'

describe('App component', () => {
  test('App matches snapshot', () => {
    const { asFragment } = render(<App />)
    expect(asFragment()).toMatchSnapshot()
  })
})
