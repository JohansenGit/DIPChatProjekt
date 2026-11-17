import express from 'express'
import { getChats, getChat } from '../services/chatService.js'


const chats = express.Router()

chats.get('/', async (req, res) => {
    const userID = req.session.username;
    const chats = await getChats()
    res.render('chats', { chats: chats })
})

//CreateChat side:
chats.get('/createChat', (req, res) => {
    res.render('createChat')
});

chats.get('/:id', async (req, res)=>{
    const chat = await getChat(req.params.id)
    console.log(chat)
    res.render('chat', { chat: chat})
})

//Hent alle beskeder fra en user
chats.get('/:userID/messages', async (req, res) => {
    const userID = req.params.userID

    const messages = await getMessages(userID)

    res.render('chat', { messages: messages })
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

//Hent alle beskeder for en bruger
chats.get('/messages', async (req, res) =>{
    const userID = req.session.username
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
})

export { chats }