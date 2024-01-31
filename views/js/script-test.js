const testConversationData = {
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
}

function getConversationData(conversationId) {
    return testConversationData[conversationId] || { modelName: "", messages: [] };
}