<template>
    <div>
        <MessageList/>
        <input-area @handleSendMessage="sendMessage"/>
    </div>
</template>

<script>
import roomSocketService from "@/service/ws/roomSocketService";
import InputArea from "@/components/chat/InputArea";
import MessageList from "@/components/chat/MessageList";
import { mapGetters } from 'vuex';

export default {
  name: "Chat",
  components: { MessageList, InputArea },
  methods: {
    sendMessage(msg) {
      try {
        roomSocketService.sendMessage(this.roomId, msg);
      } catch (e) {
        console.error(e);
      }
    }
  },
  computed: {
    ...mapGetters('room', ['room']),
    roomId() {
      return this.room.id;
    }
  }
}
</script>

<style scoped>

</style>
