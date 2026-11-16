import express from 'express'
import { getChats } from '../service.js'


const chats = express.Router()

chats.get('/', async (req, res) => {
    const chats = await getChats()
    res.render('chats', { chats: chats })
})

//CreateChat side:
chats.get('/createChat', (req, res) => {
    res.render('createChat')
});

chats.get('/:id', async (req, res)=>{
    const chat = await getChat(req.params.id)
    res.render('chat', { chat: chat})
})


chats.delete('/:id', async (req, res, next) =>{
    try {
        await deleteChat(req.params.id)
        res.status (200).redirect('/chats')
    } catch (error) {
        next(error)
    }
})

chats.put('/:id', (req, res) => {
    try{
        updateChat(req.params.id)
        res.redirect('/chats')
    } catch (error){
        next (error)
    }
})

export { chats }