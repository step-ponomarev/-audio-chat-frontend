<template>
<div>
    {{ roomId }}
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import webSocketService from "@/service/webSocketService";

export default {
  name: "Room",
  data: () => ({}),
  async mounted() {
    try {
      await this.fetchRoom(this.roomId);

      webSocketService.connect(this.onSocketSuccessfulConnected, this.onSocketErrorConnected);
    } catch (e) {
      console.error('Failure fetching room');
    }
  },
  destroyed() {
    webSocketService.disconnect();
  },
  methods: {
    ...mapActions('room', ['fetchRoom']),
    onSocketSuccessfulConnected() {
      webSocketService.stompClient.subscribe('/user/queue/registeredUser', (guest) => {
        console.log(guest.body);
      });
      webSocketService.stompClient.send(`/app/room/${ this.roomId }/registerGuest`);

      console.warn('SOCKED SUCCESSFUL CONNECTED');
    },
    onSocketErrorConnected() {
      console.error('FAILURE SOCKET CONNECTION');
    }
  },
  computed: {
    ...mapGetters('room', ['room']),
    roomId() {
      return this.$route.params.id;
    }
  },
}
</script>

<style scoped>

</style>
