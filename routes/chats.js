import express from 'express'
import { getChats, getChat, addChat, renameChat } from '../services/chatService.js'


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

//Hent alle beskeder for en bruger
// Hent alle beskeder for en bruger
chats.get('/messages', async (req, res) => {
    if (req.session.isLoggedIn) {
        const username = req.session.username
        const allChats = await getChats()
        let userMessages = []

        for (const chat of allChats) {
            let messages = []

            if (chat.messageArray) {
                messages = chat.messageArray
            }

            for (const message of messages) {
                if (message.owner === username) {
                    message.chatName = chat.chatName
                    userMessages.push(message)
                }
            }
        }

        res.render('messages', { messages: userMessages })

    } else {
        res.render('login')
    }
})

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

chats.put('/:id', async (req, res, next) => {
    try{
        const { chatName } = req.body
        await renameChat(req.params.id, chatName)
        res.status(200).json({ success: true })
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