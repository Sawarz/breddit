import { DocumentData } from "firebase/firestore"

export type Friend = {
    data: DocumentData,
    id: string,
    username: string
}