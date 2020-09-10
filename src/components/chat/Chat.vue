<template>
    <div class="ui-element">
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
        roomSocketService.sendMessage(this.roomId, this.userId, msg);
      } catch (e) {
        console.error(e);
      }
    }
  },
  computed: {
    ...mapGetters('room', ['room']),
    ...mapGetters('user', ['user']),
    roomId() {
      return this.room.id;
    },
    userId() {
      return this.user.id;
    }
  }
}
</script>

<style scoped>

</style>
