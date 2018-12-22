import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const BAT_KY = { "value": "batky", "text": "Bất kỳ" }

export default {
  name: 'search',
  components: { FontAwesomeIcon },
  data() {
    return {
      loading: true,
      search_cars: [],
      link: '',
      totalpages: 300,
      pagination: { currentPage: 0 },
      reviews_array: [],
      searchWord: '',
      no_cars: false,
      price: BAT_KY,
      brand: BAT_KY,
      color: BAT_KY,
      year: BAT_KY,
      prices: [
          {
              "value": "price<300",
              "text": ">300tr"
          },
          {
              "value": "price>300and price<600",
              "text": "300tr - 600tr"
          },
          {
              "value": "price>600and price<900",
              "text": "600tr - 900tr"
          },
          {
              "value": "price>900and price<1500",
              "text": "900tr - 1.5 tỷ"
          },
          {
              "value": "price>1500and price<3000",
              "text": "1.5 tỷ - 3 tỷ"
          },
          {
              "value": "price>3000and price<5000",
              "text": "3 tỷ - 5 tỷ"
          },
          {
              "value": "price>5000and price<7000",
              "text": "5 tỷ - 7 tỷ"
          },
          {
              "value": "price>7000and price<10000",
              "text": "7 tỷ - 10 tỷ"
          },
          {
              "value": "batky",
              "text": "Bất kỳ"
          }
      ],
      brands: [
          {
              "value": "Honda",
              "text": "Honda"
          },
          {
              "value": "Toyota",
              "text": "Toyota"
          },
          {
              "value": "Mazda",
              "text": "Mazda"
          },
          {
              "value": "Mercedes-Benz",
              "text": "Mercedes-Benz"
          },
          {
              "value": "Audi",
              "text": "Audi"
          },
          {
              "value": "Hyundai",
              "text": "Hyundai"
          },
          {
              "value": "Ford",
              "text": "Ford"
          },
          {
              "value": "KIA",
              "text": "KIA"
          },
          {
              "value": "BMW",
              "text": "BMW"
          },
          {
              "value": "Chervolet",
              "text": "Chervolet"
          },
          {
              "value": "batky",
              "text": "Bất kỳ"
          }
      ],
      colors: [
          {
              "value": "Đen",
              "text": "Đen"
          },
          {
              "value": "Trắng",
              "text": "Trắng"
          },
          {
              "value": "Bạc",
              "text": "Bạc"
          },
          {
              "value": "Đỏ",
              "text": "Đỏ"
          },
          {
              "value": "Xám",
              "text": "Xám"
          },
          {
              "value": "Vàng",
              "text": "Vàng"
          },
          {
              "value": "Xanh",
              "text": "Xanh"
          },
          {
              "value": "Nâu",
              "text": "Nâu"
          },
          {
              "value": "Cam",
              "text": "Cam"
          },
          {
              "value": "Tím",
              "text": "Tím"
          },
          {
              "value": "Hỗn hợp",
              "text": "Hỗn hợp"
          },
          {
              "value": "batky",
              "text": "Bất kỳ"
          }
      ],
      years: [
          {
              "value": "2016",
              "text": "2016"
          },
          {
              "value": "2015",
              "text": "2015"
          },
          {
              "value": "2014",
              "text": "2014"
          },
          {
              "value": "2013",
              "text": "2013"
          },
          {
              "value": "2012",
              "text": "2012"
          },
          {
              "value": "2011",
              "text": "2011"
          },
          {
              "value": "2010",
              "text": "2010"
          },
          {
              "value": "batky",
              "text": "Bất kỳ"
          }
      ],
    }
  },
  methods: {
    getAllCars: function () {
      this.loading = true;
      this.search_cars = []
      this.$http.get('https://timxengon.herokuapp.com/filter?page=' + this.pagination.currentPage)
        .then(response => {
          for (var i in response.data) {
          this.search_cars.push(response.data[i])
          }
          this.loading = false;
          this.totalpages = this.search_cars[0];
        }).catch((err) => {
          this.error = err.body.errors
        })
    },

    getReviewsLastest: function () {
      this.$http.get('https://timxengon.herokuapp.com/news/5')
        .then(response => {
          for (var i in response.data) {
          this.reviews_array.push(response.data[i])
          }
        }).catch((err) => {
          this.error = err.body.errors
        })
    },
    searchCars: function() {
      this.loading = true;
      this.search_cars = [];
      let url_search = 'https://timxengon.herokuapp.com/searchcar?keywords=' + this.searchWord + '&page=' + this.pagination.currentPage;
      let url_get_all = 'https://timxengon.herokuapp.com/filter?page=' + this.pagination.currentPage;
      const url = this.searchWord ? url_search : url_get_all;
      this.$http.get(url)
        .then(response => {
            for (var i in response.data) {
              this.search_cars.push(response.data[i])
            }
            this.search_cars.push(response.data[i])
            this.loading = false;
            this.totalpages = this.search_cars[0];
            this.no_cars = (this.totalpages !== 0) ? false : true;

        }).catch((err) => {
          this.error = err.body.errors
        })
    },
    selectKhoanTien: function(val) {
      this.price = val;
    },
    selectHangXe: function(val) {
      this.brand = val;
    },
    selectMauXe: function(val) {
      this.color = val;
    },
    selectDoiXe: function(val) {
      this.year = val;
    },
    filterXe: function() {
      this.search_cars = [];
      let query = "";
      if (this.price.value != 'batky') query += this.price.value;
      if (this.brand.value != 'batky') query += this.brand.value;
      if (this.color.value != 'batky') query += this.color.value;
      if (this.year.value != 'batky') query += this.year.value;
      console.log(query);
      let url = 'https://timxengon.herokuapp.com/filter?query=' + query + '&page=' + this.pagination.currentPage;
      this.$http.get(url)
        .then(response => {
            for (var i in response.data) {
              this.search_cars.push(response.data[i])
            }
            this.search_cars.push(response.data[i])
            this.loading = false;
            this.totalpages = this.search_cars[0];
            this.no_cars = (this.totalpages !== 0) ? false : true;

        }).catch((err) => {
          this.error = err.body.errors
        })

    }
  },
  created () {
    this.getAllCars();
    this.getReviewsLastest()
  }
}
