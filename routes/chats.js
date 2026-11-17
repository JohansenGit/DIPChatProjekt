import express from 'express'
import { getChats, getChat, addChat } from '../services/chatService.js'


const chats = express.Router()

chats.get('/', async (req, res) => {
    if (req.session.isLoggedIn) {
        const userID = req.session.userID
        const chats = await getChats()
        res.render('chats', { chats: chats })
    } else {
        res.render('login')
    }
    
})

//CreateChat side:
chats.get('/createChat', (req, res) => {
    res.render('createChat')
});

chats.get('/:id', async (req, res)=>{
    const chat = await getChats(req.params.id)
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

chats.post('/createChat', async (req, res) => {
    const {chatName} = req.body 

    const creationDate = Date().toLocaleString('da-DK')
    const owner = req.session.username
    const messageArray = new Array()
    const id = crypto.randomUUID();

    await addChat(chatName, creationDate, owner , messageArray, id)
    res.redirect('/chats')
});

export { chats }