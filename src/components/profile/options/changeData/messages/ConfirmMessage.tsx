import React from 'react'
import styles from './confirmmessage.module.css'

type Props = {
    message: string | undefined,
}

export default function ConfirmMessage({message}: Props) {
  return (
    <div className={styles.main}>{message}</div>
  )
}
