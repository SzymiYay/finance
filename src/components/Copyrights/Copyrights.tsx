import styles from './Copyrights.module.css'

export default function Copyrights() {
  const year = new Date().getFullYear()

  return (
    <>
      <footer className={styles.footer}>
        <p>© {year} Szymon Frączek</p>
      </footer>
    </>
  )
}
