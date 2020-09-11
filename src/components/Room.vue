<template>
<div class="room">
    <audio ref="audioZone" autoplay/>
    <UserPane :user="user" @handleChangeMicState="changeMicState"/>
    <GuestList v-if="guestList.filter(g => g.id !== user.id).length"/>
    <router-link :to="{ name: 'main'}">Выйти</router-link>
    <Notifications/>
    <Chat
        style="position: absolute; bottom: 0; left: 0; right: 0; width: 100%; box-sizing: border-box;"/>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import webSocketService from "@/service/ws/roomSocketService";
import Notifications from "@/components/notifications/Notifications";
import GuestList from "@/components/guest/GuestList";
import Chat from "@/components/chat/Chat";
import janusService from "@/service/ws/janusService";
import UserPane from "@/components/user/UserPane";

export default {
  name: "Room",
  data: () => ({
    isMicOn: false
  }),
  components: { UserPane, Chat, GuestList, Notifications },
  async mounted() {
    try {
      const roomId = this.roomId;
      let userId = localStorage.getItem(`${ roomId }_USER_ID`);

      if (userId) {
        await this.getCurrentUser(userId);
      }

      if (!this.user.id) {
        await this.createUser(roomId);
      }

      await this.fetchRoom(roomId);
      await this.fetchGuests(roomId);
      await this.fetchMessages(roomId);

      userId = this.user.id;
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
      this.setMicState(value);
    }
  },
  methods: {
    ...mapActions('user', ['fetchUser', 'createUser', 'setMicState']),
    ...mapActions('guest', ['fetchGuests']),
    ...mapActions('room', ['fetchRoom']),
    ...mapActions('message', ['fetchMessages']),
    async changeMicState() {
      this.isMicOn = !this.isMicOn;
    },
    async getCurrentUser(id) {
      await this.fetchUser(id);
    }
  },
  computed: {
    ...mapGetters('room', ['room']),
    ...mapGetters('user', ['user']),
    ...mapGetters('guest', ['guestList']),
    roomId() {
      return this.$route.params.id;
    }
  },
}
</script>

<style scoped>
.room {
    box-sizing: border-box;
    padding: 0.5em;
}
</style>
