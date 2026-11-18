import {Router} from 'express'
import {getUser, getUsers, deleteUser, updateUser, addUser, updateLastSeen } from '../services/userService.js'
import { User } from '../models/user.js'
import crypto from 'crypto'

const users = Router()

users.get('/', async (req, res)=>{
    const users = await getUsers()
    res.render('users', { users: users })
})

//Opret bruger side:
users.get('/createUser', (req, res) => {
    res.render('createUser')
});

users.get('/administration', async (req, res) => {
    const users = await getUsers()

    users.forEach(user => {
        if (user.lastSeen) {
            const timeSinceLastSeen = Date.now() - new Date(user.lastSeen).getTime()
            user.isOnline = timeSinceLastSeen < 5000
        } else {
            user.isOnline = false
        }
    })
    res.render('userAdministration', { users })
})

users.get('/:id', async (req, res)=>{
    const user = await getUser(req.params.id)
    res.render('user', { user: user})
})


users.delete('/:id', async (req, res, next) =>{
    try {
        await deleteUser(req.params.id)
        res.status (200).redirect('/users')
    } catch (error) {
        next(error)
    }
})

users.put('/:id', (req, res) => {
    try{
        updateUser(req.params.id)
        res.redirect('/users')
    } catch (error){
        next (error)
    }
})

users.post('/createUser', async (req, res) => {
    const { username, password, level } = req.body 

    const id = crypto.randomUUID()
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex')

    //await addUser(username, passwordHash, Date().toLocaleString(), level, id)
    await addUser(username, passwordHash, Date().toLocaleString(), level, id)

    res.redirect('/chats')
})

users.post('/heartbeat', async (req, res, next) => {
    try {
        if (!req.session.isLoggedIn) {
            return res.sendStatus(401)
        }

        await updateLastSeen(req.session.isLoggedIn)

        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})
users.post('/:id', (req, res) =>{
    
})


users.delete('/:id/deleteUser', async (req, res, next) => {
    try {
        const id = req.params.id

        await deleteUser(id)
        res.sendStatus(200)
        
    } catch (error) {
        next(error)
    }
})

export {users}