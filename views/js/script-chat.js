const messageBox = document.querySelector("#message");
const sendButton = document.querySelector(".send-button");
const messageForm = document.getElementById("message-form");
const conversationView = document.querySelector(".conversation-view .messages-container");

messageBox.addEventListener("keyup", function(event) {
    messageBox.style.height = "auto";
    let height = messageBox.scrollHeight + 2;
    if (height > 200) {
        height = 200;
    }
    messageBox.style.height = height + "px";
        if (event.key === "Enter") {
        event.preventDefault();
        sendButton.click();
    }
});

function showView(viewSelector) {
    document.querySelectorAll(".view").forEach(view => {
        view.style.display = "none";
    });

    document.querySelector(viewSelector).style.display = "flex";
}

document.querySelectorAll(".conversation-button").forEach(button => {
    button.addEventListener("click", function() {
        showView(".conversation-view");
    })
});

sendButton.addEventListener("click", function () {
    const userMessageContent = messageBox.value.trim();

    if (userMessageContent === "") {
        return;
    }

    const userMessageTemplate = `
        <div class="user message">
            <div class="identity">
                <i class="user-icon">u</i>
            </div>
            <div class="content">
                <p>${userMessageContent}</p>
            </div>
        </div>
    `;
    conversationView.innerHTML += userMessageTemplate;
    messageBox.value = "";
    conversationView.scrollTop = conversationView.scrollHeight;
});

messageForm.addEventListener("submit", function (event) {
    event.preventDefault();
    sendButton.click();
});

let isRecording = false;

function toggleRecording() {
    const recordStopButton = document.getElementById('record-stop-button');
    const sendButton = document.getElementById('send-button');
    const messageTextArea = document.getElementById('message');

    if (isRecording) {
        // 녹음 중지
        recordStopButton.style.backgroundColor = 'var(--color-gpt3)';
        recordStopButton.textContent = '음성 녹음 시작';
        sendButton.disabled = false;
        messageTextArea.disabled = false;

        // 여기에 녹음 중지 및 메시지 보내기 로직을 추가할 수 있습니다.
        alert("음성 녹음이 종료되었습니다. 메시지를 보냅니다.");
    } else {
        // 녹음 시작
        recordStopButton.style.backgroundColor = '#ff4646';
        recordStopButton.textContent = '음성 녹음 중지';
        sendButton.disabled = true;
        messageTextArea.disabled = true;

        // 여기에 녹음 시작 로직을 추가할 수 있습니다.
        alert("음성 녹음이 시작되었습니다.");
    }

    isRecording = !isRecording;
}

// conversations 버튼 클릭 이벤트 추가
document.querySelectorAll(".conversations li").forEach(conversationItem => {
    conversationItem.addEventListener("click", function() {
        const conversationId = this.getAttribute("data-conversation-id");
        const conversationData = getConversationData(conversationId);

        // conversation-view 갱신
        updateConversationView(conversationData);
    });
});


function updateConversationView(data) {
    const modelNameElement = document.querySelector(".conversation-view .model-name");
    const messagesContainer = document.querySelector(".conversation-view .messages-container");

    // 대화 내용 초기화
    modelNameElement.textContent = data.modelName;
    messagesContainer.innerHTML = "";

    // 대화 내용 추가
    data.messages.forEach(message => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", message.sender);

        const identityElement = document.createElement("div");
        identityElement.classList.add("identity");
        identityElement.innerHTML = `<i class="${message.sender}-icon">${message.sender.charAt(0)}</i>`;
        messageElement.appendChild(identityElement);

        const contentElement = document.createElement("div");
        contentElement.classList.add("content");

        // 메시지 구분에 따라 아이콘 및 클래스 변경
        if (message.sender === "user") {
            contentElement.innerHTML = `<p class="user-message">${message.content}</p>`;
        } else if (message.sender === "assistant") {
            contentElement.innerHTML = `<p class="assistant-message">${message.content}</p>`;
        }

        messageElement.appendChild(contentElement);
        messagesContainer.appendChild(messageElement);
    });
}