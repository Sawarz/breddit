import { FormEvent, useState } from 'react';
import styles from './register.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import FirebaseCore from '../../../firebase/FirebaseCore';


export default function Register() {
  const [password, setPassword] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [username, setUsername] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  
  const db = FirebaseCore.db;
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if(email !== undefined && password !== undefined)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if(auth.currentUser !== null)
            setDoc(doc(db, "users", `${auth.currentUser.uid}`),
            {
            username: username
            })
        setErrorMessage("");
        navigate("/login");
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
        case ("auth/email-already-in-use"): {
          setErrorMessage("Email already used by an account");
          break;
        }
        case ("auth/wrong-password"): {
          setErrorMessage("Wrong password");
          break;
        }
        default: {
          break;
        }
      }
    });
    }
    
  return <div className={styles.Register}>
    <div className={styles.header}>
      <h1>Register here!</h1>
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
      <label className={styles.formLabel}>
        <p>Username</p>
        <input type="text" onChange={e => setUsername(e.target.value)}/>
      </label>
      <div className={styles.submitDiv}>
        <button className={styles.submitButton} type="submit">Submit</button>
      </div>
    </form>
    <div className={styles.errorMessage}>{errorMessage}</div>
      <Link className={styles.authLink} to="/login">Log in here!</Link>
    </div>;
}