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

//Hent alle beskeder for en bruger
chats.get('/messages', async (req, res) =>{
    if (req.session.isLoggedIn) {
        const userID = req.session.userID
        const allChats = await getChats()
        let userMessages = []


        for(const chat of allChats){
            for(const message of chat.messageArray){
                if(message.userID === userID){
                    userMessages.push(message)
                }
            }
        }
        res.render('messages', { messages: userMessages })

    }  else {
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