<template>
  <div
    class="bookDetail w-100"
    :style="{ '--bookDetailHeight': bookDetailHeight }"
    :class="{ hideDetail: !detail }"
  >
    <loading :active.sync="isLoading" />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="card border-top-0">
            <div class="card-header px-4 bg-dark d-flex justify-content-between">
              <h5 class="text-light fw-light align-self-center mb-0">{{ book.name }}</h5>
              <button class="btn btn-primary ms-2" @click="hideDetail()">
                <i class="fas fa-arrow-down"></i>
              </button>
            </div>
            <div
              class="card-body px-4 d-flex flex-wrap justify-content-between border-3 border-top border-primary"
            >
              <div class="d-flex flex-wrap">
                <div class="price d-flex me-0 me-md-8 mb-3 mb-md-0">
                  <span class="me-4 mb-0 align-self-center">價格</span>
                  <button class="btn btn-secondary" @click="attributeMinus('price')">-</button>
                  <input class="form-control" v-model="bookProfile.price" type="text" />
                  <button class="btn btn-secondary" @click="attributePlus('price')">+</button>
                </div>
                <div class="quantity d-flex me-0 me-md-auto mb-3 mb-md-0">
                  <span class="me-4 mb-0 align-self-center">數量</span>
                  <button class="btn btn-secondary" @click="attributeMinus('count')">-</button>
                  <input class="form-control" v-model="bookProfile.count" type="text" />
                  <button class="btn btn-secondary" @click="attributePlus('count')">+</button>
                </div>
              </div>

              <button @click="updateDetail()" class="btn btn-secondary">確認送出</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['detail'],
  name: 'BookDetail',
  components: {},

  data() {
    return {
      bookDetailHeight: '',
      isLoading: false,
      bookId: '',
      book: {
        id: Number,
        name: String,
        image: String
      },
      bookProfile: {
        id: Number,
        price: Number,
        count: Number
      }
    };
  },

  methods: {
    getBook() {
      const api = `${process.env.VUE_APP_UNNOTECH_API}/books/${this.bookId}`;
      this.$http.get(api).then((response) => {
        this.book = response.data;
      });
      console.log('this book is', this.book);
    },

    getBookDetail() {
      const api = `${process.env.VUE_APP_UNNOTECH_API}/profile/${this.bookId}`;
      this.$http.get(api).then((response) => {
        this.bookProfile = response.data;
      });
    },

    updateDetail() {
      if (this.bookProfile.price < 0 || this.bookProfile.count < 0) {
        console.log('你是想送人書，還是發錢麼!!?');
      } else if (isNaN(this.bookProfile.price) || isNaN(this.bookProfile.count)) {
        console.log('請勿輸入非數字格式');
      } else {
        const api = `${process.env.VUE_APP_UNNOTECH_API}/profile/${this.bookId}`;
        this.isLoading = true;
        this.$http
          .patch(api, { price: this.bookProfile.price, count: this.bookProfile.count })
          .then((response) => {
            this.getBookDetail();
            this.isLoading = false;
          });
      }
    },

    attributePlus(attribute) {
      this.bookProfile[attribute]++;
    },

    attributeMinus(attribute) {
      if (this.bookProfile[attribute] > 0) {
        this.bookProfile[attribute]--;
      } else {
        console.log('你是想送人書，還是發錢麼!!?');
      }
    },

    resizeHandler() {
      this.bookDetailHeight =
        document.querySelector('.bookDetail').getBoundingClientRect().height + 25;
      this.bookDetailHeight = `${this.bookDetailHeight}px`;
    },

    hideDetail() {
      this.$emit('hideDetail');
    }
  },

  watch: {
    $route(to, from) {
      this.bookId = this.$route.params.bookId;
      this.getBook();
    },

    bookId(to, from) {
      this.getBookDetail();
    }
  },

  created() {
    this.bookId = this.$route.params.bookId;
    this.getBook();
  },

  beforeMount() {
    window.addEventListener('resize', this.resizeHandler);
  },

  mounted() {
    this.resizeHandler();
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
  }
};
</script>

<style lang="scss" scoped>
.hideDetail {
  transform: translate(0px, var(--bookDetailHeight));
  transition: all 0.2s ease-in-out;
}
</style>
