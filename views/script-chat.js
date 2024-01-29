const messageBox = document.querySelector("#message");
const sendButton = document.querySelector(".send-button");
const messageForm = document.getElementById("message-form");
const conversationView = document.querySelector(".conversation-view .messages-container");

messageBox.addEventListener("keyup", function() {
    messageBox.style.height = "auto";
    let height = messageBox.scrollHeight + 2;
    if (height > 200) {
        height = 200;
    }
    messageBox.style.height = height + "px";
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

// conversations 버튼 클릭 이벤트 추가
document.querySelectorAll(".conversations li").forEach(conversationItem => {
    conversationItem.addEventListener("click", function() {
        const conversationId = this.getAttribute("data-conversation-id");
        const conversationData = getConversationData(conversationId);

        // conversation-view 갱신
        updateConversationView(conversationData);
    });
});

// 대화 내용 갱신 함수
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
        contentElement.innerHTML = `<p>${message.content}</p>`;
        messageElement.appendChild(contentElement);

        messagesContainer.appendChild(messageElement);
    });
}

// 저장된 데이터를 가져오는 함수 (예시)
function getConversationData(conversationId) {
    // 예시 데이터
    const exampleData = {
        today: {
            modelName: "Default (GPT-3.5)",
            messages: [
                { sender: "user", content: "안녕하세요?" },
                { sender: "assistant", content: "안녕하세요! 어떻게 도와드릴까요?" },
            ],
        },
        yesterday: {
            modelName: "Custom Model 2",
            messages: [
                { sender: "user", content: "대화 내용 2-1" },
                { sender: "assistant", content: "대화 내용 2-2" },
            ],
        },
        1: {
            modelName: "Custom Model 1",
            messages: [
                { sender: "user", content: "대화 내용 1-1" },
                { sender: "assistant", content: "대화 내용 1-2" },
            ],
        },
        2: {
            modelName: "Custom Model 3",
            messages: [
                { sender: "user", content: "대화 내용 3-1" },
                { sender: "assistant", content: "대화 내용 3-2" },
            ],
        },
    };

    return exampleData[conversationId] || { modelName: "", messages: [] };
}
