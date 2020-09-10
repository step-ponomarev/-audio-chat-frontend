<template>
    <div class="mainPage">
        <header>
        <h1>Создай комнату!</h1>
    </header>
    <main>
        <CreateRoomButton @handleClickButton="createRoom" class="centered"/>
    </main>
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
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}

h1 {
    margin: 0;
}

</style>
