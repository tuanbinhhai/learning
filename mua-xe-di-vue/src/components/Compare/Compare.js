
export default {
  name: 'comparecar',
  data() {
    return {
      loading: true,
      error: false,
      error2: false,
      compare: false,
      noncompare:false,

      addcar1: false,
      addcar2: false,
      addcar3: false,

      currentcar1: true,
      currentcar2: true,
      currentcar3: true,

      carId1: null,
      carId2: null,
      carId3: null,
      compare1: true,
      compare2: true,
      compare3: true,
      seller1: {},
      seller2: {},
      seller3: {},
      carInfo1: {},
      carInfo2: {},
      carInfo3: {},
      carBetter: {},
      image1:'',
      image2:'',
      image3:'',

      recommendCar_first: [],
      recommendCar_second: [],
      recommendCar_third: [],
      check_recommendCar_second: false,
      check_recommendCar_third: false,

      showSeller1: false,
      showSeller2: false,
      showSeller3: false,

      better: false,
    }
  },
  methods: {
  // FORMART PRICE AND DATE FUNCTION
  priceFormat: function(price) {
    return new Intl.NumberFormat('vi-VI').format(price)
  },
  dateCreateFormat: function(date) {
    var date = new Date(date);
    if (!isNaN(date.getTime())) {
      var day = date.getDate().toString();
      var month = (date.getMonth() + 1).toString();
      return (day[1] ? day : '0' + day[0]) + '/' +
        (month[1] ? month : '0' + month[0]) + '/' +
        date.getFullYear();
    }
  },

// GET CAR INFO
  getCarInfo: function () {
    if (this.carId1 !== null && this.carId2 === null && this.carId3 === null) {
      this.$http.get('https://timxengon.herokuapp.com/cars/' + this.carId1)
        .then(response => {
          this.seller1 = response.data.seller
          this.carInfo1 = response.data.car
          this.image1 = this.carInfo1.image[0]
        }).catch((err) => {})
      this.compare2 = false
      this.compare3 = false
      this.error2 = true
      this.error = false
    }
    else if (this.carId1 !== null && this.carId2 !== null && this.carId3 === null) {
      this.$http.get('https://timxengon.herokuapp.com/cars/' + this.carId1)
        .then(response => {
          this.seller1 = response.data.seller
          this.carInfo1 = response.data.car
          this.image1 = this.carInfo1.image[0]
        }).catch((err) => {})
      this.$http.get('https://timxengon.herokuapp.com/cars/' + this.carId2)
        .then(response => {
          this.seller2 = response.data.seller
          this.carInfo2 = response.data.car
          this.image2 = this.carInfo2.image[0]
        }).catch((err) => {})
      this.compare3 = false
    }
    else if (this.carId1 !== null && this.carId2 !== null && this.carId3 !== null) {
      this.$http.get('https://timxengon.herokuapp.com/cars/' + this.carId1)
        .then(response => {
          this.seller1 = response.data.seller
          this.carInfo1 = response.data.car
          this.image1 = this.carInfo1.image[0]
        }).catch((err) => {})
      this.$http.get('https://timxengon.herokuapp.com/cars/' + this.carId2)
        .then(response => {
          this.seller2 = response.data.seller
          this.carInfo2 = response.data.car
          this.image2 = this.carInfo2.image[0]
        }).catch((err) => {})
      this.$http.get('https://timxengon.herokuapp.com/cars/' + this.carId3)
        .then(response => {
          this.seller3 = response.data.seller
          this.carInfo3 = response.data.car
          this.image3 = this.carInfo3.image[0]
        }).catch((err) => {})
        this.compare1 = true
        this.compare2 = true
        this.compare3 = true
    }
    else if (this.carId1 === null && this.carId2 !== null && this.carId3 !== null) {
      this.$http.get('https://timxengon.herokuapp.com/cars/' + this.carId2)
        .then(response => {
          this.seller2 = response.data.seller
          this.carInfo2 = response.data.car
          this.image2 = this.carInfo2.image[0]
        }).catch((err) => {})
      this.$http.get('https://timxengon.herokuapp.com/cars/' + this.carId3)
        .then(response => {
          this.seller3 = response.data.seller
          this.carInfo3 = response.data.car
          this.image3 = this.carInfo3.image[0]
        }).catch((err) => {})
      this.compare1 = false
    }
    else if (this.carId1 === null && this.carId2 === null && this.carId3 !== null) {
      this.$http.get('https://timxengon.herokuapp.com/cars/' + this.carId3)
        .then(response => {
          this.seller3 = response.data.seller
          this.carInfo3 = response.data.car
          this.image3 = this.carInfo3.image[0]
        }).catch((err) => {})
      this.compare1 = false
      this.compare2 = false
      this.error2 = true
      this.error = false
    }
    else if (this.carId1 !== null && this.carId2 === null && this.carId3 !== null) {
      this.$http.get('https://timxengon.herokuapp.com/cars/' + this.carId1)
        .then(response => {
          this.seller1 = response.data.seller
          this.carInfo1 = response.data.car
          this.image1 = this.carInfo1.image[0]
        }).catch((err) => {})
      this.$http.get('https://timxengon.herokuapp.com/cars/' + this.carId3)
        .then(response => {
          this.seller3 = response.data.seller
          this.carInfo3 = response.data.car
          this.image3 = this.carInfo3.image[0]
        }).catch((err) => {})
      this.compare2 = false
    }
    else if (this.carId1 === null && this.carId2 !== null && this.carId3 === null) {
      this.$http.get('https://timxengon.herokuapp.com/cars/' + this.carId2)
        .then(response => {
          this.seller2 = response.data.seller
          this.carInfo2 = response.data.car
          this.image2 = this.carInfo2.image[0]
        }).catch((err) => {})
      this.compare1 = false
      this.compare3 = false
      this.error2 = true
      this.error = false
    }
    else if (this.carId1 === null && this.carId2 === null && this.carId3 === null) {
      this.compare1 = false
      this.compare2 = false
      this.compare3 = false
      this.error=true
      this.error2=false
    }
    this.loading=false
  },
  compareCar: function () {
      this.$http.get('https://timxengon.herokuapp.com/cars/compare/' + '['+this.carId1+','+this.carId2+','+this.carId3+']')
        .then(response => {
          this.carBetter = response.data
          if (this.carBetter.power === null){
            this.carBetter.power = 0
          }
          if (this.carBetter.torque === null){
            this.carBetter.torque = 0
          }
          if (this.carBetter.tank_capacity === null){
            this.carBetter.tank_capacity = 0
          }
          if (this.carBetter.fuel_consumption === null){
            this.carBetter.fuel_consumption = 0
          }
          if (this.carBetter.kilometerage === null){
            this.carBetter.kilometerage = 0
          }
          this.better=true
          this.loading=false
        }).catch((err) => {})
  },
  compareornot: function () {
    if (this.carId1 === null && this.carId2 === null && this.carId3 === null) {
      this.noncompare = true
      this.compare = false
      this.getCarInfo()
    }
    else if (this.carId1 !== null && this.carId2 === null && this.carId3 === null) {
      this.noncompare = true
      this.compare = false
      this.getCarInfo()
    }
    else if (this.carId1 === null && this.carId2 !== null && this.carId3 === null) {
      this.noncompare = true
      this.compare = false
      this.getCarInfo()
    }
    else if (this.carId1 === null && this.carId2 === null && this.carId3 !== null) {
      this.noncompare = true
      this.compare = false
      this.getCarInfo()
    }
    else {
      this.noncompare = false
      this.compare = true
      this.getCarInfo()
      this.compareCar()
   }
  },
  checkcurrentcar: function () {
    if (this.carId1 === null){
      this.currentcar1 = false
      this.addcar1 = true
    }
    if (this.carId2 === null){
      this.currentcar2 = false
      this.addcar2 = true
    }
    if (this.carId3 === null){
      this.currentcar3 = false
      this.addcar3 = true
    }
  },
  removeCar3: function () {
    this.currentcar3 = false
    this.addcar3 = true
    this.compare3=false
    sessionStorage.removeItem("compareCar3")
    this.carId3 = null
    this.compareornot()
    // this.getRecommendCar()
  },
  removeCar2: function () {
    this.currentcar2 = false
    this.addcar2 = true
    this.compare2=false
    sessionStorage.removeItem("compareCar2")
    this.carId2 = null
    this.compareornot()
    // this.getRecommendCar()
  },
  removeCar1: function () {
    this.currentcar1 = false
    this.addcar1 = true
    this.compare1=false
    sessionStorage.removeItem("compareCar1")
    this.carId1 = null
    this.compareornot()
    // this.getRecommendCar()
  },
  cancelModal: function() {
    this.showSeller1 = false
    this.showSeller2 = false
    this.showSeller3 = false
  }
},
mounted() {
  // this.getRecommendCar()
},
created() {
  this.carId1 = sessionStorage.getItem("compareCar1")
  this.carId2 = sessionStorage.getItem("compareCar2")
  this.carId3 = sessionStorage.getItem("compareCar3")
  this.compareornot()
  this.checkcurrentcar()
  }
}
