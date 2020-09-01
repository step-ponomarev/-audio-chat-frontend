<template>
    <div>
        {{ message.senderName }} : {{ message.message }}
    </div>
</template>

<script>
export default {
  name: "MessageItem",
  data: () => ({
    senderName: ''
  }),
  props: {
    message: {
      Type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
