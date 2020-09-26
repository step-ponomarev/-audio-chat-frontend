<template>
    <q-item v-ripple class="guest-item">
        <q-item-section avatar>
          <q-avatar>
            <img src="@/assets/anon-avatar.png">
          </q-avatar>
        </q-item-section>
        <q-item-section>{{ guestName }}</q-item-section>
      </q-item>
</template>

<script>
export default {
  name: "GuestItem",
  props: {
    guest: {
      Type: Object,
      required: true
    }
  },
  computed: {
    micIsActive() {
      return {
        "micActive": this.guest.speaking,
        "micOff": !this.guest.speaking
      }
    },
    guestName() {
      return this.guest.name.length > 12 ? this.guest.name.substring(0, 12) : this.guest.name;
    }
  }
}
</script>

<style scoped>
    .guest-item {
        width: max-content;
    }
</style>
