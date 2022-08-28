import { useRef, useState, useEffect } from 'react'
import FirebaseCore from '../../../../firebase/FirebaseCore'
import Firebase from '../../../../firebase/Firebase'
import styles from './changedata.module.css'
import { updatePassword } from 'firebase/auth'
import ErrorMessage from './messages/ErrorMessage'
import ConfirmMessage from './messages/ConfirmMessage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faE, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export default function ChangeData() {
  const [userID, setUserID] = useState<string | undefined>(FirebaseCore.auth.currentUser?.uid);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [confirmMessage, setConfirmMessage] = useState<string | undefined>();
  async function changeNickname() {
    
  }

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUserID(FirebaseCore.auth.currentUser?.uid)
  });

  useEffect(() => {
    if(confirmMessage)
      setErrorMessage(undefined);
  }, [confirmMessage])

  useEffect(() => {
    if(errorMessage)
      setConfirmMessage(undefined);
  }, [errorMessage])
  
  
  return (
    <div className={styles.tab}>
      <div className={styles.interface}>
        <div>Username</div>
        <div className={styles.subInterface}>
          <input ref={usernameRef}></input>
          <button className={styles.confirmButton} onClick={() => {
            if (usernameRef.current?.value && userID) {
              let inputValue = usernameRef.current?.value;
              if (inputValue.length > 3){
                Firebase.user.update(userID, "username", usernameRef.current?.value);
                setConfirmMessage(`Username succesfully set to ${usernameRef.current.value}`);
              }
              else
                setErrorMessage("Username should be at least 3 characters long!")
            }
              
          }}>Confirm</button>
        </div>
      </div>
      <div className={styles.interface}>
      <div>Password</div>
        <div className={styles.subInterface}>
          <input ref={passwordRef} type="password"></input>
          <input ref={confirmPasswordRef} type="password"></input>
          <button className={styles.toggleVisibilityButton} onClick={() => {
            if (passwordRef.current?.type === "password") { 
              passwordRef.current.type = "text"
              confirmPasswordRef.current!.type = "text"
            }
            else {
              passwordRef.current!.type = "password"
              confirmPasswordRef.current!.type = "password"
            }
            
          }}><FontAwesomeIcon icon={faEyeSlash}/></button>
          <button className={styles.confirmButton} onClick={() => {
            if (passwordRef.current?.value === confirmPasswordRef.current?.value) {
              if(passwordRef.current?.value && FirebaseCore.auth.currentUser)
                updatePassword(FirebaseCore.auth.currentUser, passwordRef.current.value).then(() => {
                  setConfirmMessage("Password successfully changed!")
                }).catch((error) => {
                  if(error.code === "auth/weak-password")
                    setErrorMessage("Password should be at least 6 characters");
                });
            }
            else
            setErrorMessage("Passwords do not match!");
              
          }}>Confirm</button>
        </div>
      </div>
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      {confirmMessage ? <ConfirmMessage message={confirmMessage} /> : null}
    </div>
  )
}
