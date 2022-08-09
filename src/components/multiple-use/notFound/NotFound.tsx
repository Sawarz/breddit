import styles from './notfound.module.css'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className={styles.notFound}>
          <div className={styles.error}>Error 404. Page not found.</div>
          <Link to="/">Go to main page</Link>
    </div>
  )
}
