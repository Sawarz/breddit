import { useState, useEffect } from 'react';
import styles from './community.module.css'
import { useParams } from 'react-router-dom'
import FirebaseCore from '../../firebase/FirebaseCore';
import Firebase from '../../firebase/Firebase';
import { Community as CommunityType } from '../board/Board';
import { User } from '../../types/User';
import Feed from '../feed/Feed';

type Props = {
	loggedIn: boolean;
};


export default function Community({ loggedIn }: Props) {
  const params = useParams();

  const [community, setCommunity] = useState<CommunityType>()
  const [joined, setJoined] = useState<boolean>(false)
  const [user, setUser] = useState<User | undefined>()

  async function getCommunityData() {
    if (params.communityID !== undefined) {
      let communityFromDB = await Firebase.community.get(params.communityID) as CommunityType;
        setCommunity(communityFromDB);
    } 
  }

  async function getUserData() {
    if (FirebaseCore.auth.currentUser?.uid) {
      let user = await Firebase.getUser(FirebaseCore.auth.currentUser.uid) as User;
      setUser(user);
    }
  }

  async function joinCommunity() {
    if(community && FirebaseCore.auth.currentUser?.uid)
      Firebase.community.join(community?.id, FirebaseCore.auth.currentUser?.uid)
  }

  useEffect(() => {
    getCommunityData();
    getUserData();
  }, [])

  return (
    <div className={styles.community}>
      <img className={styles.backgroundPhoto}></img>
      {community ?
        <>
          <div className={styles.communityInfo}>
            <div className={styles.communityName}>{community.name}</div>
            <button className={styles.joinButton} onClick={joinCommunity}>Join</button>
            <div className={styles.communityNumOfMembers}>{community.numOfMembers}</div>
          </div>
          <div className={styles.main}>
            <Feed loggedIn={loggedIn} community={community} />
          </div>
        </>
        :
        null}
    </div>
  )
}
