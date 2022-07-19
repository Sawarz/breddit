import React from 'react'
import styles from './styles.module.css'

export default function PostCreator() {
  return (
    <div className={styles.postCreator}>
      <div className={styles.title}>Create a post!</div>
      <div className={styles.chooseCommunity}>Choose a community</div>
      <div className={styles.postElements}>
        <div className={styles.postElement}>Text</div>
        <div className={styles.postElement}>Image</div>
        <div className={styles.postElement}>Link</div>
        <div className={styles.postElement}>Poll</div>
      </div>
    </div>
  )
}
