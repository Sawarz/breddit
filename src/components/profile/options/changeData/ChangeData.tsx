import { useRef, useState } from 'react'
import FirebaseCore from '../../../../firebase/FirebaseCore'
import Firebase from '../../../../firebase/Firebase'
import styles from './changedata.module.css'
import { updatePassword } from 'firebase/auth'

export default function ChangeData() {
  const [user, setUser] = useState(FirebaseCore.auth.currentUser?.uid);
  async function changeNickname() {
    
  }

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.option}>
      <div>Username</div>
      <input ref={usernameRef}></input>
      <button onClick={() => {
        if(user && usernameRef.current?.value)
          Firebase.user.update(user, "username", usernameRef.current?.value)
      }}>Confirm</button>
      <div>Password</div>
      <input ref={passwordRef}></input>
      <button onClick={() => {
        if(user && passwordRef.current?.value && FirebaseCore.auth.currentUser)
          updatePassword(FirebaseCore.auth.currentUser, passwordRef.current.value).then(() => {
            // Update successful.
          }).catch((error) => {
            // An error ocurred
            // ...
          });
      }}>Confirm</button>
    </div>
  )
}
