import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import styles from './profile.module.css'

export default function Profile() {
  return (
      <div className={styles.profile}>
          <div className={styles.options}>
              <Link className={styles.option} to="friends">Friends</Link>
              <Link className={styles.option} to="communities">Communities</Link>
              <Link className={styles.option} to="change-profile-data">Change profile data</Link>
          </div>
          <hr className={styles.divider}/>
          <div className={styles.main}><Outlet/></div>
    </div>
  )
}
