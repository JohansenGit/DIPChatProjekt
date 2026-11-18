import {Router} from 'express'
import { validateUser } from '../services/userService.js'

const login = Router()

login.get('/', (req, res) => {
    res.render('login')
})

login.post('/', async (req, res) => {
    const {username, password} = req.body
    const user = await validateUser(username, password)

    if (user !== undefined) {
        req.session.isLoggedIn = user.id
        req.session.username = username
        req.session.level = user.level

        res.redirect('/chats')
    } else {
        res.render('login')
    }
})

export { login }