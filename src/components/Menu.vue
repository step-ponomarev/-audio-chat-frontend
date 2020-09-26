<template>

        <div>
             <div class="menu" :class="isShowed">

         <slot>
             </slot>
                 </div>
    </div>


</template>

<script>
export default {
  name: "Menu",
  props: {
    showed: {
      Type: Boolean
    }
  },
  methods: {},
  computed: {
    isShowed() {
      return {
        "showed": this.showed,
        "hidden": !this.showed
      }
    }
  }
}
</script>

<style scoped>
    .menu {
    }

    .showed {
        animation-name: bounceOutRight;
        animation-duration: 200ms;
    }

    @keyframes bounceOutRight {
        0% {
            transform: translateX(-200%);
        }

        100% {
            transform: translateX(0);
        }
    }
</style>
