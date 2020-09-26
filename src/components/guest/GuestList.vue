<template>
    <q-scroll-area class="guestList" style="max-height: 800px">
        <GuestItem v-for="(guest) in mockedGuestList.filter(g => g.id !== user.id)"
                   :guest="guest"
                   :key="guest.sessionId"
        />
    </q-scroll-area>
    <!--    <q-scroll-area class="ui-element guestList">-->
    <!--      -->
    <!--    </q-scroll-area>-->
</template>

<script>
import { mapGetters } from "vuex";
import GuestItem from "@/components/guest/GuestItem";

export default {
  name: "GuestList",
  components: { GuestItem },
  data: () => ({
    mockedGuestList: [...Array(30)].map((d, i) => ({
      sessionId: i,
      id: i,
      name: "Name" + i,
      speaking: false
    }))
  }),
  computed: {
    ...mapGetters('guest', ['guestList']),
    ...mapGetters('user', ['user']),
  }
}
</script>

<style scoped>
.guestList {

}
</style>
