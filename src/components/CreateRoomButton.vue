<template>
    <div>
        <button @click="onClickButton">Создать комнату</button>
    </div>
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

</style>
