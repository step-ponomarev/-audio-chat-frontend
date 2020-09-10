<template>
    <div class="mainPage">
        <CreateRoomButton @handleClickButton="createRoom" class="centered"/>
    </div>
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
        const room = await createRoom();

        await this.$router.push({ name: 'room', params: { id: room.id } });
      } catch (e) {
        console.error('Failure room creation');
      }
    }
  },
}
</script>

<style scoped>
.mainPage {
    display: grid;
    justify-content: center;
    align-content: center;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}


</style>
