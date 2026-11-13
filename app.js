// Import the functions you need from the SDKs you need
import express from 'express'
import { users as usersRouter } from './routes/users.js'
import { login as loginRouter } from './routes/login.js' 
//import { chats as chatsRouter} 
import session from 'express-session'


const app = express()

app.set('view engine', 'pug')
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'))

//Her er mine routes
app.use('/users', usersRouter)
app.use('/login', loginRouter)
app.use(session({
    secret: 'f8Kp2vN9xQ4mL7zR3wT6yH1bC5dJ0sA8',
    saveUninitialized: true,
    resave: true
}))

app.get('/', (req, res) => {
    res.redirect('/login')
})

//app.use('/chats', chatsRouter)
//app.use('/messages', messagesRouter)

app.listen(6767)
console.log("Siden kører på port 6767")


