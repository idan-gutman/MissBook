<template>
  <section class="book-list">
    <div v-for="book in books" :key="book.id">
      <router-link :to="`/book/${book.id}`">
        <book-preview :book="book" />
      </router-link>
    </div>
  </section>
</template>

<script>
import bookPreview from "../cmps/book-preview.vue";
export default {
  components: {
    bookPreview,
  },
  props: {
    books: Array,
  },
};
</script>
