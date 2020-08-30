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
      webSocketService.init();
      webSocketService.connect(this.onSocketSuccessfulConnected, this.onSocketErrorConnected);

      await this.fetchRoom(this.roomId);
      await this.fetchGuests(this.roomId);
    } catch (e) {
      console.error('Failure fetching room');
    }
  },
  destroyed() {
    webSocketService.disconnect();
  },
  methods: {
    ...mapActions('room', ['fetchRoom']),
    ...mapActions('guest', ['removeGuest', 'addGuest', 'setUser', 'fetchGuests']),
    onSocketSuccessfulConnected() {
      webSocketService.stompClient.subscribe(`/queue/room/${ this.roomId }/guestHasJoined`, async (guest) => {
        this.addGuest(await JSON.parse(guest.body));
      });

      webSocketService.stompClient.subscribe(`/queue/room/${ this.roomId }/guestHasLeaved`, (guestId) => {
        this.removeGuest(guestId.body);
      });

      webSocketService.stompClient.subscribe(`/user/queue/room/${ this.roomId }/currentUser`, async (user) => {
        this.setUser(await JSON.parse(user.body));
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
