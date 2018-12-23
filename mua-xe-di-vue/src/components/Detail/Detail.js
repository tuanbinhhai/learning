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
      comments: [],
      isCompare: false
    }
  },
  methods: {
    getDetailCar: function () {
      this.$http.get('https://timxengon.herokuapp.com/cars/' + this.$route.params.id)
        .then(response => {
          this.car = response.data.car;
          this.seller = response.data.seller;
          this.comments = response.data.comments;
          this.loading = false;
        }).catch((err) => {
          this.error = err.body
        })
    },
    isChooseCompare: function() {
      var compareCar1 = sessionStorage.getItem("compareCar1")
      var compareCar2 = sessionStorage.getItem("compareCar2")
      var compareCar3 = sessionStorage.getItem("compareCar3")
      if (compareCar1 == this.$route.params.id || compareCar2 == this.$route.params.id || compareCar3 == this.$route.params.id) {
        this.isCompare = true
      }
      else this.isCompare = false
    },
    isCompareFunc: function() {
      var compareCar1 = sessionStorage.getItem("compareCar1")
      var compareCar2 = sessionStorage.getItem("compareCar2")
      var compareCar3 = sessionStorage.getItem("compareCar3")
      if (!this.isCompare) {
        if (compareCar1 !== null && compareCar2 !== null && compareCar3 !== null) {
          this.errorCompare = true
        }
        else if (compareCar1 == null) {
          sessionStorage.setItem("compareCar1", this.$route.params.id)
          this.isCompare = true
        } else if (compareCar2 == null) {
          sessionStorage.setItem("compareCar2", this.$route.params.id)
          this.isCompare = true
        } else if (compareCar3 == null) {
          sessionStorage.setItem("compareCar3", this.$route.params.id)
          this.isCompare = true
        }
      } else {
        if (compareCar1 == this.$route.params.id) {
          sessionStorage.removeItem("compareCar1")
          this.isCompare = false
        } else if (compareCar2 == this.$route.params.id) {
          sessionStorage.removeItem("compareCar2")
          this.isCompare = false
        } else if (compareCar3 == this.$route.params.id) {
          sessionStorage.removeItem("compareCar3")
          this.isCompare = false
        }
      }
    }
  },
  mounted() {
    this.isChooseCompare()
  },
  watch: {
    '$route' (to, from) {
      this.isChooseCompare()
    }
  },
  created () {
   this.getDetailCar();
  }
}
