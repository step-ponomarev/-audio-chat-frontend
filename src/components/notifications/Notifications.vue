<template>
 <div>
    <Notification v-for="(notification, index) in notifications" :notification="notification" :key="index"/>
  </div>

</template>

<script>
import { mapGetters } from 'vuex';
import Notification from "@/components/notifications/Notification";

export default {
  name: "Notifications",
  components: { Notification },
  computed: {
    ...mapGetters('notifications', ['notifications']),
  }
}
</script>

<style scoped>

</style>
