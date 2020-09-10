<template>
    <div class="guestList ui-element">
        <GuestItem v-for="(guest) in guestList.filter(g => g.id !== user.id)" :guest="guest" :key="guest.sessionId"/>
    </div>
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
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 100px));
    border: #eeeeee solid 1px;
    padding: 1em;
    box-sizing: border-box;
    margin: 0.5em;
}
</style>
