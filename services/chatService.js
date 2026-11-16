import { dbRef } from "./service.js"
import {Chat} from '../models/chat.js'
import { collection, addDoc, getDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore"

const chatConverter = {
    toFirestore : chat =>{
        return{chatName : chat.chatName, creationDate : chat.creationDate,
        owner : chat.owner, messageArray : chat.messageArray, id : chat.id
        }
    },
    fromFirestore : (snapshot, options) =>{
        const data = snapshot.data(options)
        const id = snapshot.id
        return new Chat(data.chatName, data.creationDate,
            data.owner, data.messageArray, id
        )
    }
}

async function updateChat(chat) {
    await updateDoc(doc(chatCollection, chat.id), {
        messageArray: chat.messageArray
    })
}

//Metoder for chat
async function getChats() {
let chats = []
const chatsQueryDocument = await getDocs(
    collection(dbRef,'chats').withConverter(chatConverter))

    chatsQueryDocument.docs.forEach(qs => {chats.push(qs.data())}) 
    return chats
}

async function addChat(chatName, creationDate, owner, messageArray, id){
    const chat = new Chat(chatName, creationDate, owner, messageArray, id)
    await addDoc(chatCollection.withConverter(chatConverter), chat)
}
const chatCollection = collection(dbRef, 'chats')


export{ getChats, addChat, updateChat }