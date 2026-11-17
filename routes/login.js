import {Router} from 'express'
import { validateUser } from '../services/userService.js'
const login = Router()


login.get('/', (req, res) => {

    res.render('login')
})

login.post('/', async (req, res)=>{
    const {username, password} = req.body
    const userId = await validateUser(username, password)
    
    if (userId !== undefined) {
        req.session.isLoggedIn = userId
        req.session.username = username;
        res.redirect('/chats')
    } else {
        res.render('login')
    }
})


export { login }