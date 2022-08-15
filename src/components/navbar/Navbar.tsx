import { useState, useEffect } from 'react'
import styles from './styles.module.css'
import Logo from '../multiple-use/logo/Logo'
import { Link, useNavigate } from 'react-router-dom'
import Firebase from '../../firebase/Firebase'
import FirebaseCore from '../../firebase/FirebaseCore'
import { onAuthStateChanged } from 'firebase/auth'
import { User } from '../../types/User'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

type Props = {
  loggedIn: boolean,
  userID: string | undefined
}

export default function Navbar({loggedIn, userID}: Props) {
  const [user, setUser] = useState<User | undefined>()
  let navigate = useNavigate();
  
  useEffect(() => {
    async function fetchUsername(){
      if(userID !== undefined){
        let fetchedUser = await Firebase.getUser(userID) as User;
        setUser(fetchedUser);
      }
    }
    fetchUsername();

    onAuthStateChanged(FirebaseCore.auth, (user) => {
      if(!user)
        setUser(undefined);
    });
  }, [userID])
  

  return (
      <div className={styles.navbar}>
      <Logo />
      {loggedIn ?
        <>
      <div className={styles.username}>{user?.username}</div>
      <Link to="/profile"><FontAwesomeIcon icon={faCircleUser} size={"lg"} className={styles.profileLink}></FontAwesomeIcon></Link>
      <button onClick={()=>{
            FirebaseCore.auth.signOut();
            window.location.reload();
      }} className={styles.loginLink}>Log out!</button></> :
        <Link to="/login" className={styles.loginLink}>Log in!</Link>}
    </div>
  )
}
