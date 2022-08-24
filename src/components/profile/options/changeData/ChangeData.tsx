import { useRef, useState, useEffect } from 'react'
import FirebaseCore from '../../../../firebase/FirebaseCore'
import Firebase from '../../../../firebase/Firebase'
import styles from './changedata.module.css'
import { updatePassword } from 'firebase/auth'

type InfoMessage = {
  type: "error" | "confirm",
  value: string
}

export default function ChangeData() {
  const [userID, setUserID] = useState<string | undefined>(FirebaseCore.auth.currentUser?.uid);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [confirmMessage, setConfirmMessage] = useState<string>("");
  const [infoMessages, setInfoMessages] = useState<InfoMessage[]>()
  async function changeNickname() {
    
  }

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUserID(FirebaseCore.auth.currentUser?.uid)
  });
  
  return (
    <div className={styles.tab}>
      <div className={styles.interface}>
        <div>Username</div>
        <div className={styles.subInterface}>
          <input ref={usernameRef}></input>
          <button className={styles.confirmButton} onClick={() => {
            if (usernameRef.current?.value && userID) {
              let inputValue = usernameRef.current?.value;
              if (inputValue.length > 3)
                Firebase.user.update(userID, "username", usernameRef.current?.value)
              else
                setErrorMessage("Username should be at least 3 characters long!")
            }
              
          }}>Confirm</button>
        </div>
      </div>
      <div className={styles.interface}>
      <div>Password</div>
        <div className={styles.subInterface}>
          <input ref={passwordRef}></input>
          <button className={styles.confirmButton} onClick={() => {
            if(passwordRef.current?.value && FirebaseCore.auth.currentUser)
              updatePassword(FirebaseCore.auth.currentUser, passwordRef.current.value).then(() => {
                setConfirmMessage("Password successfully changed!")
              }).catch((error) => {
                console.log(error)
                if(error.code === "auth/weak-password")
                  setErrorMessage("Password should be at least 6 characters");
              });
          }}>Confirm</button>
        </div>
      </div>
      <div className={styles.errorMessage}>{errorMessage}</div>
      <div className={styles.confirmMessage}>{confirmMessage}</div>
    </div>
  )
}
