import { doc, updateDoc, increment, arrayUnion, arrayRemove } from "firebase/firestore"; 
import FirebaseCore from './FirebaseCore';

let db = FirebaseCore.db;

async function add(postID: string, userID: string) {
    const postRef = doc(db, "posts", postID);
    await updateDoc(postRef, {
      likes: increment(1),
      likedBy: arrayUnion(userID),
      dislikedBy: arrayRemove(userID)
    });
  }
  
  async function subtract(postID: string, userID: string) {
    const postRef = doc(db, "posts", postID);
    await updateDoc(postRef, {
      likes: increment(-1),
      likedBy: arrayRemove(userID),
      dislikedBy: arrayUnion(userID)
    });
  }
  
  async function clear(postID: string, userID: string, postLiked: boolean) {
    const postRef = doc(db, "posts", postID);
    await updateDoc(postRef, {
      likedBy: arrayRemove(userID),
      dislikedBy: arrayRemove(userID)
    });
    if (postLiked)
      await updateDoc(postRef, {
        likes: increment(-1)
      });
    else
    await updateDoc(postRef, {
      likes: increment(+1)
    });
}
  
const like = {
    add: add,
    subtract: subtract,
    clear: clear
}

export default like;