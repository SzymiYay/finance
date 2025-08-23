import './App.css'
import MomentumChart from './components/MomentumChart'
import ResultsTable from './components/ResultsTable'

function App() {
  return (
    <>
      <>
        <h1>ETF Momentum (%)</h1>
        <ResultsTable />
        <MomentumChart />
      </>
    </>
  )
}

export default App
