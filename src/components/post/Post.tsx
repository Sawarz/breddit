import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './post.module.css'
import Firebase from '../../firebase/Firebase'
import { Post as PostType } from '../postCreator/PostCreator'

export default function Post() {
    const [post, setPost] = useState<PostType>(
        {
            id: undefined,
            title: undefined,
            text: undefined,
            community: undefined,
            user: undefined
        }
    );
    const [imageURL, setImageURL] = useState<string>();
    const [renderPost, setRenderPost] = useState<boolean>(false);
    const [username, setUsername] = useState<string>()

    const params = useParams();
    
    async function getPostData() {
        if (params.postID != undefined) {
            let postFromDB = await Firebase.getPost(params.postID) as PostType;
            setPost(postFromDB);
        } 
    }

    async function getImageData() {
        let imageURL = await Firebase.getImage(post);
        setImageURL(imageURL);
    }

    async function getUsername(){
        let fetchedUser: string;
        if(post.user !== undefined){
            fetchedUser = await Firebase.getUsername(post.user);
            setUsername(fetchedUser);
        }   
    }

    useEffect(() => {
        getPostData();
    }, [])

    useEffect(() => {
        if (post.id !== undefined) {
            getImageData();
            getUsername();
        }
    }, [post])
    
    useEffect(() => {
        setRenderPost(true);
      }, [imageURL])
    
  return (
      <div className={styles.post}>
          <div className={styles.postInfo}>
            <div>b/{post.community}</div>
            <div>{username}</div>
          </div>
          <div className={styles.title}>{post.title}</div>
          <div className={styles.text}>{post.text}</div>
          <>{renderPost ? (() => {
            if(imageURL != "noImage")
                return (<img src={imageURL} className={styles.image}></img>)
              else {
                return null
              }
              })()
              :
              null
          }
          </>
    </div>
  )
}
