import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Post } from '../components/postCreator/PostCreator';
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

const db = getFirestore(app);

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

async function getCommunities() {
  const communitiesCol = collection(db, 'communities');
  const communitiesSnapshot = await getDocs(communitiesCol);
  const communitiesList = communitiesSnapshot.docs.map(doc => doc.data());
  return communitiesList;
}


async function addPost(post: Post) {
  const postToBeSend = (({ image, ...o }) => o)(post)
  if (post.image != undefined) {
    await storeImage(post.image, post)
  } 
  if (post.id != undefined) {
    console.log(postToBeSend);
    const result = await setDoc(doc(db, "posts", post.id), postToBeSend); 
  }
}

const storage = getStorage();

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


const Firebase = {
  getPosts: getPosts,
  getPost: getPost,
  getCommunities: getCommunities,
  addPost: addPost,
  createNewCommunity: createNewCommunity,
  getImage: getImage
}

export default Firebase;