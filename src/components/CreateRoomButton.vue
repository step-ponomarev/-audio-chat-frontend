<template>
        <div @click="onClickButton" class="createRoomButton">Создать комнату</div>
</template>

<script>

export default {
  name: "CreateRoomButton",
  methods: {
    onClickButton() {
      this.$emit('handleClickButton');
    }
  }
}
</script>

<style scoped>
.createRoomButton {
    font-size: 18px;
    text-align: center;
    vertical-align: center;
    padding: 1em 2em;
    background-color: #ffaa00;
    color: white;
    width: max-content;
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);
}

.createRoomButton:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition-duration: 200ms;
}
</style>
