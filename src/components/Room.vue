<template>
<div>
    <Notifications/>
    <button :style="isSayMode" @click="say">
        {{ sayMode ? `Say mode` : `Silence mode`}}
    </button>

    <ui>
        <li v-for="(guest, index) in guestList" :key="index"> {{ guest.name }}</li>
    </ui>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import webSocketService from "@/service/ws/webSocketService";
import Notifications from "@/components/notifications/Notifications";

export default {
  name: "Room",
  components: { Notifications },
  data: () => ({
    sayMode: false,
    media: null
  }),
  async mounted() {
    try {
      webSocketService.init();
      webSocketService.connect(this.roomId, this.onSocketErrorConnected);

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

    },
    onSocketErrorConnected() {
      console.error('FAILURE SOCKET CONNECTION');
    },
    async say() {
      this.sayMode = !this.sayMode;

      if (this.sayMode) {
        const media = await navigator.mediaDevices.getUserMedia({ audio: true });

        const stream = new MediaStream();
        media.getTracks().forEach(track => stream.addTrack(track, media));

        webSocketService.stompClient.send(`/app/room/${ this.roomId }/say`, {}, "kek");
      } else {
        this.media = null;
      }
    }
  },
  computed: {
    ...mapGetters('room', ['room']),
    ...mapGetters('guest', ['guestList']),
    roomId() {
      return this.$route.params.id;
    },
    isSayMode() {
      return this.sayMode ? 'color: green;' : 'color: red';
    }
  },
}
</script>

<style scoped>

</style>
