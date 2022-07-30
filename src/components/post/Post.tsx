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
            community: undefined
        }
    );
    const [imageURL, setImageURL] = useState<string>();
    const [renderPost, setRenderPost] = useState<boolean>(false);

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

    useEffect(() => {
        getPostData();
    }, [])

    useEffect(() => {
        if (post.id != undefined) {
            getImageData();
        }
        console.log(post);
    }, [post])
    
    useEffect(() => {
        setRenderPost(true);
      }, [imageURL])
    
  return (
      <div className={styles.post}>
          <div className={styles.title}>{post.title}</div>
          <div className={styles.text}>{post.text}</div>
          <>{renderPost ? (() => {
            if(imageURL != undefined)
                return (<img src={imageURL} className={styles.image}></img>)
              else {
                return <div>Loading...</div>
              }
              })()
              :
              null
          }
          </>
    </div>
  )
}
