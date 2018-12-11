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
      money: BAT_KY,
      car_maker: BAT_KY,
      car_color: BAT_KY,
      doi_xe: BAT_KY,
      moneys: [
          {
              "value": "3",
              "text": ">300tr"
          },
          {
              "value": "3-6",
              "text": "300tr - 600tr"
          },
          {
              "value": "6-9",
              "text": "600tr - 900tr"
          },
          {
              "value": "9-15",
              "text": "900tr - 1.5 tỷ"
          },
          {
              "value": "15-30",
              "text": "1.5 tỷ - 3 tỷ"
          },
          {
              "value": "30-50",
              "text": "3 tỷ - 5 tỷ"
          },
          {
              "value": "50-70",
              "text": "5 tỷ - 7 tỷ"
          },
          {
              "value": "70-100",
              "text": "7 tỷ - 10 tỷ"
          },
          {
              "value": "batky",
              "text": "Bất kỳ"
          }
      ],
      car_makers: [
          {
              "value": "honda",
              "text": "Honda"
          },
          {
              "value": "toyota",
              "text": "Toyota"
          },
          {
              "value": "mazda",
              "text": "Mazda"
          },
          {
              "value": "mercedes-benz",
              "text": "Mercedes-Benz"
          },
          {
              "value": "audi",
              "text": "Audi"
          },
          {
              "value": "hyundai",
              "text": "Hyundai"
          },
          {
              "value": "ford",
              "text": "Ford"
          },
          {
              "value": "kia",
              "text": "KIA"
          },
          {
              "value": "50-70",
              "text": "BMW"
          },
          {
              "value": "70-100",
              "text": "Chervolet"
          },
          {
              "value": "batky",
              "text": "Bất kỳ"
          }
      ],
      car_colors: [
          {
              "value": "black",
              "text": "Đen"
          },
          {
              "value": "white",
              "text": "Trắng"
          },
          {
              "value": "silver",
              "text": "Bạc"
          },
          {
              "value": "red",
              "text": "Đỏ"
          },
          {
              "value": "gray",
              "text": "Xám"
          },
          {
              "value": "yellow",
              "text": "Vàng"
          },
          {
              "value": "green",
              "text": "Xanh"
          },
          {
              "value": "brown",
              "text": "Nâu"
          },
          {
              "value": "cam",
              "text": "Cam"
          },
          {
              "value": "tim",
              "text": "Tím"
          },
          {
              "value": "hon_hop",
              "text": "Hỗn hợp"
          },
          {
              "value": "batky",
              "text": "Bất kỳ"
          }
      ],
      car_lives: [
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
      this.money = val;
    },
    selectHangXe: function(val) {
      this.car_maker = val;
    },
    selectMauXe: function(val) {
      this.car_color = val;
    },
    selectDoiXe: function(val) {
      this.doi_xe = val;
    }
  },
  created () {
    this.getAllCars();
    this.getReviewsLastest()
  }
}
