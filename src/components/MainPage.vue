<template>
    <CreateRoomButton @handleClickButton="createRoom"/>
</template>

<script>
import CreateRoomButton from "@/components/CreateRoomButton";
import { createRoom } from "@/service/ajax/roomService";
import janusService from "@/service/ws/janusService";

export default {
  name: "MainPage",
  components: { CreateRoomButton },
  methods: {
    async createRoom() {
      try {
        await janusService.connect();

        const room = await createRoom((await janusService.createAudioRoom()).room);

        await this.$router.push({ name: 'room', params: { id: room.id } });
      } catch (e) {
        console.error('Failure room creation');
      }
    }
  },
}
</script>

<style scoped>

</style>
