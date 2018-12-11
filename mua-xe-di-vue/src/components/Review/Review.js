export default {
  name: 'review',
  data() {
    return {
      loading: true,
      reviews_array: [],
      link: '',
      totalpages: 300,
      pagination: { currentPage: 1 }
    }
  },
  methods: {
    pageChanged: function () {
      this.loading=true
      this.reviews_array = []
      this.$http.get('https://timxengon.herokuapp.com/news/' + this.pagination.currentPage)
        .then(response => {
          for (var i in response.data) {
          this.reviews_array.push(response.data[i])
          }
          this.loading = false
        }).catch((err) => {
          this.error = err.body.errors
        })
    },
  },
  created () {
    this.pageChanged()
  }
}
