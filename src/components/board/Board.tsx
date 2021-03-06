import { useState, useEffect } from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
import Firebase from '../../firebase/Firebase';
import { Post } from '../postCreator/PostCreator';

type Props = {
  loggedIn: boolean
}

export default function Board({loggedIn}: Props) {
  const [posts, setPosts] = useState<Post[]>();
  const [images, setImages] = useState<{ postID: undefined | string, url: string }[]>()
  const [renderPosts, setRenderPosts] = useState<boolean>(false)

  useEffect(() => {
    async function fetchPostsFromDB() {
      const postsFromDB = await Firebase.getPosts() as Array<Post>;
      setPosts(postsFromDB);
      let newImages: { postID: undefined | string, url: string }[] = [];
      async function getImageData () {
        await Promise.all(postsFromDB.map(async (post) => {
          const imageURL = await Firebase.getImage(post);
          newImages.push({
            postID: post.id,
            url: imageURL
          })
        }));
      }
      getImageData().then(() => {
        setImages(newImages)
      });
    }
    fetchPostsFromDB();
  }, [])

  useEffect(() => {
    setRenderPosts(true);
  }, [images])
  
  return (
    <div className={styles.board}>
      <div className={styles.main}>
        <div className={styles.createPost}>
          <div className={styles.profilePic}></div>
          {loggedIn ? <Link to="/post" className={styles.createPostButton}>Create post</Link> : <Link to="/login" className={styles.createPostButton}>Create post</Link>}
        </div>
          <div className={styles.filters}></div>
          <div className={styles.posts}>
            {renderPosts ? posts?.map((post) => {
              if (images !== undefined) {
                let image = images.find(image => image.postID === post.id)
                if(image !== undefined)
                  return (
                    <div className={styles.post}>
                      <div className={styles.postLikes}>{post.likes}</div>
                      <div className={styles.postContent}>
                      <Link to={`/posts/${post.id}`} className={styles.link}>
                        <div className={styles.postCommunity}>b/{post.community}</div>
                        <div className={styles.postTitle}>{post.title}</div>
                        {image.url !== "noImage" ? <img className={styles.postImage} src={image.url}></img> : null}
                      </Link>
                      </div>
                    </div>)
              }
              else {
                return <div className={styles.loading}>Loading...</div>
              }
            })
              :
              null
            }
          </div>
      </div>
      <div className={styles.addons}></div>
    </div>
  )
}
