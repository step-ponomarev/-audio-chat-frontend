<template>
    <div ref="messageList" class="messageList">
        <MessageItem v-for="(message, index) in messageList" :key="index" :message="message"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MessageItem from "@/components/chat/MessageItem";

export default {
  name: "MessageList",
  components: { MessageItem },
  computed: {
    ...mapGetters('message', ['messageList'])
  },
  watch: {
    messageList() {
      this.$refs.messageList.scrollTop = this.$refs.messageList.scrollHeight;
    }
  }
}
</script>

<style scoped>
    .messageList {
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 1em;
        max-height: 250px;
    }
</style>
