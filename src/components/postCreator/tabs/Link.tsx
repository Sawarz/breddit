import { link } from 'fs'
import React from 'react'
import { Post } from '../PostCreator'

type Props = {
    setPost: React.Dispatch<React.SetStateAction<Post>>
    post: Post
}

export default function Link({setPost, post}: Props) {
  return (
    <textarea onChange={(e)=>{
      if(e.target.value.includes("http") || e.target.value.includes("https")){
        setPost({
          ...post,
            link: e.target.value,
        })
      }
      else{
        setPost({
          ...post,
          link: "//" + e.target.value,
      })
      }
  }}>{post.text}</textarea>
  )
}
