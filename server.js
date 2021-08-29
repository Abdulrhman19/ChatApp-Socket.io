const io = require('socket.io')(4000,{cors:{origin:"*"}})
const mongoose = require('mongoose')
const Msg = require('./models/messages')
const mongoDB = 'mongodb+srv://AbdulrhmanMohammed:Chatbox135_@cluster0.ojlfi.mongodb.net/Chatbox-DB?retryWrites=true&w=majority'

// Connect to mongoDB
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {console.log('MongoDB connected')})
  .catch(e => {console.error(e)})


io.on('connection', (socket) => {
  Msg.find()
    .then((result) => {
      socket.emit('output-message', result)
    })
    .catch(e => console.error(e))
    console.log('a user connected');
    // socket.emit('message', 'Hello, World')
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chatmessage', msg => {
      // save the message
      const message = new Msg({msg: msg})
      message.save()
        .then(() => {
          io.emit('message', msg)
        })
        .catch(e => {
          console.error(e);
        })
      })
  });