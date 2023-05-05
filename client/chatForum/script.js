import { io } from "socket.io-client";
const baseUrl = "https://sports-sphere.vercel.app";
      
const socket = io(baseUrl);
let name;

const userInformation = ()=>{
    const cookieValue = localStorage.getItem("cookieName");
    fetch( baseUrl+ "/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieValue}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.firstName)
            name= data.firstName;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
}
userInformation();

let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
// do {
//     name = prompt('Please enter your name: ')
// } while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}


