import React from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'

export default function Board() {
  return (
    <div className={styles.board}>
      <div className={styles.main}>
        <div className={styles.createPost}>
          <div className={styles.profilePic}></div>
          <Link to="/post" className={styles.createPostButton}>Create post</Link>
        </div>
      </div>
      <div className={styles.addons}></div>
    </div>
  )
}
