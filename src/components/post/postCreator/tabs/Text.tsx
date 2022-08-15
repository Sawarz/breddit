import { useState, useEffect } from 'react'
import styles from './styles.module.css'
import { Post } from '../../../../types/Post'

type Props = {
    setPost: React.Dispatch<React.SetStateAction<Post>>
    post: Post
}

export default function Text({ setPost, post }: Props) {
  const [text, setText] = useState<string | undefined>(post.text);
  const [title, setTitle] = useState<string | undefined>(post.title);

  useEffect(() => {
    setPost({
      ...post,
      title: title,
      text: text
    })
  }, [text, title])

  
  return (
    <>
    <div>Title:</div>
    <textarea className={styles.titleCreator}
      onChange={(e) => {
        setTitle(e.target.value);
        }}
      >{post.title}</textarea>
    <div>Text:</div>
    <textarea className={styles.textCreator}
      onChange={(e) => {
        setText(e.target.value);
        }}
      >{post.text}</textarea>
    </>
    
  )
}
