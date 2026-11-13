// Import the functions you need from the SDKs you need
import express from 'express'
import { users as usersRouter } from './routes/users.js'
//import { chats as chatsRouter} 

const app = express()

app.set('view engine', 'pug')
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'))

//Her er mine routes
app.use('/users', usersRouter)
//app.use('/chats', chatsRouter)
//app.use('/messages', messagesRouter)

app.listen(6767)
console.log("Siden kører på port 6767")


