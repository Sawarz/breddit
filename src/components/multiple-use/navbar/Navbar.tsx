import React from 'react'
import styles from './styles.module.css'
import Logo from '../logo/Logo'

export default function Navbar() {
  return (
      <div className={styles.navbar}>
          <Logo />
    </div>
  )
}
