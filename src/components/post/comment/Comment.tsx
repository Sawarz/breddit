import { useState, useEffect } from 'react'
import Firebase from '../../../firebase/Firebase'
import { Comment as CommentType } from '../../postCreator/PostCreator'
import { User } from '../../../types/User'
import styles from './comment.module.css'

type Props = {
    comment: CommentType
}

export default function Comment({comment}: Props) {
    const [user, setUser] = useState<User>()

    async function getUsername(){
        let fetchedUser: User;
        if(comment.user !== undefined){
            fetchedUser = await Firebase.getUser(comment.user) as User;
            setUser(fetchedUser);
        }   
    }

    useEffect(() => {
        getUsername()
    }, [])
    
  return (
    <div className={styles.comment}>
        <div className={styles.username}>{user?.username} said on 17.07.2022:</div>
        <div className={styles.text}>{comment.text}</div>
    </div>
  )
}
