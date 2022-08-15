import React from 'react'
import { Navigate, useNavigate, Outlet } from 'react-router-dom'
import styles from './profile.module.css'

export default function Profile() {
    const navigate = useNavigate();

  return (
      <div className={styles.profile}>
          <div className={styles.options}>
              <button className={styles.option} onClick={() => {navigate("friends")}}>Friends</button>
              <button className={styles.option} onClick={() => {navigate("communities")}}>Communities</button>
              <button className={styles.option} onClick={() => {navigate("change-profile-data")}}>Change profile data</button>
          </div>
          <hr className={styles.divider}/>
          <div className={styles.main}><Outlet/></div>
    </div>
  )
}
