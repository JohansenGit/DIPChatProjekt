import { dbRef } from "./service.js"
import {User} from '../models/user.js'
import crypto from 'crypto'
import { collection, addDoc, getDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore"

//Converter til/fra firestore
const userConverter = {
    toFirestore : user =>{
        return{username : user.username, password : user.password,
            creationDate : user.creationDate, level : user.level, id : user.id
        }
    },
    fromFirestore : (snapshot, options) => {
        const data = snapshot.data(options)
        const id = snapshot.id
        return new User(data.username, data.password,
             data.creationDate, data.level, id)
    }
}

const userCollection = collection(dbRef, 'users')


async function addUser(username, password, creationDate, level, id){
    const user = new User(username, password, creationDate, level, id)
    await addDoc(userCollection.withConverter(userConverter), user)
}

async function getUser(id){
    const userQueryDocument = await getDoc(
        doc(collection(dbRef, 'users').withConverter(userConverter), id))
        return userQueryDocument.data()
}

async function deleteUser(id){
    await deleteDoc(doc(collection(dbRef, 'users'), id))
}

function updateUser(id){
    updateDoc(doc(collection(dbRef, 'users'), id))
}

async function getUsers(){
    let users = []
    const usersQueryDocument = await getDocs(
        collection(dbRef,'users').withConverter(userConverter))

        usersQueryDocument.docs.forEach(qs => {users.push(qs.data())})
        return users
}


async function validateUser(username, password){
    // henter alle users i databaen
    const users = await getUsers()

    // lavet et index ved at sammenligner argumenterne username og password med username og password i databen, 
    // hvis der er et match sÃ¦ttes index. 
    let hashedPassword = crypto.createHash('sha256').update(password).digest('hex')
    const index = users.findIndex(u=>u.username == username && u.password == hashedPassword)


    let isLoggedIn = undefined

    if (index >= 0) {
        isLoggedIn = users[index].id
    }
    return isLoggedIn
}

export{addUser, getUser, deleteUser, updateUser, getUsers, validateUser}