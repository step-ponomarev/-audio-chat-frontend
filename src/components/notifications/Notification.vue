<template>
    <div>
        {{notification.msg}}
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Notification",
  props: {
    notification: {
      Type: Object,
      required: true
    }
  },
  mounted() {
    setTimeout(() => this.removeNotification(this.notification), 10000);
  },
  methods: {
    ...mapActions('notifications', ['removeNotification'])
  },
}
</script>

<style scoped>

</style>
