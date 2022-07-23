import React from 'react'
import { Post } from '../PostCreator'

type Props = {
    setPost: React.Dispatch<React.SetStateAction<Post>>
    post: Post
}

export default function Text({setPost, post}: Props) {
  return (
    <textarea onChange={(e)=>{
        setPost({
          ...post,
            text: e.target.value,
        })
    }}>{post.text}</textarea>
  )
}
