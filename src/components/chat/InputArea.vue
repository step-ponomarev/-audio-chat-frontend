<template>
    <label>
        Сообщение
<input type="text" @keypress.enter="onEnter" v-model="message"/>
</label>
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
