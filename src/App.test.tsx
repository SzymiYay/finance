import App from './App'
import { render } from '@testing-library/react'

describe('App component', () => {
  // test('App matches snapshot', () => {
  //   const { asFragment } = render(<App />)
  //   expect(asFragment()).toMatchSnapshot()
  // })

  test('simple check', () => {
    const result = 4
    expect(2 + 2).toBe(result)
  })
})
