import express from 'express'
import {getchats} from '../service.js'
import {chat} from '../models/chat.js'

 const chats = express.Router()

 chats.get('/', async (req, res) =>{
    const chats = await getChats()
    res.render('chats', {chats : chats})
 })


 export{chats}