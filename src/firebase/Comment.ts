import { collection, getDocs } from 'firebase/firestore';
import { doc, setDoc } from "firebase/firestore"; 
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import FirebaseCore from './FirebaseCore';

let db = FirebaseCore.db;

async function getComments(postID: string){
    const commentsCol = collection(db, 'posts', postID, 'comments');
    const commentsSnapshot = await getDocs(commentsCol);
    const commentsList = commentsSnapshot.docs.map(doc => doc.data());
    return commentsList;
}
  
  async function addComment(post: Post, comment: Comment) {
    if (post.id !== undefined && comment.uid !== undefined) {
      const result = await setDoc(doc(db, "posts", post.id, "comments", comment.uid), comment); 
    }
}

const comment = {
    get: getComments,
    add: addComment
}

export default comment;