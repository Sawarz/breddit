import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { doc, setDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Post } from '../components/postCreator/PostCreator';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "breddit-fff23.firebaseapp.com",
    projectId: "breddit-fff23",
    storageBucket: "breddit-fff23.appspot.com",
    messagingSenderId: "48843299030",
    appId: "1:48843299030:web:b779da1acfa230be021177"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

async function getPosts() {
  const postsCol = collection(db, 'posts');
  const postsSnapshot = await getDocs(postsCol);
  const postList = postsSnapshot.docs.map(doc => doc.data());
  console.log(postList)
  return postList;
}


async function addPost(post: Post) {
  const postToBeSend = (({ image, ...o }) => o)(post)
  const result = await setDoc(doc(db, "posts", post.id), postToBeSend);
  if(post.image != undefined)
    storeImage(post.image, post)
  console.log(getPosts())
}

const storage = getStorage();

async function storeImage(image: File, post: Post) {
  const folderRef = ref(storage, `postsImages/${post.id}`)
  uploadBytes(folderRef, image).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });
}


const Firebase = {
    getPosts: getPosts,
    addPost: addPost
}

export default Firebase;