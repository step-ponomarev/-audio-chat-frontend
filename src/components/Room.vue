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

      await webSocketService.connect(this.onSocketSuccessfulConnected, this.onSocketErrorConnected);
    } catch (e) {
      console.error('Failure fetching room');
    }
  },
  destroyed() {
    webSocketService.disconnect();
  },
  methods: {
    ...mapActions('room', ['fetchRoom']),
    ...mapActions('guest', ['removeGuest']),
    onSocketSuccessfulConnected() {
      webSocketService.stompClient.subscribe(`/topic/guestHasLeaved/${ this.roomId }`, (guestId) => {
        // this.removeGuest();
        console.error(guestId);
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
