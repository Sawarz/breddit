import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Post } from "../types/Post";
import FirebaseCore from './FirebaseCore';

let storage = FirebaseCore.storage;

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
  
  
const misc = {
    storeImage: storeImage,
    getImage: getImage,
}

export default misc;