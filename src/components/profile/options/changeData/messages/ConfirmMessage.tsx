import React from 'react'
import styles from './confirmmessage.module.css'

type Props = {
    message: string | undefined,
    setConfirmMessage: React.Dispatch<React.SetStateAction<string | undefined>>
}

export default function ConfirmMessage({message, setConfirmMessage}: Props) {
  return (
    <div className={styles.main}>{message}</div>
  )
}
