import styles from './Copyrights.module.css'

export default function Copyrights() {
  const year = new Date().getFullYear()

  return (
    <>
      <footer className={styles.footer}>
        <p>© {year} Szymon Frączek</p>
        <p>
          Dane rynkowe dostarczane przez{' '}
          <a
            href="https://finance.yahoo.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yahoo Finance
          </a>
          .
        </p>
      </footer>
    </>
  )
}
