<template>
  <section class="long-txt">
    <p>
      {{ txtToShow }}
      <span
        v-if="txt.length > 100"
        class="read-more"
        @click="isShown = !isShown"
        >{{ btnTxt }}</span
      >
    </p>
  </section>
</template>

<script>
export default {
  props: {
    txt: String,
  },
  data() {
    return {
      isShown: false,
    };
  },
  computed: {
    txtToShow() {
      if (this.txt.length < 100) return this.txt;
      if (!this.isShown) return this.txt.slice(0, 100);
      else return this.txt;
    },
    btnTxt() {
      if (!this.isShown) return "...Read more";
      else return "Read less";
    },
  },
};
</script>
