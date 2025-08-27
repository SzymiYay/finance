import './App.css'
import Copyrights from './components/Copyrights'
import Description from './components/Description'
import MomentumChart from './components/MomentumChart'
import ResultsTable from './components/ResultsTable'

function App() {
  return (
    <>
      <>
        <Description />
        <ResultsTable />
        <MomentumChart />
        <Copyrights />
      </>
    </>
  )
}

export default App
