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
      const id = this.roomId;
      webSocketService.init(id);

      await this.fetchRoom(id);
      await this.fetchGuests(id);
      await this.fetchMessages(id);

      janusService.setAudioElement(this.$refs.audioZone);
      janusService.attachPlugin({ roomId: this.roomId });
      janusService.configureMicrophoneSettings(this.isMicOn);
    } catch (e) {
      console.error(e);
    }
  },
  destroyed() {
    webSocketService.disconnect();
  },
  watch: {
    isMicOn(value) {
      janusService.configureMicrophoneSettings(value);
    }
  },
  methods: {
    ...mapActions('room', ['fetchRoom']),
    ...mapActions('guest', ['fetchGuests']),
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
