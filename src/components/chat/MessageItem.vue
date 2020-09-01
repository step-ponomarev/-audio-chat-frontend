<template>
    <div>
        {{ message.senderName }} : {{message.message }}
    </div>
</template>

<script>
export default {
  name: "MessageItem",
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
