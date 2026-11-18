import { dbRef } from "./service.js"
import {Chat} from '../models/chat.js'
import { collection, addDoc, getDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore"


const chatCollection = collection(dbRef, 'chats')

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
        messageArray: chat.messageArray.map(message => ({
            message: message.message,
            creationDate: message.creationDate,
            owner: message.owner,
            connectedChat: message.connectedChat,
            id: message.id
        }))
    })
}

async function renameChat(id, chatName) {
    await updateDoc(doc(chatCollection, id), {
        chatName: chatName
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
async function getChat(id) {
    const chatQueryDocument = await getDoc(
        doc(chatCollection.withConverter(chatConverter), id)
    )

    return chatQueryDocument.data()
}

async function addChat(chatName, creationDate, owner, messageArray, id){
    const chat = new Chat(chatName, creationDate, owner, messageArray, id)
    await addDoc(chatCollection.withConverter(chatConverter), chat)
}

async function deleteUserMessages(id) {
    const chatsSnapshot = await getDocs(collection(dbRef, 'chats'));

    for (const chatDoc of chatsSnapshot.docs) {
        const chatData = chatDoc.data()

        const updatedMessages = chatData.messageArray.filter(message => message.owner !== id)

        await updateDoc(doc(dbRef, 'chats', chatDoc.id), {messageArray: updatedMessages})
    }
}


export{getChat, getChats, addChat, updateChat, renameChat, deleteUserMessages }
