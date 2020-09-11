<template>
    <div :class="fadeStyle">
        <q-chat-message
            :name="message.senderId"
            avatar="https://static.thenounproject.com/png/302770-200.png"
            :text="[message.message]"
            :stamp="message.sendDate"
            :sent="user.id !== message.senderId"
            :bg-color="bgColor"
        />
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
    ...mapGetters('user', ['user']),
    bgColor() {
      return this.user.id === this.message.senderId ? 'amber-7' : 'light-green-7';
    },
    fadeStyle() {
      return {
        fadeInLeft: this.user.id === this.message.senderId,
        fadeInRight: this.user.id !== this.message.senderId
      }
    }
  }
}
</script>

<style scoped>
    .fadeInRight {
        animation-name: fadeInRight;
        animation-duration: 400ms;
    }

    @keyframes fadeInRight {
        0% {
            opacity: 0;
            transform: translateX(+200%);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .fadeInLeft {
        animation-name: fadeInLeft;
        animation-duration: 400ms;
    }

    @keyframes fadeInLeft {
        0% {
            opacity: 0;
            transform: translateX(-200%);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }
</style>
