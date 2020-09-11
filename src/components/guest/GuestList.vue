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
    grid-template-rows: repeat(auto-fit, minmax(100px, 100px));
    justify-content: center;
    align-items: center;
    height: 200px;
    overflow-y: auto;
    border: #eeeeee solid 1px;
    box-sizing: border-box;
    width: 150px;
    margin-top: 0.5em;
}
</style>
