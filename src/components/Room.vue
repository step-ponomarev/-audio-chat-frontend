<template>
<div>
    <Notifications/>
    <div>
        Guest list:
        <li v-for="(guest, index) in guestList" :key="index"> {{ guest.name }}</li>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import webSocketService from "@/service/ws/webSocketService";
import Notifications from "@/components/notifications/Notifications";

export default {
  name: "Room",
  components: { Notifications },
  data: () => ({}),
  //TODO: Возможно имеет смысл сделать watch за роутом room вместо маунтед, но как поступать с дисконнектом?
  async mounted() {
    try {
      webSocketService.init();
      webSocketService.connect(this.roomId, this.onSocketErrorConnected);

      await this.fetchRoom(this.roomId);
      await this.fetchGuests(this.roomId);
    } catch (e) {
      //TODO: Сделать нотификацию тип
      console.error('Failure fetching room');
    }
  },
  destroyed() {
    webSocketService.disconnect();
  },
  methods: {
    ...mapActions('room', ['fetchRoom']),
    ...mapActions('guest', ['removeGuest', 'addGuest', 'setUser', 'fetchGuests']),
    onSocketErrorConnected() {
      console.error('FAILURE SOCKET CONNECTION');
    }
  },
  computed: {
    ...mapGetters('room', ['room']),
    ...mapGetters('guest', ['guestList']),
    roomId() {
      return this.$route.params.id;
    }
  },
}
</script>

<style scoped>

</style>
