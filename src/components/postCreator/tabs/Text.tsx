import React from 'react'
import styles from './styles.module.css'
import { Post } from '../PostCreator'

type Props = {
    setPost: React.Dispatch<React.SetStateAction<Post>>
    post: Post
}

export default function Text({setPost, post}: Props) {
  return (
    <textarea className={styles.textCreator}
      onChange={(e) => {
        setPost({
          ...post,
            text: e.target.value,
        })
    }}>{post.text}</textarea>
  )
}
