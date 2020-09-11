<template>
    <q-input filled v-model="message" @keypress.enter="onEnter" bg-color="light-green-5"/>
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
