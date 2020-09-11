<template>
    <q-input filled class="chat-input" v-model="message" @keypress.enter="onEnter" placeholder="Сообщение..."/>
</template>
<script>

export default {
  name: "InputArea",
  data: () => ({
    message: ''
  }),
  methods: {
    onEnter() {
      this.$emit('handleSendMessage', this.message);
      this.message = '';
    }
  }
}
</script>

<style scoped>

</style>
