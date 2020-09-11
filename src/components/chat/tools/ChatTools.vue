<template>
<div class="chatTools">
        <OpenChatButton @click.native="hideChat"/>
</div>
</template>

<script>
import OpenChatButton from "@/components/chat/tools/OpenChatButton";

export default {
  name: "ChatTools",
  components: { OpenChatButton },
  methods: {
    hideChat() {
      this.$emit('handleClickHideChat')
    }
  }
}
</script>

<style scoped>
.chatTools {
    padding-left: 0.5em;
    padding-right: 0.5em;
    border-bottom: 1px solid #cdcdcd;
}
</style>
