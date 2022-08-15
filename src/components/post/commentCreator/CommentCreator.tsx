import { useState } from 'react';
import FirebaseCore from '../../../firebase/FirebaseCore';
import Firebase from '../../../firebase/Firebase';
import styles from './commentCreator.module.css';
import { Comment, Post } from '../../postCreator/PostCreator';
import { uuidv4 } from '@firebase/util';

export type Props = {
    post: Post,
    setCommentCreation: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CommentCreator({post, setCommentCreation}: Props) {
    const [comment, setComment] = useState<Comment>({
        user: FirebaseCore.auth.currentUser?.uid,
        text: undefined,
        likes: 0,
        uid: uuidv4()
    })
  return (
    <div className={styles.commentCreator}>
        <input type="text" onChange={(e)=>{
            setComment({...comment, text: e.target.value})
        }}></input>
        <button className={styles.closeButton} onClick={()=>{
            setCommentCreation(false);
        }}>X</button>
        <button className={styles.submitButton} onClick={()=>{
            Firebase.comment.add(post, comment)
            setCommentCreation(false);
        }}>Submit</button>
    </div>
  )
}
