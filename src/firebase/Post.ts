import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"; 
import { Post } from '../components/postCreator/PostCreator';
import FirebaseCore from './FirebaseCore';
import community from './Community'
import misc from './Misc'

let db = FirebaseCore.db;

async function getPosts() {
    const postsCol = collection(db, 'posts');
    const postsSnapshot = await getDocs(postsCol);
    const postList = postsSnapshot.docs.map(doc => doc.data());
    return postList;
  }
  
async function getPost(postID: string) {
    const docRef = doc(db, "posts", postID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  }
  
async function deletePost(postID: string) {
    const result = await deleteDoc(doc(db, "posts", postID));
    const communities = await community.getAll();
    const communityID = communities.find(community => community.posts.some((communityPost: string) => communityPost === postID) === true)?.id
    const docRef = doc(db, "communities", communityID);
    const result2 = await updateDoc(docRef, {
      posts: arrayRemove(postID)
    })
}
  
async function addPost(post: Post) {
    const postToBeSend = (({ image, ...o }) => o)(post)
    if (post.image !== undefined) {
      await misc.storeImage(post.image, post)
    } 
    if (post.id !== undefined) {
      console.log(postToBeSend);
      const result = await setDoc(doc(db, "posts", post.id), postToBeSend); 
      const communities = await community.getAll();
      const communityID = communities.find(community => (community.name === post.community))?.id
      const docRef = doc(db, "communities", communityID);
      const result2 = await updateDoc(docRef, {
        posts: arrayUnion(post.id)
      })
    }
  }

const post = {
    get: getPost,
    getAll: getPosts,
    add: addPost,
    delete: deletePost,
}
  
export default post;