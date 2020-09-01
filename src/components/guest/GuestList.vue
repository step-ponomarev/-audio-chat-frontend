<template>
    <div class="guestList">
        <GuestItem v-for="(guest) in guestListForRender" :guest="guest" :key="guest.sessionId"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import GuestItem from "@/components/guest/GuestItem";

export default {
  name: "GuestList",
  components: { GuestItem },
  computed: {
    ...mapGetters('guest', ['guestListForRender']),
  }
}
</script>

<style scoped>
.guestList {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 200px));
    border: #eeeeee solid 1px;
    padding: 1em;
}
</style>
