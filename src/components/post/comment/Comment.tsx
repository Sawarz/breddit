import { useState, useEffect } from 'react'
import Firebase from '../../../firebase/Firebase'
import { Comment as CommentType} from '../../postCreator/PostCreator'
import styles from './comment.module.css'

type Props = {
    comment: CommentType
}

export default function Comment({comment}: Props) {
    const [username, setUsername] = useState<string>()

    async function getUsername(){
        let fetchedUser: string;
        if(comment.user !== undefined){
            fetchedUser = await Firebase.getUsername(comment.user);
            setUsername(fetchedUser);
        }   
    }

    useEffect(() => {
        getUsername()
    }, [])
    
  return (
    <div className={styles.comment}>
        <div className={styles.username}>{username} said on 17.07.2022:</div>
        <div className={styles.text}>{comment.text}</div>
    </div>
  )
}
