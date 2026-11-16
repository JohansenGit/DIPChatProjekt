import express from 'express'
import { getChats } from '../service.js'


const chats = express.Router()

chats.get('/', async (req, res) => {
    const chats = await getChats()
    res.render('chats', { chats: chats })
})

chats.get('/:id', async (req, res) => {
    const chat = await getChat(req.params.id)

    res.render('chat', { chat: chat })
})

export { chats }