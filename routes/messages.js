import express from 'express'
import { Message } from '../models/message.js'
import { getChat, updateChat } from '../services/chatService.js'
import { randomUUID } from 'node:crypto'

const messages = express.Router()

messages.post('/:id/messages', async (req, res, next) => {
    const userlvl = req.session.level
    
   if (userlvl < 2) {
    return res.status(403).json({
        success: false,
        message: 'You do not have permission to send messages!'
    })
}
    try {
        const chat = await getChat(req.params.id)

        const message = new Message(
            req.body.message,
            new Date(),
            req.session.isLoggedIn,
            chat.id,
            randomUUID()
        )

        chat.messageArray.push(message)

        await updateChat(chat)

        res.redirect('/chats/' + chat.id)
    } catch (error) {
        next(error)
    }
})

export { messages }