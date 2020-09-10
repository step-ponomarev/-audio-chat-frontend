<template>
<div>
    <audio ref="audioZone" autoplay/>

    {{user.name }}
    <GuestList/>
    <router-link :to="{ name: 'main'}">Выйти</router-link>
    <Notifications/>
    <Chat
        style="position: absolute; bottom: 0; left: 0; right: 0; width: 100%; box-sizing: border-box;"/>
    <br/>
    <span>
        Микрофон {{ isMicOn ? "On" : "Off" }}
    </span>
    <br/>
    <button @click="changeMicState">
        Микрофон
    </button>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import webSocketService from "@/service/ws/roomSocketService";
import Notifications from "@/components/notifications/Notifications";
import GuestList from "@/components/guest/GuestList";
import Chat from "@/components/chat/Chat";
import janusService from "@/service/ws/janusService";

export default {
  name: "Room",
  data: () => ({
    isMicOn: false
  }),
  components: { Chat, GuestList, Notifications },
  async mounted() {
    try {
      const roomId = this.roomId;

      await this.createUser(roomId);
      await this.fetchRoom(roomId);
      await this.fetchGuests(roomId);
      await this.fetchMessages(roomId);

      const userId = this.user.id;
      webSocketService.init(roomId, userId);

      janusService.setAudioElement(this.$refs.audioZone);
      janusService.attachPlugin({ roomId, userId: this.user.id });
      janusService.configureMicrophoneSettings(this.isMicOn);
    } catch (e) {
      console.error(e);
    }
  },
  destroyed() {
    webSocketService.disconnect(this.user.id);
  },
  watch: {
    isMicOn(value) {
      janusService.configureMicrophoneSettings(value);
    }
  },
  methods: {
    ...mapActions('user', ['createUser']),
    ...mapActions('guest', ['fetchGuests']),
    ...mapActions('room', ['fetchRoom']),
    ...mapActions('message', ['fetchMessages']),
    async changeMicState() {
      this.isMicOn = !this.isMicOn;
    }
  },
  computed: {
    ...mapGetters('room', ['room']),
    ...mapGetters('user', ['user']),
    roomId() {
      return this.$route.params.id;
    }
  },
}
</script>

<style scoped>

</style>
