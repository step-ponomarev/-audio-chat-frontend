<template>
<div class="openChatButton">
            <div class="text">
                Чат
            </div>
            <div class="chatIcon">
            <svg viewBox="0 0 16 16" id="actions--comments" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd"
                                                                                                     d="M15 14a1.002 1.002 0 0 1-1.703.71h-.004l-.003-.01-1.704-1.7H3c-1.104 0-2-.9-2-2V3c0-1.1.896-2 2-2h10c1.104 0 2 .9 2 2v11zM5 6c.552 0 1 .45 1 1s-.448 1-1 1-1-.45-1-1 .448-1 1-1zm3 0c.552 0 1 .45 1 1s-.448 1-1 1-1-.45-1-1 .448-1 1-1zm3 0c.552 0 1 .45 1 1s-.448 1-1 1-1-.45-1-1 .448-1 1-1z"></path></svg>
        </div>
        </div>
</template>

<script>
export default {
  name: "OpenChatButton"
}
</script>

<style scoped>
.chatIcon {
    width: 20px;
}

.openChatButton {
    margin-left: auto;
    cursor: pointer;
    padding: 0.5em 0.5em 0 0.5em;
    display: flex;
    justify-content: flex-end;
    gap: 1em;
    width: max-content;
    align-items: start;
    background-color: white;
    border-radius: 5px 5px 0 0;
}

.openChatButton:hover > .chatIcon {
    transform: scale(1.1);
    transition-duration: 200ms;
}

.openChatButton > .text {
    font-size: 16px;
}
</style>
