import { useState } from 'react'
import styles from './Dropdown.module.css'

type Props = {
  title: string
  children: React.ReactNode
}

export default function Dropdown({ title, children }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className={styles.dropdown}>
        <button
          className={styles.button}
          onClick={() => setOpen((prev) => !prev)}
        >
          {title} {open ? '▲' : '▼'}
        </button>
        {open && <div className={styles.content}>{children}</div>}
      </div>
    </>
  )
}
