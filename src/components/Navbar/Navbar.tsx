import { NavLink, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  const location = useLocation()

  const titles: Record<string, string> = {
    '/': 'Home',
    '/gem': 'GEM',
    '/portfolio': 'Portfolio'
  }

  const currentTitle = titles[location.pathname] || 'Finance'
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <h2 className={styles.title}>{currentTitle}</h2>
          <div className={styles.links}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/gem"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              GEM
            </NavLink>
            <NavLink
              to="/portfolio"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Portfolio
            </NavLink>
          </div>
          <button className={styles.button}>LOGIN</button>
        </nav>
      </header>
    </>
  )
}
