const sidebar = document.querySelector("#sidebar");
const hide_sidebar = document.querySelector(".hide-sidebar");
const new_chat_button = document.querySelector(".new-chat");

hide_sidebar.addEventListener( "click", function() {
    sidebar.classList.toggle( "hidden" );
} );

const user_menu = document.querySelector(".user-menu ul");
const show_user_menu = document.querySelector(".user-menu button");

show_user_menu.addEventListener( "click", function() {
    if( user_menu.classList.contains("show") ) {
        user_menu.classList.toggle( "show" );
        setTimeout( function() {
            user_menu.classList.toggle( "show-animate" );
        }, 200 );
    } else {
        user_menu.classList.toggle( "show-animate" );
        setTimeout( function() {
            user_menu.classList.toggle( "show" );
        }, 50 );
    }
} );
document.querySelectorAll(".conversations li").forEach(conversationItem => {
    const editButton = conversationItem.querySelector(".edit");
    const deleteButton = conversationItem.querySelector(".delete");

    // Edit 버튼 클릭 이벤트
    editButton.addEventListener("click", function(event) {
        event.stopPropagation(); // 부모 요소의 click 이벤트 전파 방지

        const currentName = conversationItem.querySelector(".conversation-button").textContent.trim();
        const newName = prompt("새로운 대화명을 입력하세요:", currentName);

        if (newName !== null && newName !== "") {
            conversationItem.querySelector(".conversation-button").textContent = newName;
            // 저장 또는 서버에 변경된 대화명을 전달할 수 있는 로직 추가
        }
    });

    // Delete 버튼 클릭 이벤트
    deleteButton.addEventListener("click", function(event) {
        event.stopPropagation(); // 부모 요소의 click 이벤트 전파 방지

        const conversationId = conversationItem.getAttribute("data-conversation-id");

        // 대화 삭제 확인
        if (confirm("정말로 이 대화를 삭제하시겠습니까?")) {
            // 삭제된 대화에 대한 로직 추가
            conversationItem.remove();
            // 서버에 삭제된 대화 정보 전달 또는 저장 등의 로직 추가
        }
    });

    // conversations 버튼 클릭 이벤트
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
        // 이하 생략...
    });
}

// ...
