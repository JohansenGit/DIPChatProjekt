import {Router} from 'express'
import {getUser, getUsers, deleteUser, updateUser, addUser } from '../service.js'
import { User } from '../models/user.js'
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
    const { username, password, level, id} = req.body 
    await addUser(username, password, Date.now(), level, id)

    res.redirect('/chats')
});

users.post('/:id', (req, res) =>{
    
})

export {users}