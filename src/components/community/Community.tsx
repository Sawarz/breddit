import { useState, useEffect } from 'react';
import styles from './community.module.css'
import { useParams } from 'react-router-dom'
import Firebase from '../../firebase/Firebase';
import { Community as CommunityType } from '../board/Board';
import Feed from '../feed/Feed';

type Props = {
	loggedIn: boolean;
};


export default function Community({ loggedIn }: Props) {
  const params = useParams();

  const [community, setCommunity] = useState<CommunityType>()

  async function getCommunityData() {
    if (params.communityID !== undefined) {
      let communityFromDB = await Firebase.community.get(params.communityID) as CommunityType;
        setCommunity(communityFromDB);
    } 
}

  useEffect(() => {
    getCommunityData();
  }, [])

  return (
    <div className={styles.community}>
      <img className={styles.backgroundPhoto}></img>
      {community ?
        <div className={styles.container}>
          <div>{community.name}</div>
          <div className={styles.main}>
            <Feed loggedIn={loggedIn} community={community} />
          </div>
        </div>
        :
        null}
    </div>
  )
}
