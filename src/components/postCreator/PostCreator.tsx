import { ReactComponentElement, useState } from 'react'
import styles from './styles.module.css'
import Dropdown from '../multiple-use/dropdown/Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileText, faFont, faPaperclip, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';
import Text from './tabs/Text';
import Image from './tabs/Image';
import Link from './tabs/Link';
import Poll from './tabs/Poll';

export type Post = {
  text: undefined | string,
  image: undefined | File
}

export default function PostCreator() {
  const [community, setCommunity] = useState("");
  const [post, setPost] = useState<Post>({
    text: undefined,
    image: undefined
  })
  const [currentTab, setCurrentTab] = useState(<Text setPost={setPost} post={post}/>)

  let options = [
    "Rye",
    "Wholemeal"
  ];

  function chooseCommunity(community: string) {
    setCommunity(community);
  }

  function renderPostImage(image: Post["image"]){
    if(image != undefined){
      return(<img src={URL.createObjectURL(image as File)}></img>)
    }
    return(<></>)
  }

  return (
    <div className={styles.postCreator}>
      <div className={styles.title}>Create a post!</div>
      <Dropdown
        label={"Choose a community"}
        options={options}
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
      <div>Post preview:</div>
      <div className={styles.previewText}>{post.text}</div>
      <div>{renderPostImage(post.image)}</div>
    </div>
  )
}