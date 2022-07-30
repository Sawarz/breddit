import { useState, useEffect } from 'react'
import styles from './styles.module.css'
import Dropdown from '../multiple-use/dropdown/Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileText, faFont, faPaperclip, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';
import Text from './tabs/Text';
import Image from './tabs/Image';
import Link from './tabs/Link';
import Poll from './tabs/Poll';
import Firebase from '../../firebase/Firebase';
import { uuidv4 } from '@firebase/util';

export type Post = {
  id: undefined | string,
  title: undefined | string,
  text: undefined | string,
  image?: undefined | File,
  link?: undefined | string,
  pollTitle?: undefined | string,
  pollOptions?: undefined | Array<string>,
  likes?: undefined | number,
  community: undefined | string
}

export default function PostCreator() {
  const [community, setCommunity] = useState("");
  const [post, setPost] = useState<Post>({
    id: uuidv4(),
    title: undefined,
    text: undefined,
    likes: 0,
    community: undefined
  })
  const [currentTab, setCurrentTab] = useState<null | JSX.Element>(null)
  const [communities, setCommunities] = useState(["Create new community"])

  useEffect(() => {
    async function fetchCommunitiesFromDB() {
      const communitiesFromDB = await Firebase.getCommunities();
      const newCommunities = [...communities];
      communitiesFromDB.forEach((community) => {
        newCommunities.push(community.name)
      })
      setCommunities(newCommunities);
    } 
    fetchCommunitiesFromDB();
  }, [])
  

  function chooseCommunity(chosenCommunity: string) {
    setCommunity(chosenCommunity);
    setPost({ ...post, community: chosenCommunity })
  }

  function renderPostImage(image: Post["image"]){
    if(image !== undefined){
      return(<img src={URL.createObjectURL(image)} className={styles.previewImage}></img>)
    }
    return(<></>)
  }

  return (
    <div className={styles.postCreator}>
      <div className={styles.title}>Create a post!</div>
      <Dropdown
        label={"Choose a community"}
        options={communities}
        chooseCommunity={chooseCommunity}
      />
      <div className={styles.postElements}>
        <button className={styles.postElement} onClick={()=>{
          setCurrentTab(<Text setPost={setPost} post={post}/>);
        }}>
          <div className={styles.elementTitle}>Text</div>
          <FontAwesomeIcon icon={faFont}></FontAwesomeIcon>
        </button>
        <button className={styles.postElement} onClick={()=>{
          setCurrentTab(<Image setPost={setPost} post={post}/>);
        }}>
          <div className={styles.elementTitle}>Image</div>
          <FontAwesomeIcon icon={faFileText}></FontAwesomeIcon>
        </button>
        <button className={styles.postElement} onClick={()=>{
          setCurrentTab(<Link setPost={setPost} post={post}/>);
        }}>
          <div className={styles.elementTitle}>Link</div>
          <FontAwesomeIcon icon={faPaperclip}></FontAwesomeIcon>
        </button>
        <button className={styles.postElement} onClick={()=>{
          setCurrentTab(<Poll setPost={setPost} post={post}/>);
        }}>
          <div className={styles.elementTitle}>Poll</div>
          <FontAwesomeIcon icon={faSquarePollVertical}></FontAwesomeIcon>
        </button>
      </div>
      {currentTab}
      <hr/>
      <div className={styles.previewTitle}>Post preview:</div>
      <div className={styles.previewSubtitle}>Posting to: {community}</div>
      <div className={styles.previewSubtitle}>Title: </div>
      <div className={styles.previewText}>{post.title}</div>
      <div className={styles.previewSubtitle}>Text: </div>
      <div className={styles.previewText}>{post.text}</div>
      <div>{renderPostImage(post.image)}</div>
      <hr></hr>
      <div className={styles.previewSubtitle}>Link: </div>
      <a className={styles.previewLink} href={post.link}>{post.link}</a>
      <hr></hr>
      <div className={styles.previewSubtitle}>Poll: </div>
      <div className={styles.previewPoll}>
        <div className={styles.pollTitle}>{post.pollTitle}</div>
        <div className={styles.pollOptions}>{post.pollOptions?.map((option)=>{
          return(<div>{option}</div>) 
        })}</div>
      </div>
      <button className={styles.postButton} onClick={()=>{
        Firebase.addPost(post);
      }}>Post</button>
    </div>
  )
}
