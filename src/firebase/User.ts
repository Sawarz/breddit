import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import FirebaseCore from './FirebaseCore';

let db = FirebaseCore.db;
let auth = FirebaseCore.auth;

async function get(userID: string) {
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
}

async function update(userID: string, fieldToUpdate: string, value: string) {
    const docRef = doc(db, "users", userID);
    const result = updateDoc(docRef, {
        [fieldToUpdate]: value
    })
}

const user = {
    get: get,
    update: update
}

export default user;