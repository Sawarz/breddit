import { useState, useEffect } from 'react'
import styles from './styles.module.css'
import { Post } from '../PostCreator'

type Props = {
    setPost: React.Dispatch<React.SetStateAction<Post>>
    post: Post
}

export default function Poll({setPost, post}: Props) {
  const [createPoll, setCreatePoll] = useState<boolean>(false)
  const [title, setTitle] = useState<string>()
  const [options, setOptions] = useState<string[]>();

  useEffect(() => {
    setPost({
      ...post,
      text: post.text,
      image: post.image,
      link: post.link,
      pollTitle: title,
      pollOptions: options
    })
  }, [options])
  

  return (
    <div className={styles.poll}>
      <button 
      className={styles.createPoll}
      onClick={()=>{
        setCreatePoll(true)
      }}>Add Poll</button>
      {createPoll ? 
      <div className={styles.pollCreator}>
        <div>Enter poll title</div>
        <input
        type="text"
        placeholder="Poll title"
        onChange={(e)=>{
          setTitle(e.target.value)
        }}
        ></input>
        <div>Options: </div>
        {options?.map((option, i)=>{
          return <input 
          type="text"
          onChange={(e)=>{
            let newOptions = options.slice();
            newOptions[i] = e.target.value;
            setOptions(newOptions)
          }}></input>
        })}
        <button className={styles.addPollOption}
        onClick={(e)=>{
          if(options)
            setOptions([...options, "Option"])
          else
            setOptions(["Option"])
        }}>Add option</button>
      </div>
      :
      null
      }
    </div>
  )
}
