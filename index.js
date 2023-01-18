import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const server = createServer(app)
const io = new Server(server)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//Config 
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

//Routes
app.use('/', (req,res,next) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('a user connected to my socket!')
    
    socket.on('chat message', (msg) => { // send the message to everyone, including the sender
        io.emit('chat message', msg); // all connected sockets get this value
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })

    // socket.emit('request', (e) => console.log('req...', e)) // emit an event to the socket
    // socket.on('reply',  (e) => console.log('reply...', e)) // listen to the event
    // socket.on('event',  (e) => console.log('event...', e)) // listen to the event
    // socket.on('disconnect',  (e) => console.log('discon...', e)) // listen to the event
    // io.emit('broadcast',  (e) => console.log('broad...', e)) // emit an event to all connected sockets
})


const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Socket Running on Port: http://localhost:${PORT}`))

