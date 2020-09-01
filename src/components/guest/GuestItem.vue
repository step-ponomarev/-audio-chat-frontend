<template>
    <div class="guest-item">
        <div class="avatar">
            <img src="@/assets/anon-avatar.png" alt="guest avatar"/>
        </div>
        {{ guest.name }}
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
  }
}
</script>

<style scoped>
    .guest-item {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .avatar {
        max-width: 50px;
    }

    .avatar > img {
        width: 100%;
        height: auto;
        border-radius: 100%
    }
</style>
