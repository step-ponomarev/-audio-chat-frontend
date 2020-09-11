<template>
    <div class="chat">
        <ChatTools @handleClickHideChat="hideChat"/>
        <div v-if="!hidden" class="ui-element user-chat">
            <MessageList/>
            <InputArea @handleSendMessage="sendMessage"/>
        </div>
    </div>
</template>

<script>
//TODO: Отделить тулзы чата в отдельные компоненты
import roomSocketService from "@/service/ws/roomSocketService";
import InputArea from "@/components/chat/InputArea";
import MessageList from "@/components/chat/MessageList";
import { mapGetters } from 'vuex';
import ChatTools from "@/components/chat/tools/ChatTools";

export default {
  name: "Chat",
  components: { ChatTools, MessageList, InputArea },
  data: () => ({
    hidden: false
  }),
  methods: {
    sendMessage(msg) {
      try {
        roomSocketService.sendMessage(this.roomId, this.userId, msg);
      } catch (e) {
        console.error(e);
      }
    },
    hideChat() {
      this.hidden = !this.hidden;
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
    .chat {
        width: 100%;
        box-sizing: border-box;
        z-index: 2000;
    }

    .user-chat {
        animation-name: bounceOutUp;
        animation-duration: 200ms;
    }

    @keyframes bounceOutUp {
        0% {
            transform: translateY(200%);
        }

        100% {
            transform: translateY(0);
        }
    }

</style>
