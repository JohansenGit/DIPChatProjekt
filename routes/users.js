import {Router} from 'express'
import {getUser, getUsers, deleteUser, updateUser, addUser } from '../service.js'
import { User } from '../models/user.js'
import crypto from 'node:crypto';

const users = Router()

users.get('/', async (req, res)=>{
    const users = await getUsers()
    res.render('users', { users: users })
})

//Opret bruger side:
users.get('/createUser', (req, res) => {
    res.render('createUser')
});


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
    const { username, password, level} = req.body 

    const id = crypto.randomUUID();

    await addUser(username, password, Date().toLocaleString('da-DK'), level, id)

    res.redirect('/chats')
});

users.post('/:id', (req, res) =>{
    
})

export {users}