<template>
<div class="room">
    <audio ref="audioZone" autoplay/>
    <ToolBar @handleClickMenu="onOpenMenu" class="toolbar"/>
    <main class="main">
     <Menu :showed="menuIsShowed" class="menu">
         <div class="menu-items">
             <UserPane :user="user" @handleChangeMicState="changeMicState"/>
             <GuestList v-if="guestList.filter(g => g.id !== user.id).length" style="min-height: 400px; max-height: 600px"/>
         </div>
    </Menu>
    <div class="content">
        <router-link :to="{ name: 'main'}">Выйти</router-link>
        <Notifications/>
        <Chat style="position: absolute; bottom: 0; left: 0; right: 0;  box-sizing: border-box;"/>
    </div>
    </main>
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
import ToolBar from "@/components/toolbar/ToolBar";
import Menu from "@/components/Menu";

export default {
  name: "Room",
  data: () => ({
    isMicOn: false,
    menuIsShowed: false
  }),
  components: { Menu, ToolBar, UserPane, Chat, GuestList, Notifications },
  async mounted() {
    try {
      const roomId = this.roomId;

      await this.fetchUser(roomId);
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
    webSocketService.disconnect();
  },
  watch: {
    isMicOn(value) {
      janusService.configureMicrophoneSettings(value);
      this.setMicState(value);
    }
  },
  methods: {
    ...mapActions('user', ['fetchUser', 'setMicState']),
    ...mapActions('guest', ['fetchGuests']),
    ...mapActions('room', ['fetchRoom']),
    ...mapActions('message', ['fetchMessages']),
    async changeMicState() {
      this.isMicOn = !this.isMicOn;
    },
    onOpenMenu() {
      this.menuIsShowed = !this.menuIsShowed;
    }
  },
  computed: {
    ...mapGetters('room', ['room']),
    ...mapGetters('user', ['user']),
    ...mapGetters('guest', ['guestList']),
    roomId() {
      return this.$route.params.id;
    },

  },
}
</script>

<style scoped>
.room {
    display: grid;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    grid-template-rows: 1fr 100fr;
    align-content: start;
    gap: 0;
}

.menu {
    width: max-content;
    box-sizing: border-box;
}

.menu-items {
    display: grid;
    gap: 0;
    grid-template-rows: auto;
    height: 100%;
}

.toolbar {
    align-self: flex-start;
}

.main {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1000fr;
    box-sizing: border-box;
    align-self: flex-start;
}

.content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
</style>
