import React from 'react'
import { Post } from '../PostCreator'

type Props = {
    setPost: React.Dispatch<React.SetStateAction<Post>>
    post: Post
}

export default function Link({setPost, post}: Props) {
  return (
    <div>Link</div>
  )
}
