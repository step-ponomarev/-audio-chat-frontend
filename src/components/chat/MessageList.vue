<template>
         <q-scroll-area class="messageList q-pa-md row justify-center" ref="messageList" @scroll="onScroll">
            <MessageItem v-for="(message, index) in messageList" :key="index" :message="message" class="q-py-xs"/>
         </q-scroll-area>
</template>

<script>
import { mapGetters } from 'vuex';
import MessageItem from "@/components/chat/MessageItem";

export default {
  name: "MessageList",
  components: { MessageItem },
  data: () => ({
    firstScroll: true,
    currentScrollSize: 0,
    vSize: '',
  }),
  methods: {
    onScroll(info) {
      if (this.currentScrollSize !== info.verticalSize) {
        this.handleScrollSizeChanged(info);
        this.currentScrollSize = info.verticalSize;
      }
    },
    handleScrollSizeChanged(info) {
      if (this.firstScroll) {
        this.scrollDown(info.verticalSize);
        this.firstScroll = false;
      } else if (this.currentScrollSize === info.verticalPosition + 218) {
        this.scrollDown(info.verticalSize);
      }
    },
    scrollDown(pos) {
      this.$refs.messageList.setScrollPosition(pos);
    },
  },
  computed: {
    ...mapGetters('message', ['messageList'])
  },
}
</script>

<style scoped>
    .messageList {
        height: 250px;
    }
</style>
