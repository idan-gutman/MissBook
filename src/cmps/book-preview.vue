<template>
  <section class="book-preview">
    <div class="book-content">
      <img class="img-preview" :src="book.thumbnail" />
        <p>{{ book.title }}</p>
        <p>{{ book.listPrice.amount + currency }}</p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    book: Object,
  },
  computed: {
    currency() {
      return this.book.listPrice.currencyCode === "ILS"
        ? " ₪"
        : this.book.listPrice.currencyCode === "USD"
        ? " $"
        : " €";
    },
  },
};
</script>
