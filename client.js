const messages = document.getElementById('messages')
const messageForm = document.getElementById('messageForm')
const socket = io('http://localhost:4000')
socket.on('message', (data) => {
    appendMessage(data)
})

socket.on('output-message', (data) => {
    console.log(data);
    if(data.length) {
        data.forEach(message => {
            appendMessage(message.msg)
        });
    }
})



const appendMessage = (message) => {
    document.getElementById('messages').innerHTML +=`<div>${message}</div>`
}

messageForm.addEventListener('click', event => {
    event.preventDefault()
    socket.emit('chatmessage', messageForm.msg.value)
    messageForm.msg.value = ''
})


