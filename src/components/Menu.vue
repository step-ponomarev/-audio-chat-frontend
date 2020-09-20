<template>
    <div class="menu" :class="isShowed">
        askasl
        <slot>

        </slot>
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
  methods: {
    hideMenu() {

    }
  }
  ,
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
        position: absolute;
        width: 20%;
        height: 20%;
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

    /*.hidden {*/
    /*    animation-name: bounceOutLeft;*/
    /*    animation-duration: 200ms;*/
    /*}*/

    /*@keyframes bounceOutRight {*/
    /*    0% {*/
    /*        transform: translateX(0);*/
    /*    }*/

    /*    100% {*/
    /*        transform: translateX(-100%);*/
    /*    }*/
    /*}*/
</style>
