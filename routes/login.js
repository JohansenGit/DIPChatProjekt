import {Router} from 'express'
import { validateUser } from '../services/userService.js'
const login = Router()


login.get('/', (req, res) => {

    res.render('login')
})

login.post('/', async (req, res)=>{
    const {username, password} = req.body
    const isLoggedIn = await validateUser(username, password)
    
    if (isLoggedIn !== undefined) {
        req.session.isLoggedIn = isLoggedIn
        req.session.username = username
        res.redirect('/chats')
    } else {
        res.render('login')
    }
})


export { login }