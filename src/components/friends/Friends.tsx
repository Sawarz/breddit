import { useState, useEffect } from 'react'
import FirebaseCore from '../../firebase/FirebaseCore'
import Firebase from '../../firebase/Firebase'
import styles from './friends.module.css'
import { onAuthStateChanged } from 'firebase/auth';
import { Friend } from '../../types/Friend';
import { User } from '../../types/User';

export default function Friends() {
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [friendsOpen, setFriendsOpen] = useState<boolean>(false)
  const [friends, setFriends] = useState<Friend[]>([]);
  const [currentChatter, setCurrentChatter] = useState<Friend>();

  useEffect(() => {
    onAuthStateChanged(FirebaseCore.auth, async (user) => {
      if (user) {
        const friendsFromDB = await Firebase.friends.getAll(user.uid) as Friend[];
        friendsFromDB.forEach(async (friend) => {
          const userData = await Firebase.user.get(friend.id) as User;
          friend.username = userData.username;
          setFriends(friendsFromDB);
        })
        setFriendsOpen(true);
      }
    })
  }, [])

  return (
    <div className={styles.main}>
      {chatOpen ?
        <div className={styles.chat}>
          <button className={styles.closeButton} onClick={() => {
            setChatOpen(false);
          }}>X</button>
          <div className={styles.friendName}>{currentChatter?.username}</div>
          <div className={styles.divider} />
        </div>
        : null}
      {friendsOpen ? <div className={styles.friends}>
        <button className={styles.closeButton} onClick={() => {
          setFriendsOpen(false);
          }}>X</button>
        <div className={styles.title}>Friends</div>
        <div className={styles.divider} />
        {friends.map((friend) => {
          return <button className={styles.friendButton} onClick={() => {
            setChatOpen(true);
            setCurrentChatter(friend);
          }}>{friend.username}</button>
        })}
      </div>
        : <button className={styles.openFriendsButton} onClick={() => {
            setFriendsOpen(true);
          }}>Friends</button>}
    </div>
  )
}
