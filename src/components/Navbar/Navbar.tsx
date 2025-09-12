import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false)
  const [show, setShow] = useState(false)

  const handleOpen = () => {
    setIsMounted(true)
  }

  const handleClose = () => {
    setShow(false)
    setTimeout(() => {
      setIsMounted(false)
    }, 300)
  }

  useEffect(() => {
    if (isMounted) {
      setTimeout(() => {
        setShow(true)
      }, 10)
    }
  }, [isMounted])

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <h2 className={styles.title}>Finance</h2>

          <div className={styles.right}>
            <div className={styles.links}>
              <NavLink to="/" className={styles.link}>
                Home
              </NavLink>
              <NavLink to="/gem" className={styles.link}>
                GEM
              </NavLink>
              <NavLink to="/portfolio" className={styles.link}>
                Portfolio
              </NavLink>
            </div>

            <div className={styles.actions}>
              {/* <button className={styles.button}>LOGIN</button> */}
              <button className={styles.hamburger} onClick={handleOpen}>
                ☰
              </button>
            </div>
          </div>
        </nav>
      </header>

      {isMounted && (
        <div
          className={`${styles.overlay} ${show ? styles.show : ''}`}
          onClick={handleClose}
        >
          <div
            className={`${styles.drawer} ${show ? styles.open : styles.close}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.btnClose} onClick={handleClose}>
              X
            </button>

            <nav className={styles.drawerLinks}>
              <NavLink
                to="/"
                className={styles.drawerLink}
                onClick={handleClose}
              >
                <span>Home</span>
                <span className={styles.arrow}>→</span>
              </NavLink>
              <NavLink
                to="/gem"
                className={styles.drawerLink}
                onClick={handleClose}
              >
                <span>GEM</span>
                <span className={styles.arrow}>→</span>
              </NavLink>
              <NavLink
                to="/portfolio"
                className={styles.drawerLink}
                onClick={handleClose}
              >
                <span>Portfolio</span>
                <span className={styles.arrow}>→</span>
              </NavLink>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
