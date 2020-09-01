<template>
    <CreateRoomButton @handleClickButton="createRoom"/>
</template>

<script>
import CreateRoomButton from "@/components/CreateRoomButton";
import { createRoom } from "@/service/ajax/roomService";

export default {
  name: "MainPage",
  components: { CreateRoomButton },
  methods: {
    async createRoom() {
      try {
        const roomId = await createRoom();

        await this.$router.push({ name: 'room', params: { id: roomId } });
      } catch (e) {
        console.error('Failure room creation');
      }
    }
  },
}
</script>

<style scoped>

</style>
