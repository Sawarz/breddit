import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Comment, Post } from '../components/postCreator/PostCreator';
import { uuidv4 } from '@firebase/util';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "breddit-fff23.firebaseapp.com",
    projectId: "breddit-fff23",
    storageBucket: "breddit-fff23.appspot.com",
    messagingSenderId: "48843299030",
    appId: "1:48843299030:web:b779da1acfa230be021177"
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getFirestore(app);
  const storage = getStorage();

  const post = {
    get: getPost,
    getAll: getPosts,
    add: addPost,
    delete: deletePost,
  }

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
}

async function getCommunities() {
  const communitiesCol = collection(db, 'communities');
  const communitiesSnapshot = await getDocs(communitiesCol);
  const communitiesList = communitiesSnapshot.docs.map(doc => doc.data());
  return communitiesList;
}

async function getComments(postID: string){
  const commentsCol = collection(db, 'posts', postID, 'comments');
  const commentsSnapshot = await getDocs(commentsCol);
  const commentsList = commentsSnapshot.docs.map(doc => doc.data());
  return commentsList;
}


async function addPost(post: Post) {
  const postToBeSend = (({ image, ...o }) => o)(post)
  if (post.image !== undefined) {
    await storeImage(post.image, post)
  } 
  if (post.id !== undefined) {
    console.log(postToBeSend);
    const result = await setDoc(doc(db, "posts", post.id), postToBeSend); 
  }
}

async function addComment(post: Post, comment: Comment) {
  if (post.id !== undefined && comment.uid !== undefined) {
    const result = await setDoc(doc(db, "posts", post.id, "comments", comment.uid), comment); 
  }
}

async function storeImage(image: File, post: Post) {
  const folderRef = ref(storage, `postsImages/${post.id}`)
  uploadBytes(folderRef, image).then((snapshot) => {
    console.log('Uploaded a file!');
  });
}

async function getImage(post: Post) {
  let url = getDownloadURL(ref(storage, `postsImages/${post.id}`))
    .then((downloadedURL: string) => {
      return downloadedURL;
    })
    .catch(() => {
    return "noImage"
  })
  return url;
}

async function createNewCommunity(name: string) {
  const result = await setDoc(doc(db, "communities", uuidv4()), {name: name});
}

async function getUsername(userID: string) {
  const docRef = doc(db, "users", userID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().username;
  }
}


const Firebase = {
  app: app,
  db: db,
  auth: auth,
  post: post,
  getComments: getComments,
  getCommunities: getCommunities,
  addPost: addPost,
  createNewCommunity: createNewCommunity,
  getImage: getImage,
  getUsername: getUsername,
  addComment: addComment
}

export default Firebase;