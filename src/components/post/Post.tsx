import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './post.module.css'
import Firebase from '../../firebase/Firebase'
import FirebaseCore from '../../firebase/FirebaseCore'
import { Post as PostType, Comment as CommentType } from '../postCreator/PostCreator'
import CommentCreator from './commentCreator/CommentCreator'
import Comment from './comment/Comment'
import { User } from '../../types/User'
import happyToastImg from '../../assets/happytoast.png'
import sadToastImg from '../../assets/sadtoast.png'

export default function Post() {
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
    const [imageURL, setImageURL] = useState<string>();
    const [renderPost, setRenderPost] = useState<boolean>(false);
    const [author, setAuthor] = useState<User>();
    const [commentCreation, setCommentCreation] = useState<boolean>(false);
    const [comments, setComments] = useState<CommentType[] | undefined>();
    const [postLiked, setPostLiked] = useState<boolean | undefined>();

    const params = useParams();
    const navigate = useNavigate();
    
    async function getPostData() {
        if (params.postID !== undefined) {
            let postFromDB = await Firebase.post.get(params.postID) as PostType;
            setPost(postFromDB);
            if (postFromDB.likedBy?.some((likingID) => likingID === FirebaseCore.auth.currentUser?.uid))
                setPostLiked(true);
            else if (postFromDB.dislikedBy?.some((likingID) => likingID === FirebaseCore.auth.currentUser?.uid))
                setPostLiked(false);
        } 
    }

    async function getUsernamesData() {
        let imageURL = await Firebase.getImage(post);
        setImageURL(imageURL);
    }

    async function getUsername(){
        let fetchedUser: User;
        if(post.user !== undefined){
            fetchedUser = await Firebase.getUser(post.user) as User;
            setAuthor(fetchedUser);
        }   
    }

    async function getCommentsData(){
        if (params.postID !== undefined) {
            let commentsFromDB = await Firebase.comment.get(params.postID) as CommentType[];
            setComments(commentsFromDB);
        } 
    }

    useEffect(() => {
        getPostData();
        getCommentsData();
    }, [])
    

    useEffect(() => {
        if (post.id !== undefined) {
            getUsernamesData();
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
            {FirebaseCore.auth.currentUser?.uid === post.user ?
            <button className={styles.editButton} onClick={()=>{
                navigate(`edit`);
            }}>Edit</button>
            :
            null
        }
            
          </div>
          <div className={styles.username}>{author?.username}</div>
        <div className={styles.title}>{post.title}</div>
          <div className={styles.text}>{post.text}</div>
          <>
            {renderPost ? (() => {
                if(imageURL !== "noImage")
                    return (<img src={imageURL} className={styles.image}></img>)
                else {
                    return null
                }
              })()
              :
              null
          }
          </>
          <>
            {FirebaseCore.auth.currentUser ?
                <button className={styles.addCommentButton} onClick={() => {
                setCommentCreation(true);
                }}>Add a comment</button> : null}
            {commentCreation ? <CommentCreator setCommentCreation={setCommentCreation} post={post}/> : null}
            {comments ? comments.map((comment)=>{
                return <Comment comment={comment}/>
            }) : null}
          </>
          <div className={styles.likesInterface}>
            {FirebaseCore.auth.currentUser ? 
                <button
                onClick={() => {
                    if (FirebaseCore.auth.currentUser === undefined)
                        navigate("/login");
                    else if (post.id !== undefined && post.likes !== undefined && FirebaseCore.auth.currentUser) {
                        if (postLiked === undefined) {
                            let newLikes = post.likes + 1;
                            setPost({ ...post, likes: newLikes });
                            Firebase.like.add(post.id, FirebaseCore.auth.currentUser?.uid);
                            setPostLiked(true);
                        }
                        else if (postLiked === true) {
                            let newLikes = post.likes - 1;
                            setPost({ ...post, likes: newLikes });
                            Firebase.like.clear(post.id, FirebaseCore.auth.currentUser?.uid, postLiked);
                            setPostLiked(undefined);
                        }
                        else if (postLiked === false) {
                            let newLikes = post.likes + 2;
                            setPost({ ...post, likes: newLikes });
                            Firebase.like.clear(post.id, FirebaseCore.auth.currentUser?.uid, postLiked);
                            Firebase.like.add(post.id, FirebaseCore.auth.currentUser?.uid);
                            setPostLiked(true);
                        }
                    }
                }}
                      className={styles.arrow} style={postLiked ? { backgroundColor: "lightgreen" } : {}}><img width="50px" src={happyToastImg}></img></button> 
            : null}
            <div className={styles.likes}>{post.likes}</div>
            {FirebaseCore.auth.currentUser ? 
                <button
                onClick={() => {
                    if (FirebaseCore.auth.currentUser === undefined)
                        navigate("/login");
                    else if (post.id !== undefined && post.likes !== undefined && FirebaseCore.auth.currentUser) {
                        if (postLiked === undefined) {
                            let newLikes = post.likes - 1;
                            setPost({ ...post, likes: newLikes });
                            Firebase.like.subtract(post.id, FirebaseCore.auth.currentUser?.uid);
                            setPostLiked(false);
                        }
                        else if (postLiked === false) {
                            let newLikes = post.likes + 1;
                            setPost({ ...post, likes: newLikes });
                            Firebase.like.clear(post.id, FirebaseCore.auth.currentUser?.uid, postLiked);
                            setPostLiked(undefined);
                        }
                        else if (postLiked === true) {
                            let newLikes = post.likes - 2;
                            setPost({ ...post, likes: newLikes });
                            Firebase.like.clear(post.id, FirebaseCore.auth.currentUser?.uid, postLiked);
                            Firebase.like.subtract(post.id, FirebaseCore.auth.currentUser?.uid);
                            setPostLiked(false);
                        }
                    }
                }}
                className={styles.arrow} style={(postLiked === false) ? {backgroundColor: "rgb(255, 107, 107)"} : {}}><img width="50px" src={sadToastImg}></img></button> 
            : null}
        </div>
    </div>
  )
}
