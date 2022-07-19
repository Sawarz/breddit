import React from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
import logoImg from '../../../assets/logo/breadlogo.png'

export default function Logo() {
  return (
    <Link className={styles.logoLink} to="/">
      <img className={styles.img}  alt="logo" src={logoImg} height="80px"></img>
    </Link>
  )
}