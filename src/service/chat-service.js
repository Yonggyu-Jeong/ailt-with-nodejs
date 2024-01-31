// app.js

const express = require('express');
const expressWs = require('express-ws');
const path = require('path');

const app = express();
const port = 8000;

expressWs(app);

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// WebSocket 연결
app.ws('/', (ws, req) => {
    console.log('Client connected');

    // 클라이언트로부터 메시지를 받았을 때의 처리
    ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message);

        // 메시지 타입에 따라 처리
        switch (parsedMessage.type) {
            case 'text':
                broadcastTextMessage(parsedMessage.text);
                break;
            case 'image':
                broadcastImage(parsedMessage.image);
                break;
            case 'audio':
                broadcastAudio(parsedMessage.audio);
                break;
            default:
                console.error('Unknown message type:', parsedMessage.type);
        }
    });

    // 연결 종료 시의 처리
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

function broadcastTextMessage(text) {
    // 받은 텍스트 메시지를 모든 클라이언트에게 브로드캐스트
    app.getWss().clients.forEach((client) => {
        if (client.readyState === 1) { // WebSocket.OPEN 상태인 경우
            const message = { type: 'text', text };
            client.send(JSON.stringify(message));
        }
    });
}

function broadcastImage(image) {
    // 받은 이미지를 모든 클라이언트에게 브로드캐스트
    app.getWss().clients.forEach((client) => {
        if (client.readyState === 1) {
            const message = { type: 'image', image };
            client.send(JSON.stringify(message));
        }
    });
}

function broadcastAudio(audio) {
    // 받은 오디오를 모든 클라이언트에게 브로드캐스트
    app.getWss().clients.forEach((client) => {
        if (client.readyState === 1) {
            const message = { type: 'audio', audio };
            client.send(JSON.stringify(message));
        }
    });
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
