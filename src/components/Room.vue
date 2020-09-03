<template>
<div>
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
    <button @click="startAudioStreaming">
        Микрофон
    </button>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import webSocketService from "@/service/ws/webSocketService";
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
    // try {
    //   webSocketService.init(this.roomId);
    //
    //   await this.fetchRoom(this.roomId);
    //   await this.fetchGuests(this.roomId);
    //   await this.fetchMessages(this.roomId);
    //
    //   await janusService.connect();
    //   await janusService.joinAudioRoom(this.room.audioRoomId);
    // } catch (e) {
    //   //TODO: Сделать нотификацию тип
    //   console.error(e);
    // }
  },
  destroyed() {
    webSocketService.disconnect();
    janusService.leaveAudioRoom();
  },
  methods: {
    ...mapActions('room', ['fetchRoom']),
    ...mapActions('guest', ['fetchGuests']),
    ...mapActions('message', ['fetchMessages']),
    async startAudioStreaming() {
      try {
        this.isMicOn = !this.isMicOn;

        if (this.isMicOn) {
          // eslint-disable-next-line no-unused-vars
          const answ = await janusService.openAndSendAudioStream();
          // await janusService.configureAudioBridgePlugin({muted: false}, answ)
        }
      } catch (e) {
        console.error(e)
      }
    }
  },
  computed: {
    ...mapGetters('room', ['room']),
    ...mapGetters('guest', ['user']),
    roomId() {
      return this.$route.params.id;
    }
  },
}
</script>

<style scoped>

</style>
