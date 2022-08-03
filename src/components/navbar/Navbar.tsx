import { useState, useEffect } from 'react'
import styles from './styles.module.css'
import Logo from '../multiple-use/logo/Logo'
import { Link, useNavigate } from 'react-router-dom'
import Firebase from '../../firebase/Firebase'
import { onAuthStateChanged } from 'firebase/auth'

type Props = {
  loggedIn: boolean,
  userID: string | undefined
}

export default function Navbar({loggedIn, userID}: Props) {
  const [username, setUsername] = useState<string | undefined>()
  let navigate = useNavigate();
  
  useEffect(() => {
    async function fetchUsername(){
      if(userID !== undefined){
        let fetchedUsername = await Firebase.getUsername(userID);
        setUsername(fetchedUsername);
      }
    }
    fetchUsername();

    onAuthStateChanged(Firebase.auth, (user) => {
      if(!user)
        setUsername("");
    });
  }, [userID])
  

  return (
      <div className={styles.navbar}>
          <Logo />
          <div className={styles.username}>{username}</div>
          {loggedIn ? <button onClick={()=>{
            Firebase.auth.signOut();
            navigate("/");
          }} className={styles.loginLink}>Log out!</button> : <Link to="/login" className={styles.loginLink}>Log in!</Link>}
    </div>
  )
}
