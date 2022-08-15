import React from 'react'
import { Post } from '../../../../types/Post'

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
          let image = e.target.files[0] as File
            setPost({
              ...post,
                image: image,
            })
        }
    }}
    ></input>
  )
}
