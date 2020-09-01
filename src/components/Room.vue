<template>
<div>
    {{user.name }}
    <GuestList/>
    <router-link :to="{ name: 'main'}">Выйти</router-link>
    <Notifications/>
    <Chat
        style="position: absolute; bottom: 0; left: 0; right: 0; width: 100%; box-sizing: border-box;"/>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import webSocketService from "@/service/ws/webSocketService";
import Notifications from "@/components/notifications/Notifications";
import GuestList from "@/components/guest/GuestList";
import Chat from "@/components/chat/Chat";

export default {
  name: "Room",
  components: { Chat, GuestList, Notifications },
  data: () => ({}),
  //TODO: Возможно имеет смысл сделать watch за роутом room вместо маунтед, но как поступать с дисконнектом?
  async mounted() {
    try {
      webSocketService.init();
      webSocketService.connect(this.roomId, this.onSocketErrorConnected);

      await this.fetchRoom(this.roomId);
      await this.fetchGuests(this.roomId);
      await this.fetchMessages(this.roomId);
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
    ...mapActions('guest', ['fetchGuests']),
    ...mapActions('message', ['fetchMessages']),
    onSocketErrorConnected() {
      console.error('FAILURE SOCKET CONNECTION');
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
