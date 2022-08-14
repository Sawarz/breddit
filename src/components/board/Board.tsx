import { useState, useEffect, useRef } from 'react';
import styles from './board.module.css';
import { Link } from 'react-router-dom';
import Firebase from '../../firebase/Firebase';
import Feed from '../feed/Feed'

type Props = {
	loggedIn: boolean
};

export type Community = {
	id: string,
	name: string,
  numOfMembers: number,
  posts: string[]
};

export default function Board({ loggedIn }: Props) {
	
	const [communities, setCommunities] = useState<Community[]>([]);
	const [searchText, setSearchText] = useState<string>('');

	const inputRef = useRef<HTMLInputElement>(null);

	async function getCommunities() {
		const communities = (await Firebase.community.getAll()) as Community[];
		setCommunities(communities);
  }
  
  useEffect(() => {
		getCommunities();
	}, []);

	return (
		<div className={styles.board}>
      <Feed loggedIn={loggedIn} />
			<div className={styles.addons}>
				<div className={styles.addon}>
					<div className={styles.addonTitle}>Communities</div>
					<input
						ref={inputRef}
						onChange={(e) => {
							setSearchText(e.target.value);
						}}
						onFocus={(e) => {
							e.target.select();
						}}
						placeholder={'Search for a community'}
					></input>

					<div className={styles.searchResults}>
						{communities.map((community, i) => {
							if (community.name.toLowerCase().includes(searchText))
								return (
                  <div
                  key={i}
                  style={{
                    width: '100%'
                  }}>
                    <div
											style={{
												width: '100%',
												height: '1px',
												backgroundColor: 'rgba(60,64,67,.3)',
											}}
										></div>
										<Link
											className={styles.communityLink}
                      to={`/${community.id}`}
										>
											<div className={styles.communityName}>
												{community.name}
											</div>
											<div className={styles.numOfMembers}>
												{community.numOfMembers}
											</div>
										</Link>
									</div>
								);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
