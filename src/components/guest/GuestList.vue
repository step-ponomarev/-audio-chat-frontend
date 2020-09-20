<template>
    <q-scroll-area class="ui-element guestList">
      <GuestItem v-for="(guest) in guestList.filter(g => g.id !== user.id)"
                 :guest="guest"
                 :key="guest.sessionId"
      />
    </q-scroll-area>
</template>

<script>
import { mapGetters } from "vuex";
import GuestItem from "@/components/guest/GuestItem";

export default {
  name: "GuestList",
  components: { GuestItem },
  computed: {
    ...mapGetters('guest', ['guestList']),
    ...mapGetters('user', ['user']),
  }
}
</script>

<style scoped>
.guestList {
    height: 600px;
    width: 200px;
    margin-top: 0.5em;
    padding: 1em 1em;
    box-sizing: border-box;
    border: 1px solid #cdcdcd;
}
</style>
