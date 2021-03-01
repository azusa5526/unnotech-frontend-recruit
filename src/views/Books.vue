<template>
  <div class="books">
    <div class="container" :class="{ adjustMargin: detail }">
      <div class="row g-0">
        <div class="intro col-12 d-flex justify-content-center align-items-center bg-dark mb-6">
          <h1
            class="fs-2 w-100 text-center text-light fw-light border-2 border-bottom border-primary"
          >
            BOOK STORE BACK END
          </h1>
        </div>
      </div>
      <div class="row">
        <div
          class="col-12 col-md-6 col-lg-4 cardHover mb-6 wow animate__animated animate__fadeInUp"
          data-wow-duration=".5s"
          v-for="book in books"
          :key="book.id"
        >
          <a @click.prevent="showDetail(book.id)">
            <div class="card" :class="{ 'border-bottom-0': selectedBookId === book.id }">
              <img :src="book.image" class="card-img-top card-image p-4 p-md-6" alt="" />
              <div
                class="card-body transition"
                :class="{
                  'bg-primary border-2 border-top border-secondary': book.id === selectedBookId
                }"
              >
                <h5 class="card-title row-limit-1 transition mb-0">
                  {{ book.name }}
                </h5>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>

    <router-view :detail="detail" @hideDetail="changeDetail" />
  </div>
</template>

<script>
export default {
  name: 'books',
  components: {},

  data() {
    return {
      books: [],
      detail: false,
      selectedBookId: ''
    };
  },

  methods: {
    getAllBooks() {
      const api = `${process.env.VUE_APP_UNNOTECH_API}/books`;
      this.$http.get(api).then((response) => {
        this.books = response.data;
      });
    },

    showDetail(bookId) {
      this.selectedBookId = bookId;
      this.detail = true;
      this.$router.push(`/books/${bookId}`).catch((err) => err);
    },

    changeDetail() {
      this.detail = !this.detail;
    }
  },

  created() {
    this.getAllBooks();
  }
};
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 8%, 0);
    transform: translate3d(0, 8%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
.animate__fadeInUp {
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp;
}
</style>
