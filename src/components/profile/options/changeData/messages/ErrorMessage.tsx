import React from 'react'
import styles from './errormessage.module.css'

type Props = {
    message: string | undefined,
}

export default function ErrorMessage({ message }: Props) {
  return (
    <div className={styles.main}>{message}</div>
  )
}
