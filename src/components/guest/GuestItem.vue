<template>
  <q-chip>
        <q-avatar>
          <img src="@/assets/anon-avatar.png" alt="guest avatar"/>
        </q-avatar>
        {{ guestName }}
      </q-chip>
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
</style>
