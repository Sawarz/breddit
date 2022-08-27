import React from 'react'
import styles from './errormessage.module.css'

type Props = {
    message: string | undefined,
    setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>
}

export default function ErrorMessage({ message, setErrorMessage }: Props) {
  return (
    <div className={styles.main}>{message}</div>
  )
}
