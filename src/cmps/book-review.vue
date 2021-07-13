<template>
  <section class="book-review">
    <form class="form-review">
      <el-input
        v-model="review.name"
        type="text"
        placeholder="Full Name"
      ></el-input>

      <el-input
        type="textarea"
        :rows="2"
        placeholder="Free text"
        v-model="review.txt"
      >
      </el-input>

      <el-date-picker
        type="date"
        v-model="review.readAt"
        placeholder="Pick a day"
        format="dd/MM/yyyy"
        value-format="dd/MM/yyyy"
      >
        >
      </el-date-picker>

      <el-rate v-model="review.rate" />

      <el-button @click="saveReview" type="warning" plain
        >Save Review</el-button
      >
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      review: {
        name: "Books Reader",
        readAt: new Date(),
        txt: "",
        rate: null,
      },
    };
  },
  methods: {
    saveReview() {
      this.$emit("addReview", this.review);
    },
  },
};
</script>

