import {Router} from 'express'
const login = Router()


login.get('/', (req, res) => {
    res.render('login.pug')
})


export { login }