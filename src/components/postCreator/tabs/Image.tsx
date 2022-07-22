import React from 'react'
import { Post } from '../PostCreator'

type Props = {
    setPost: React.Dispatch<React.SetStateAction<Post>>
    post: Post
}


export default function Image({setPost, post}: Props) {
  return (
    <input
    type="file"
    onChange={(e)=>{
        if(e.target.files != null){
            setPost({
                text: post.text,
                image: e.target.files[0] as File,
                link: post.link
            })
        }
    }}
    ></input>
  )
}
