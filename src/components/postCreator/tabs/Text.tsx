import { useState, useEffect } from 'react'
import styles from './styles.module.css'
import { Post } from '../PostCreator'

type Props = {
    setPost: React.Dispatch<React.SetStateAction<Post>>
    post: Post
}

export default function Text({ setPost, post }: Props) {
  const [text, setText] = useState<string | undefined>(post.text);
  const [title, setTitle] = useState<string | undefined>(post.title)

  useEffect(() => {
    setPost({
      ...post,
      title: title,
      text: text
    })
  }, [text, title])
  
  return (
    <>
    <textarea className={styles.titleCreator}
      onChange={(e) => {
        setTitle(e.target.value);
        }}
      >{post.title}</textarea>
    <textarea className={styles.textCreator}
      onChange={(e) => {
        setText(e.target.value);
        }}
      >{post.text}</textarea>
    </>
    
  )
}
