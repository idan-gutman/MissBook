<template>
  <section v-if="book" class="book-details app-main">
    <div class="details-content flex justify-center">
      <div class="img-details">
        <img class="book-img-details" :src="book.thumbnail" />
        <img class="sale-img" v-if="book.listPrice.isOnSale" src="@/assets/imgs/sale.png">
      </div>
      <div class="info-details">
        <h2>{{ book.title }}</h2>
        <p><span>Subtitle: </span>{{ book.subtitle }}</p>
        <p v-for="author in book.authors" :key="author">
          <span>Author: </span> {{ author }}
        </p>
        <p>
          <span>Categories: </span>
          <span
            class="categories"
            v-for="categorie in book.categories"
            :key="categorie"
            >{{ categorie }}</span
          >
        </p>
        <p>
          <span>Published Date:</span> {{ book.publishedDate + publishedDate }}
        </p>

        <p><span>PageCount: </span> {{ pageCount }}</p>
        <p>
          <span> Price:</span>
          <span :class="priceColor">{{
            book.listPrice.amount + currency
          }}</span>
        </p>
       
        <p><span> description:</span> <long-text :txt="book.description" /></p>
      </div>
    </div>
    <div class="btns-details flex">
      <router-link class="back" to="/book">
        <el-button type="info" plain>Back</el-button>
      </router-link>
      <el-button
        class="btn-add-review"
        @click="isShown = !isShown"
        type="primary"
        plain
        >{{ btnReview }}</el-button
      >
      <router-link class="remove-book-btn" to="/book">
        <el-button
          icon="el-icon-delete"
          @click="removeBook(book.id)"
          type="danger"
          plain
          >remove</el-button
        >
      </router-link>
    </div>
    <book-review v-if="isShown" @addReview="saveReview" />

    <div v-if="book.reviews.length" class="reviews">
      <div class="review" v-for="(review, idx) in book.reviews" :key="idx">
        <el-button
          @click="deleteReview(idx)"
          class="delete-btn"
          type="danger"
          icon="el-icon-delete"
          circle
        ></el-button>
        <p><span>Name: </span>{{ review.name }}</p>
        <p><span>Rate: </span>{{ review.rate }}</p>
        <p><span>Read at: </span>{{ review.readAt }}</p>
        <p><span>Review: </span>{{ review.txt }}</p>
      </div>
    </div>
  </section>
  <section v-else class="loading">Loading</section>
</template>

<script>
import LongText from "../cmps/long-text.vue";
import bookReview from "../cmps/book-review.vue";
import bookService from "../services/book.service.js";
import { eventBus } from "../services/event-bus-service";

export default {
  components: {
    LongText,
    bookReview,
  },
  data() {
    return {
      book: null,
      isShown: false,
    };
  },
  created() {
    this.loadBookById();
  },
  methods: {
    async loadBookById() {
      const { id } = this.$route.params;
      this.book = await bookService.get(id);
    },
    async saveReview(review) {
      await bookService.addReview(this.book.id, review);
      this.showMsg("Saved Successfuly", "success");
      this.isShown = false;
      this.loadBookById();
    },
    async deleteReview(idx) {
      const { id } = this.$route.params;
      await bookService.removeReview(id, idx);
      this.showMsg("Removed Successfuly", "success");
      this.loadBookById();
    },
    showMsg(txt, className) {
      const msg = {
        txt,
        class: className,
      };
      eventBus.$emit("show-msg", msg);
    },

    async removeBook(bookId) {
      await this.$store.dispatch({ type: "removeBook", bookId });
    },
  },
  computed: {
    pageCount() {
      if (this.book.pageCount >= 500) return "Long Reading";
      if (this.book.pageCount >= 200) return "Decent Reading";
      if (this.book.pageCount <= 100) return "Light Reading";
      else return this.book.pageCount + " Pages";
    },
    publishedDate() {
      const date = new Date().getFullYear();
      return date - this.book.publishedDate > 10
        ? ", Veteran Book"
        : date - this.book.publishedDate < 1
        ? ", New!"
        : ", Modern";
    },
    priceColor() {
      if (this.book.listPrice.amount > 100) return "red";
      if (this.book.listPrice.amount < 80) return "green";
    },
    currency() {
      return this.book.listPrice.currencyCode === "ILS"
        ? " ₪"
        : this.book.listPrice.currencyCode === "USD"
        ? " $"
        : " €";
    },
    btnReview() {
      if (!this.isShown) return "Add review";
      else return "Close review";
    },
  },
};
</script>

