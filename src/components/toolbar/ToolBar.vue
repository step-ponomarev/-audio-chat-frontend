<template>
<div class="q-pa-md q-gutter-y-sm">
    <q-toolbar class="text-primary">
      <q-btn flat round dense icon="menu" @click="onClickMenu"/>
      <q-toolbar-title>
        Online Chat
      </q-toolbar-title>
      <q-btn flat round dense icon="more_vert"/>
    </q-toolbar>
</div>
</template>

<script>
export default {
  name: "ToolBar",
  methods: {
    onClickMenu() {
      this.$emit('handleClickMenu');
    }
  }
}
</script>

<style scoped>

</style>
