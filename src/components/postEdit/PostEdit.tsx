import { useState, useEffect } from 'react'
import styles from './postedit.module.css'
import { Post as PostType } from '../postCreator/PostCreator';
import { useNavigate, useParams } from 'react-router-dom';
import Firebase from '../../firebase/Firebase';

export default function PostEdit() {
    const [post, setPost] = useState<PostType>(
        {
            id: undefined,
            title: undefined,
            text: undefined,
            community: undefined,
            user: undefined,
            comments: undefined
        }
    );

    const params = useParams();
    const navigate = useNavigate();
    if(Firebase.auth.currentUser?.uid !== post.user)
        navigate("/");

    async function getPostData() {
        if (params.postID !== undefined) {
            let postFromDB = await Firebase.post.get(params.postID) as PostType;
            setPost(postFromDB);
        } 
    }

    useEffect(() => {
        getPostData();
    }, [])
    
  return (
    <div className={styles.postEdit}>
        <textarea>{post.text}</textarea>
        <button className={styles.deletePost} onClick={()=>{
            if(post.id !== undefined)
                Firebase.post.delete(post.id);
                window.location.reload();
        }}>Delete post</button>
        </div>
  )
}
