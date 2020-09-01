<template>
    <div>
        <MessageList/>
        <input-area @handleSendMessage="sendMessage"/>
    </div>
</template>

<script>
import roomSocketService from "@/service/ws/webSocketService";
import InputArea from "@/components/chat/InputArea";
import MessageList from "@/components/chat/MessageList";

export default {
  name: "Chat",
  components: { MessageList, InputArea },
  methods: {
    sendMessage(msg) {
      roomSocketService.stompClient.send(`/app/sendMessage`, {}, msg);
    }
  },
}
</script>

<style scoped>

</style>
