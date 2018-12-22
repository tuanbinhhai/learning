import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Carousel from '@chenfengyuan/vue-carousel';

export default {
  name: 'detail',
  components: { FontAwesomeIcon, Carousel },

  data() {
    return {
      loading: true,
      car: {},
      seller: {},
      comments: []
    }
  },
  methods: {
    getDetailCar: function () {
      this.$http.get('https://timxengon.herokuapp.com/cars/' + this.$route.params.id)
        .then(response => {
          this.car = response.data.car;
          this.seller = response.data.seller;
          this.comments = response.data.comments;
          console.log(this.car);
          this.loading = false;
        }).catch((err) => {
          this.error = err.body
        })
    },

  },
  created () {
   this.getDetailCar();
  }
}
