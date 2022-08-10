import React from 'react'
import styles from './community.module.css'
import { useParams } from 'react-router-dom'

export default function Community() {
  const communityName = useParams().community;

  return (
      <div className={styles.community}>
          <img className={styles.backgroundPhoto}></img>
          <div></div>
    </div>
  )
}
