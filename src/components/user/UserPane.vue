<template>
    <div class="userPane ui-element">
        <div class="avatar">
            <img src="@/assets/anon-avatar.png" alt="guest avatar" class="user-avatar"/>
        </div>
        <div @click="handleMicClick">
            <svg class="micIcon" :class="micIsActive" viewBox="0 0 16 16" id="wysiwyg--mic"
                 xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd"
                                                          d="M10 16H6a1 1 0 0 1 0-2h.002c.081 0 .15-.059.163-.139a.165.165 0 0 0-.11-.184L6 13.658A6.006 6.006 0 0 1 2 8V7a1 1 0 0 1 2 0v.979c0 2.208 1.792 4 4 4s4-1.792 4-4V7a1 1 0 0 1 2 0v1a6.006 6.006 0 0 1-4 5.658l-.055.019a.165.165 0 0 0-.11.184c.013.08.082.139.163.139H10a1 1 0 0 1 0 2zm1-13a3.001 3.001 0 0 0-6 0v4.624a3.001 3.001 0 0 0 6 0V3z"></path></svg>
        </div>
    </div>

</template>

<script>
export default {
  name: "UserPane",
  props: {
    user: {
      Type: Object,
      required: true
    }
  },
  methods: {
    handleMicClick() {
      this.$emit('handleChangeMicState')
    }
  },
  computed: {
    micIsActive() {
      return {
        "micActive": this.user.speaking,
        "micOff": !this.user.speaking
      }
    }
  }
}
</script>

<style scoped>
.userPane {
    display: flex;
    align-items: flex-end;
    gap: 0 0.5em;
    padding: 0.5em;
    box-sizing: border-box;
    width: max-content;
}

.user-avatar {
    border-radius: 50px;
    width: 80px;
    height: auto;
    background-color: white;
    border: 1px solid black;
}

.micIcon {
    width: 50px;
    cursor: pointer;
}

.micActive {
    fill: green;
}

.micOff {
    fill: red;
}
</style>
