<template>
  <section class="book-filter">
    <form>
      <el-input
        @input="filter"
        v-model="filterBy.byName"
        type="text"
        placeholder="Search"
        class="input"
      />
      <el-input
        @input="filter"
        v-model.number="filterBy.fromPrice"
        type="number"
        min="0"
        placeholder="Min price"
        class="input"
      />
      <el-input
        @input="filter"
        v-model.number="filterBy.toPrice"
        type="number"
        min="0"
        placeholder="Max price"
        class="input"
      />
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        byName: "",
        fromPrice: -Infinity,
        toPrice: Infinity,
      },
    };
  },
  methods: {
    filter() {
      this.$emit("filtered", JSON.parse(JSON.stringify(this.filterBy)));
    },
  },
};
</script>
