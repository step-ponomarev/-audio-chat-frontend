<template>
    <div>
        {{ guestById(message.senderId).name }} : {{ message.message }}
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "MessageItem",
  props: {
    message: {
      Type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('guest', ['guestById'])
  }
}
</script>

<style scoped>

</style>
