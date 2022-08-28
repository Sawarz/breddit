import { collection, doc, getDoc, setDoc, getDocs, deleteDoc, query, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"; 
import { Message } from "../types/Message";
import FirebaseCore from './FirebaseCore';

const db = FirebaseCore.db;

async function get(userID: string, friendID: string) {
  const docRef = doc(db, "users", userID, "friends", friendID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
}

async function getAll(userID: string) {
  const colRef = collection(db, "users", userID, "friends");
  const colSnap = await getDocs(colRef);
  const friendsList = colSnap.docs.map((doc) => {
    const friend = {data: doc.data(), id: doc.id}
    return friend
  })
  return friendsList
}

async function add(userID: string, friendID: string) {
  const result = await setDoc(doc(db, "users", userID, "friends", friendID), {id: friendID, messages: []});
}
  
async function remove(userID: string, friendID: string) {
  const result = await deleteDoc(doc(db, "users", userID, "friends", friendID));
}

const messages = {
  add: async (message: Message) => {
    const senderRef = doc(db, "users", message.sender, "friends", message.receiver);
    const receiverRef = doc(db, "users", message.receiver, "friends", message.sender);
    const result = await updateDoc(senderRef, {
      messages: arrayUnion(message)
    })
    const result2 = await updateDoc(receiverRef, {
      messages: arrayUnion(message)
    })
  },
  remove: async (message: Message) => {
    const senderRef = doc(db, "users", message.sender, "friends", message.receiver);
    const receiverRef = doc(db, "users", message.receiver, "friends", message.sender);
    const result = await updateDoc(senderRef, {
      messages: arrayRemove(message)
    })
    const result2 = await updateDoc(receiverRef, {
      messages: arrayRemove(message)
    })
  }
}

const friends = {
  get: get,
  getAll: getAll,
  add: add,
  remove: remove,
  messages: messages
}

export default friends;