<template>
  <section class="book-app app-main">
    <book-filter @filtered="setFilter" />
    <book-list :books="booksToShow" />
  </section>
</template>

<script>
import bookList from "@/cmps/book-list";
import bookFilter from "@/cmps/book-filter";
export default {
  components: {
    bookList,
    bookFilter,
  },
  data() {
    return {
      books: null
    };
  },
  created() {
    this.loadBooks();
  },
  methods: {
    async loadBooks() {
      this.$store.dispatch({ type: "loadBooks" });
    },
    setFilter(filterBy) {
      this.$store.commit({ type: "setFilter", filterBy });
    },
  },
  computed: {
    booksToShow(){
      return this.$store.getters.booksToShow
    }
  },
};
</script>