import Stats from './components/Stats'
import Timeline from './components/Timeline'
import TransactionsList from './components/TransactionsList'
import styles from './Portfolio.module.css'

export default function Portfolio() {
  return (
    <>
      <h1 className={styles.title}>PORTFOLIO</h1>
      <Stats />
      <Timeline />
      <TransactionsList />
    </>
  )
}
