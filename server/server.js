import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import helmet from 'helmet'
import dotenv from 'dotenv'
// import { instrument } from '@socket.io/admin-ui'

dotenv.config()

const app = express(),
server = createServer(app),
io = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_URL,/*"https://admin.socket.io/"*/],
        credentials: true
    }
})

app.use(helmet())
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))

const connectedClients = new Set()
io.on('connection', (socket) => {
    console.log('a user connected to my socket!')
    connectedClients.add(socket.id)
    
    socket.on('getConnections', (_, cb) => cb([...connectedClients.values()]))

    socket.on('chatMessage', (msgObj) => {
        msgObj.recipient 
        ? io.in(msgObj.recipient).emit('chatMessage', msgObj)
        : io.emit('chatMessage', msgObj);
        // socket.to(msgObj.roomId).emit('chatMessage', msgObj); <-- similar to io.in()
    })

    socket.on('joinRoom', (room, cb) => {
        socket.join(room)
        cb(room)
    })

    socket.on('leaveRoom', (room, cb)=> {
        socket.leave(room)
        cb(room)
    })

    socket.on('disconnect', () => {
        if(connectedClients.has(socket.id)){connectedClients.delete(socket.id)}
        console.log('user disconnected: ', {user: socket.id});
    })
})

const PORT = process.env.PORT || 8080
server.listen(PORT, () => console.log(`Socket Running on Port: ${PORT}`))

// admin dashboard
// instrument(io, { auth: false })