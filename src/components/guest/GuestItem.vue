<template>
    <div class="guest-item">
        <div class="avatar">
            <img src="@/assets/anon-avatar.png" alt="guest avatar" :class="micIsActive" class="guest-Avatar"/>
        </div>
    </div>
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
    }
  }
}
</script>

<style scoped>
    .guest-item {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
    }

    .avatar {
        max-width: 50px;
    }

    .micActive {
        border: 3px solid green;
        height: 20px;
        width: 20px;
    }

    .micOff {
        border: 3px solid red;
        height: 20px;
        width: 20px;
    }

    .avatar > img {
        width: 100%;
        height: auto;
        border-radius: 100%
    }
</style>
