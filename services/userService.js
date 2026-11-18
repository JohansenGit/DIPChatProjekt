import { dbRef } from "./service.js"
import {User} from '../models/user.js'
import crypto from 'crypto'
import { collection, addDoc, getDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore"

import fs from 'node:fs/promises'

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


async function deleteUser(id){
    await deleteDoc(doc(collection(dbRef, 'users'), id))
}

function updateUser(id){
    updateDoc(doc(collection(dbRef, 'users'), id))
}


async function getUsers() {
    try {
        const data = await fs.readFile('userFile.txt', { encoding: 'utf8' });
        return JSON.parse(data)
    } catch (err) {
        return [];
    }
}

async function addUser(username, password, creationDate, level, id){
    const user = new User(username, password, creationDate, level, id)

    // array af gamle users, og den nye tilføjes
    let users = await getUsers()
    users.push(user)

    try {
        // stringify(converter object, replacer function, indent space)
        await fs.writeFile('userFile.txt', JSON.stringify(users, null, 2));
    } catch (err) {
        console.log(err);
    }
}

async function getUser(id){
    try {
        const users = getUsers()
        const user = users.find(u => u.id === id)
        return user
    } catch {
        return null;
    }
}


async function validateUser(username, password) {
    const users = await getUsers()

    let hashedPassword = crypto.createHash('sha256').update(password).digest('hex')

    const user = users.find(u => u.username == username && u.password == hashedPassword)

    return user
}


export{ addUser, validateUser, getUsers, deleteUser, updateUser, getUser}



/* 
FIREBASE


async function addUserFirebase(username, password, creationDate, level, id){
    const user = new User(username, password, creationDate, level, id)
    await addDoc(userCollection.withConverter(userConverter), user)
}


async function getUserFirebase(id){
    const userQueryDocument = await getDoc(
        doc(collection(dbRef, 'users').withConverter(userConverter), id))
        return userQueryDocument.data()
}

async function getUsersFirebase(){
    let users = []
    const usersQueryDocument = await getDocs(
    collection(dbRef,'users').withConverter(userConverter))

    usersQueryDocument.docs.forEach(qs => {users.push(qs.data())})
    return users
}

async function getUserFIrebase(id){
    const userQueryDocument = await getDoc( doc(collection(dbRef, 'users').withConverter(userConverter), id))
    return userQueryDocument.data()
}


async function validateUserFirebase(username, password){
    // henter alle users i databaen
    const users = await getUsers()

    let hashedPassword = crypto.createHash('sha256').update(password).digest('hex')
    const index = users.findIndex(u=>u.username == username && u.password == hashedPassword)

    
    let isLoggedIn = undefined

    if (index >= 0) {
        isLoggedIn = users[index].id
    }
    return isLoggedIn
}
*/