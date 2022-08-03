import { FormEvent, useState, useEffect } from 'react'
import styles from './login.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [password, setPassword] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState<string>();
  
  const auth = getAuth();
  const navigate = useNavigate();

  function signIn(){
    if(email !== undefined && password !== undefined){
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setErrorMessage("");
          navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        switch (errorCode) {
          case ("auth/invalid-email"): {
            setErrorMessage("Enter valid email");
            break;
          }
          case ("auth/weak-password"): {
            setErrorMessage("Password too weak (atleast 6 characters)");
            break;
          }
          default: {
            break;
          }
        }
      });
    }
  }

  useEffect(() => {
    if(email === "bhg67547@jeoce.com")
      signIn();
  }, [email, password])
  

  const handleSubmit = async (e: FormEvent) => {
    if(e !== undefined)
     e.preventDefault();
    signIn();
    }
    
    return (
    <div className={styles.loginPage}>
    <div className={styles.Login}>
      <div className={styles.header}>
        <h1>Log in here!</h1>
      </div>
        <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.formLabel}>
          <p>Email</p>
          <input type="email" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label className={styles.formLabel}>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div className={styles.submitDiv}>
          <button className={styles.submitButton} type="submit">Submit</button>
        </div>
      </form>
      <div className={styles.errorMessage}>{errorMessage}</div>
      <Link className={styles.authLink} to="/register">Create an account here!</Link>
    </div>
    <button className={styles.exampleAccount} onClick={() => {
        setEmail("bhg67547@jeoce.com");
        setPassword("examplepassword1");
      }}>Log in with example account</button>
    </div>
    )
}