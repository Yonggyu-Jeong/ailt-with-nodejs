
//TODO config를 이용한 호스팅 명 변경 
const ws = new WebSocket('ws://localhost:8000');
const chatDiv = document.getElementById('chat');
const messageInput = document.getElementById('messageInput');
const fileInput = document.getElementById('fileInput');

ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    handleReceivedMessage(message);
};

function sendMessage() {
    const textMessage = messageInput.value.trim();
    if (textMessage !== '') {
        const message = { type: 'text', text: textMessage };
        ws.send(JSON.stringify(message));
        messageInput.value = '';
    }

    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = function () {
            const messageType = file.type.startsWith('image') ? 'image' : 'audio';
            const message = { type: messageType, [messageType]: reader.result };
            ws.send(JSON.stringify(message));
        };
        reader.readAsDataURL(file);
        fileInput.value = ''; // Clear file input
    }
}

function handleReceivedMessage(message) {
    switch (message.type) {
        case 'text':
            chatDiv.innerHTML += `<p>${message.text}</p>`;
            break;
        case 'image':
            chatDiv.innerHTML += `<img src="${message.image}" style="max-width: 100%; height: auto;">`;
            break;
        case 'audio':
            chatDiv.innerHTML += `<audio controls><source src="${message.audio}" type="audio/mp3"></audio>`;
            break;
        default:
            console.error('Unknown message type:', message.type);
    }
    
    chatDiv.scrollTop = chatDiv.scrollHeight; // 스크롤을 아래로 이동
}

function generateClientId() {
    return Math.random().toString(36).substr(2, 9);
}