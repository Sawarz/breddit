import { useState } from 'react'
import styles from './styles.module.css'
import Dropdown from '../multiple-use/dropdown/Dropdown'

export default function PostCreator() {
  const [community, setCommunity] = useState("");

  let options = [
    "Rye",
    "Wholemeal"
  ];

  function chooseCommunity(community: string) {
    setCommunity(community);
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
        <div className={styles.postElement}>Text</div>
        <div className={styles.postElement}>Image</div>
        <div className={styles.postElement}>Link</div>
        <div className={styles.postElement}>Poll</div>
      </div>
    </div>
  )
}
