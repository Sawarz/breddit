import { useEffect, useState } from 'react'
import styles from './feed.module.css';
import { Link } from 'react-router-dom';
import Firebase from '../../firebase/Firebase';
import { Post } from '../../types/Post';
import { Community } from '../board/Board'

type Props = {
    loggedIn: boolean;
    community?: Community;
};


export default function Feed({ loggedIn, community }:Props) {
    const [posts, setPosts] = useState<Post[]>();
	const [images, setImages] = useState<{ postID: undefined | string; url: string }[]>();
	const [renderPosts, setRenderPosts] = useState<boolean>(false);

    async function fetchPostsFromDB() {
        let postsFromDB = (await Firebase.post.getAll()) as Array<Post>;
        if (community) {
            postsFromDB = postsFromDB.filter(post => community.posts.some(communityPostID => communityPostID === post.id) === true)
            console.log(postsFromDB)
            setPosts(postsFromDB);
        }
        else {
            console.log(postsFromDB);
            setPosts(postsFromDB);
        }
		let newImages: { postID: undefined | string; url: string }[] = [];
		async function getImageData() {
			await Promise.all(
				postsFromDB.map(async (post) => {
					const imageURL = await Firebase.getImage(post);
					newImages.push({
						postID: post.id,
						url: imageURL,
					});
				})
			);
		}
		getImageData().then(() => {
			setImages(newImages);
		});
	}

	useEffect(() => {
		fetchPostsFromDB();
	}, []);

	useEffect(() => {
		setRenderPosts(true);
	}, [images]);
  return (
    <div className={styles.main}>
				<div className={styles.createPost}>
					<div className={styles.profilePic}></div>
					{loggedIn ? (
						<Link to='/post' className={styles.createPostButton}>
							Create post
						</Link>
					) : (
						<Link to='/login' className={styles.createPostButton}>
							Create post
						</Link>
					)}
				</div>
				<div className={styles.filters}></div>
				<div className={styles.posts}>
					{renderPosts
						? posts?.map((post, i) => {
								if (images !== undefined) {
									let image = images.find((image) => image.postID === post.id);
									if (image !== undefined)
										return (
                                            <div key={i} className={styles.post}>
												<div className={styles.postLikes}>{post.likes}</div>
												<div className={styles.postContent}>
													<Link
														to={`/posts/${post.id}`}
														className={styles.link}
													>
														<div className={styles.postCommunity}>
															b/{post.community}
														</div>
														<div className={styles.postTitle}>{post.title}</div>
														{image.url !== 'noImage' ? (
															<img
																className={styles.postImage}
																src={image.url}
															></img>
														) : null}
													</Link>
												</div>
											</div>
										);
								} else {
                                    return <div key={i} className={styles.loading}>Loading...</div>;
								}
						  })
						: null}
				</div>
			</div>
  )
}
