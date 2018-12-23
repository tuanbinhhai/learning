import auth from '../../auth/'
import router from '../../router/'
import _ from 'lodash'
// import JsonContent from '../../assets/styles/sellJSON'
export default {
  name: 'sellcar',
  props: {
    draftCarID: {}
  },
  data() {
    return {
      // JsonContent: JsonContent,
      cardraftID:'',
      pricecar: '',
      // checkAuth: auth.user.authenticated,
      isStep1: true,
      isStep2: false,
      isStep3: false,
      isStep4: false,

      istimePush1: false,
      istimePush3: false,
      istimePush7: false,

      isPushfirst: false,

      ischeckTechnical: false,
      isreviewPost: false,
      issigntoSell: false,

      carinfo: {
        seller: {
          id: '',
          authentoken: '',
          username: ''
        },
        car: {
          brand: '',
          model: '',
          year: '',
          version: '',
          price: ' ',
          description: ' ',
          image: [],
          address: '',
          origin: '',
          type_of_chassi: '',
          kilometerage: 0,
          color: '',
          number_of_doors: '',
          number_of_seats: '',
          fuel_consumption: '',
          fuel_type: '',
          power: '',
          torque: '',
          tank_capacity: '',
          transmission_type: '',
          drive_type: '',
          type_of_four_wheel_drive: '',
          length: '',
          width: '',
          height: '',
          draff: false
        },
      },
      savedraft: false,
      showSaveDraft: false,
      //EDIT DRAFT CAR
      draftCarPrice: '',
      //STEP 2 Price
      carId: 0,
      minPrice: '',
      maxPrice: '',
      carDescription: '',
      showPriceRange: false,
      showMaxPrice: false,
      showDifferentPriceError: false,
      showDifferentDraft: false,
      showSaveDraft: false,
      postDifferentPriceCar: false,
      recommendPrice: '',
      errorDesMsg: 'Vui lòng nhập ít nhất 24 kí tự để miêu tả về xe',
      showErrorDes: false,
      errorPriceMsg: 'Vui lòng nhập giá xe',
      showErrorPrice: false,
      //STEP 1
      carBrands_array: [],
      carBrand: 'Chọn hãng xe',
      isActiveBrand: -1,
      showErrorBrand: false,
      errorBrandMsg: "Vui lòng chọn hãng xe",
      carModels_array: [],
      carModel: 'Chọn model xe',
      isActiveModel: -1,
      showErrorModel: false,
      errorModelMsg: "Vui lòng chọn model xe",
      carYear_array: [],
      showCarModel: false,
      carYear: 'Chọn năm',
      showErrorYear: false,
      errorYearMsg: "Vui lòng chọn năm sản xuất xe",
      isActiveYear: -1,
      showCarYear: false,
      kilometerage: "",
      showErrorKM: false,
      errorKMMsg: "Vui lòng nhập số KM đã đi được",
      carOrigins_array: ['Trong nước', 'Nhập khẩu'],
      carOrigin: '',
      isActiveOrigin: -1,
      showErrorOrigin: false,
      errorOriginMsg: "Vui lòng chọn xuất xứ xe",
      carAddresses_array: ['Đà Nẵng', 'Hà Nội', 'TP Hồ Chí Minh', 'Khác'],
      carAddress: 'Chọn nơi bán',
      isActiveAddress: -1,
      showErrorAddress: false,
      errorAddressMsg: "Vui lòng chọn nơi bán xe",
      carColor: '',
      carColors_array: ['Đen', 'Kem', 'Xanh dương', 'Nâu', 'Vàng kim', 'Xanh lá', 'Cam', 'Tím/Hồng', 'Đỏ', 'Trắng', 'Vàng', 'Bạc/Xám', 'Hỗn hợp'],
      color_array: [{
          'background-color': '#000000',
        }, {
          'background-color': '#F5F5DC'
        }, {
          'background-color': '#0000FF'
        }, {
          'background-color': '#A52A2A'
        }, {
          'background-color': '#FFD700'
        }, {
          'background-color': '#008000'
        }, {
          'background-color': '#FFA500'
        }, {
          'background-color': '#B200B2'
        }, {
          'background-color': '#FF0000'
        }, {
          'background-color': '#FFFFFF'
        }, {
          'background-color': '#FFFF00'
        }, {
          'background-color': '#C0C0C0'
        },
        {
          'background': '#ffffff',
          'background': '-webkit-linear-gradient(left, red , orange, yellow, green, blue, violet, pink)',
          'background': '-o-linear-gradient(right, red , orange, yellow, green, blue, violet, pink)',
          'background': '-moz-linear-gradient(right, red , orange, yellow, green, blue, violet, pink)',
          'background': 'linear-gradient(to right, red , orange, yellow, green, blue, violet, pink)'
        }
      ],
      isActiveColor: -1,
      showErrorColor: false,
      errorColorMsg: "Vui lòng chọn màu xe",
      //IMG CAR
      croppa: {},
      showModal: false,
      showSaveButton: false,
      carImg_array: [],
      showErrorImage: false,
      errorImageMsg: "Vui lòng tải ít nhất 1 ảnh về xe",
      carImgCropped: '',
      outSizeErrorMsg: '',
      outSizeImage: false,
      TypeMismatchErrorMsg: '',
      ImageTypeMismatch: false,
      detectImageUrl: '',
      showErrorNonCar: false,
      errorNonCarImageMsg: "Bạn chỉ nên tải những ảnh có liên quan về xe để bán xe dễ dàng hơn. Vui lòng chọn ảnh khác nhé!",
      showContinueUploadImage: true,
      showLoadingUploadImage: false,
      //Validate
      locale: 'vi',
      //END CROP
      cloudinary: {
        uploadPreset: 'nfjfiw6r',
        apiKey: '343724591318769',
        cloudName: 'muaxedi'
      },
    }
  },
  computed: {
    clUrl: function() {
      return `https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/upload`
    },
  },
  methods: {
    //INPUT FILTER
    onFileTypeMismatch(file) {
      this.ImageTypeMismatch = true
      this.TypeMismatchErrorMsg = 'File có định dạng không hợp lệ. Vui lòng chỉ chọn file ảnh'
    },
    onFileSizeExceed(file) {
      this.outSizeImage = true
      this.outSizeErrorMsg = 'Kích thước file quá lớn, vui lòng chọn file có kích thước nhỏ hơn 5MB'
    },
    //CROP IMG
    onNewImage() {
      this.showSaveButton = true
      this.outSizeImage = false
      this.ImageTypeMismatch = false
    },
    cropAndSave: _.debounce(function() {
      this.carImg_array.push(this.carImgCropped)
      this.showModal = false
      this.showSaveButton = false
      this.uploadServerImage()
      this.showContinueUploadImage = false
      this.showLoadingUploadImage = true
      if (this.carImg_array.length >= 1)
        this.showErrorImage = false
    }, 200),
    cancelModal: function() {
      this.showModal = false
      this.showSaveButton = false
      this.ImageTypeMismatch = false
      this.outSizeImage = false
    },
    removeImageModal: function() {
      this.showSaveButton = false
      this.outSizeImage = false
      this.ImageTypeMismatch = false
    },
    removeImageArray: function(index) {
      if (!this.showLoadingUploadImage) {
        this.carImg_array.splice(index, 1)
        if (this.carImg_array.length == 0) {
          this.showErrorNonCar = false
          this.showContinueUploadImage = true
        }
        else {
          if(this.showErrorNonCar) {
            for(var index in this.carImg_array) {
                if(this.carImgCropped === this.carImg_array[index]) {
                  this.showErrorNonCar = true
                  this.showContinueUploadImage = false
                }
                else {
                  this.showErrorNonCar = false
                  this.showContinueUploadImage = true
                }
            }
          }
        }
      }
    },
    //UP TO SERVER
    uploadImage: function() {
      var uploadImage = new Promise(async(resolve, reject) => {
          var upload_length = this.carImg_array.length
          this.carinfo.car.image = []
          for (var index = 0; index < upload_length; index++) {
            var formData = new FormData()
            formData.append('file', this.carImg_array[index]);
            formData.append('upload_preset', this.cloudinary.uploadPreset);
            formData.append('tags', 'gs-vue,gs-vue-uploaded')
            await this.$http.post(this.clUrl, formData).then(res => {
              if (this.carinfo.car.image.length == upload_length) {
                resolve(this.carinfo.car.image)
              } else if (res) {
                this.carinfo.car.image.push(res.data.secure_url)
              } else if (error) {
                if (error.status === 504) {
                  this.$http.post(this.clUrl, formData).then(res => {
                    this.carinfo.car.image.push(res.data.secure_url)
                  })
                }

                reject(error)
              }
            })
          }
        })
        .then((res) => res)
        .catch((error) => error)
    },
    //END
    uploadServerImage: function() {
      var formData = new FormData()
      formData.append('file', this.carImgCropped);
      formData.append('upload_preset', this.cloudinary.uploadPreset);
      formData.append('tags', 'gs-vue,gs-vue-uploaded')
      this.$http.post(this.clUrl, formData).then(res => {
        this.detectImageUrl = res.data.secure_url
        this.carDetection()
      })
    },
    //TEST CAR DETECTION
    carDetection: function() {
      var data = {
        image: this.detectImageUrl
      }
      this.$http.post('https://dev.sighthoundapi.com/v1/recognition?objectType=vehicle,licenseplate', data, {
          headers: {
            'X-Access-Token': 'z90xj4vKHdWP5SyqNoLjy3qnluCVuyfbMOr7',
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (response.data.objects.length == 0) {
            this.showErrorNonCar = true
          } else this.showContinueUploadImage = true
          this.showLoadingUploadImage = false
        }).catch((err) => {})
    },
    showUploadImgModal: function() {
      if (this.showContinueUploadImage) {
        this.showModal = true
      }
    },
    //DRAFT CAR
    getDraftCarInfo: function() {
      if (this.draftCarID > -1) {
        this.cardraftID = this.draftCarID
        this.showLoadingUploadImage = true
        this.savedraft = true
        var credentials = {
          seller: {
            id: localStorage.getItem('userId'),
            authentoken: localStorage.getItem('authentoken')
          }
        }
        this.$http.post('https://timxengon.herokuapp.com/users/car/draft/' + this.draftCarID, credentials)
          .then(response => {
            this.draftCarSeller = response.data.seller
            this.draftCarInfo = response.data.car
            this.carImg_array = response.data.car.image
            this.carBrand = response.data.car.brand
            this.getBrands()
            this.carModel = response.data.car.model
            this.getModels()
            this.carYear = response.data.car.year
            this.getYears()
            this.kilometerage = response.data.car.kilometerage.toString()
            this.carOrigin = response.data.car.origin
            this.setDraftCarOrigin()
            this.carAddress = response.data.car.address
            this.carColor = response.data.car.color
            this.setDraftCarColor()
            this.showLoadingUploadImage = false
            this.carDescription = response.data.car.description
            this.draftCarPrice = response.data.car.price.toString()
            this.getPriceRange()
          }).catch((err) => {})
      }
    },
    setDraftCarOrigin: function() {
      for (var index in this.carOrigins_array) {
        if (this.carOrigin === this.carOrigins_array[index]) {
          this.setActiveOrigin(this.carOrigin, index)
        }
      }
    },
    setDraftCarColor: function() {
      for (var index in this.carColors_array) {
        if (this.carColor === this.carColors_array[index]) {
          this.setActiveColor(this.carColor, index)
        }
      }
    },
    //STEP 1
    getBrands: function() {
      this.$http.get('https://timxengon.herokuapp.com/cars/brands')
        .then(response => {
          this.carBrands_array = response.data
          for (var index in this.carBrands_array) {
            if (this.carBrand === this.carBrands_array[index]) {
              this.setActiveBrand(this.carBrand, index)
            }
          }
        }).catch((err) => {})
    },
    getModels: function() {
      this.$http.get('https://timxengon.herokuapp.com/cars/models/' + this.carBrand)
        .then(response => {
          this.carModels_array = response.data
          for (var index in this.carModels_array) {
            if (this.carModel === this.carModels_array[index]) {
              this.setActiveModel(this.carModel, index)
            }
          }
        }).catch((err) => {})
    },
    getYears: function() {
      this.$http.get('https://timxengon.herokuapp.com/cars/years/' + this.carBrand + '/' + this.carModel)
        .then(response => {
          this.carYear_array = response.data
          for (var index in this.carYear_array) {
            if (this.carYear === this.carYear_array[index]) {
              this.setActiveYear(this.carYear, index)
            }
          }
        }).catch((err) => {})
    },
    setActiveBrand: function(value, index) {
      if (this.carBrand !== value) {
        this.carModel = 'Chọn model xe'
        this.carYear = 'Chọn năm'
      }
      this.carBrand = value
      this.isActiveBrand = index
      this.showErrorBrand = false
      this.getModels()
    },
    setActiveModel: function(value, index) {
      if (this.carModel !== value) {
        this.carYear = 'Chọn năm'
      }
      this.carModel = value
      this.isActiveModel = index
      this.showErrorModel = false
      this.getYears()
    },
    setActiveYear: function(value, index) {
      this.carYear = value
      this.isActiveYear = index
      this.showErrorYear = false
      this.getCarId()
      this.getPriceRange()
    },
    setActiveOrigin: function(value, index) {
      this.carOrigin = value
      this.isActiveOrigin = index
      this.showErrorOrigin = false
    },
    setActiveAddress: function(value, index) {
      this.carAddress = value
      this.isActiveAddress = index
      this.showErrorAddress = false
    },
    setActiveColor: function(value, index) {
      this.carColor = value
      this.isActiveColor = index
      this.showErrorColor = false
    },
    getCarId: function() {
      this.$http.get('https://timxengon.herokuapp.com/cars/spec/' + this.carBrand + '/' + this.carModel + '/' + this.carYear)
        .then(response => {
          this.carId = response.data.id
        }).catch((err) => {})
    },
    getPriceRange: function() {
      this.$http.get('https://timxengon.herokuapp.com/cars/price/' + this.carBrand + '/' + this.carModel + '/' + this.carYear)
        .then(response => {
          if (response.data.min !== null) {
            this.minPrice = response.data.min
            this.maxPrice = response.data.max
            if (response.data.min !== response.data.max) {
              this.showMaxPrice = true
            } else this.showMaxPrice = false
            this.showPriceRange = true
          } else this.showPriceRange = false
          if (this.draftCarPrice !== '') {
            this.pricecar = this.draftCarPrice
          }
        }).catch((err) => {})
    },
    getPriceRecommend: function() {
      parseInt(this.kilometerage.split('.').join(""))
      this.$http.get('https://timxengon.herokuapp.com/cars/price_recommend/' + this.carId + '/' + parseInt(this.kilometerage.split('.').join("")))
        .then(response => {
          if (response.data !== null) {
            this.recommendPrice = Math.round(response.data)
            if(this.recommendPrice <= (this.minPrice*0.8) || this.recommendPrice >= (this.maxPrice*1.2))
            this.recommendPrice = this.minPrice
          }
          else this.recommendPrice = this.minPrice
        }).catch((err) => {})
    },
    //VALIDATE BEFORE SUBMIT
    validateStep1: function() {
      if (this.carBrand !== "Chọn hãng xe" &&
          this.carModel !== "Chọn model xe" &&
          this.carYear !== "Chọn năm" &&
          this.kilometerage !== "" &&
          this.carOrigin !== "" &&
          this.carAddress !== "Chọn nơi bán" &&
          this.carColor !== "" &&
          this.carImg_array.length >= 1 &&
          this.showErrorNonCar == false) {
        this.ActiveStep2()
        this.uploadImage()
        this.getPriceRecommend()
        this.carinfo.car.brand = this.carBrand
        this.carinfo.car.model = this.carModel
        this.carinfo.car.year = this.carYear
        this.carinfo.car.origin = this.carOrigin
        this.carinfo.car.address = this.carAddress
        this.carinfo.car.kilometerage = parseInt(this.kilometerage.split('.').join(""))
        this.carinfo.car.color = this.carColor
      } else if (this.carImg_array.length < 1) {
        this.showErrorImage = true
      } else if (this.carBrand == "Chọn hãng xe") {
        this.showErrorBrand = true
      } else if (this.carModel == "Chọn model xe") {
        this.showErrorModel = true
      } else if (this.carYear == "Chọn năm") {
        this.showErrorYear = true
      } else if (this.kilometerage == "") {
        this.showErrorKM = true
      } else if (this.carOrigin == "") {
        this.showErrorOrigin = true
      } else if (this.carAddress == "Chọn nơi bán") {
        this.showErrorAddress = true
      } else if (this.carColor == "") {
        this.showErrorColor = true
      }
      if (this.carImg_array.length >= 6) {
        this.showErrorImage = false
      }
      if (this.carBrand !== "Chọn hãng xe") {
        this.showErrorBrand = false
      }
      if (this.carModel !== "Chọn model xe") {
        this.showErrorModel = false
      }
      if (this.carYear !== "Chọn năm") {
        this.showErrorYear = false
      }
      if (this.kilometerage !== "") {
        this.showErrorKM = false
      }
      if (this.carOrigin !== "") {
        this.showErrorOrigin = false
      }
      if (this.carAddress !== "Chọn nơi bán") {
        this.showErrorAddress = false
      }
      if (this.carColor !== "") {
        this.showErrorColor = false
      }
    },
    //END STEP 1
    // Active Step
    ActiveStep1: function() {
      if (!this.isStep1) {
        this.isStep1 = true
        this.isStep2 = false
        this.isStep3 = false
        this.isStep4 = false
      } else {
        this.isStep1 = false
      }
    },
    ActiveStep2: function() {
      if (!this.isStep2) {
        this.isStep1 = false
        this.isStep2 = true
        this.isStep3 = false
        this.isStep4 = false
      } else {
        this.isStep2 = false
      }
    },
    ActiveStep3: function() {
      if (!this.isStep3) {
        this.isStep1 = false
        this.isStep2 = false
        this.isStep3 = true
        this.isStep4 = false
        this.carinfo.car.price = parseInt(this.pricecar.split('.').join(""))
        this.carinfo.seller.id = localStorage.userId
        this.carinfo.seller.authentoken = localStorage.authentoken
        this.carinfo.seller.username = localStorage.username
      } else {
        this.isStep3 = false
      }
    },
    ActiveStep4: function() {
      if (!this.isStep4) {
        this.isStep1 = false
        this.isStep2 = false
        this.isStep3 = false
        this.isStep4 = true
      } else {
        this.isStep4 = false
      }
    },
    // Active Option in Step 3
    ActiveTimePush1day: function() {
      if (!this.istimePush1) {
        this.istimePush1 = true
        this.istimePush3 = false
        this.istimePush7 = false
      } else {
        this.istimePush1 = false
      }
    },
    ActiveTimePush3day: function() {
      if (!this.istimePush3) {
        this.istimePush1 = false
        this.istimePush3 = true
        this.istimePush7 = false
      } else {
        this.istimePush3 = false
      }
    },
    ActiveTimePush7day: function() {
      if (!this.istimePush7) {
        this.istimePush1 = false
        this.istimePush3 = false
        this.istimePush7 = true
      } else {
        this.istimePush7 = false
      }
    },
    ActivePushFirst: function() {
      if (!this.isPushfirst) {
        this.isPushfirst = true
      } else {
        this.isPushfirst = false
      }
    },
    ActiveCheckTechnical: function() {
      if (!this.ischeckTechnical) {
        this.ischeckTechnical = true
      } else {
        this.ischeckTechnical = false
      }
    },
    ActiveReviewPost: function() {
      if (!this.isreviewPost) {
        this.isreviewPost = true
      } else {
        this.isreviewPost = false
      }
    },
    ActiveSigntoSell: function() {
      if (!this.issigntoSell) {
        this.issigntoSell = true
      } else {
        this.issigntoSell = false
      }
    },
    // Validate data in step 2 before go to step 3
    validateStep2: function() {
      if(this.carDescription.length >= 24 && this.pricecar !== "") {
        this.carinfo.car.description = this.carDescription
        this.Step2Continue()
      }
      else if (this.carDescription.length < 24) {
        this.showErrorDes = true
      }
      else if (this.pricecar == "") {
        this.showErrorPrice = true
      }
      if (this.carDescription.length >= 24) {
        this.showErrorDes = false
      }
      if (this.pricecar !== "") {
        this.showErrorPrice = false
      }
    },
    // get infomation of car from server
    Step2Continue() {
      this.$http.get('https://timxengon.herokuapp.com/cars/spec/' + this.carinfo.car.brand + '/' + this.carinfo.car.model + '/' + this.carinfo.car.year)
        .then(response => {
          this.carinfo.car.type_of_chassi = response.body.type_of_chassi
          this.carinfo.car.number_of_doors = response.body.number_of_doors
          this.carinfo.car.number_of_seats = response.body.number_of_seats
          this.carinfo.car.fuel_consumption = response.body.fuel_consumption
          this.carinfo.car.transmission_type = response.body.transmission_type
          this.carinfo.car.fuel_type = response.body.fuel_type
          this.carinfo.car.power = response.body.power
          this.carinfo.car.torque = response.body.torque
          this.carinfo.car.tank_capacity = response.body.tank_capacity
          this.carinfo.car.drive_type = response.body.drive_type
          this.carinfo.car.type_of_four_wheel_drive = response.body.type_of_four_wheel_drive
          this.carinfo.car.length = response.body.length
          this.carinfo.car.width = response.body.width
          this.carinfo.car.height = response.body.height
        }).catch((err) => {})
      this.ActiveStep3()
    },
    // Format price
    numberFormat: function(number) {
      return new Intl.NumberFormat('de-DE').format(number)
    },
    // Save car to Draff
    SaveDraft: function() {
      var credentials = {
        seller: {
          id: this.carinfo.seller.id,
          authentoken: this.carinfo.seller.authentoken
        },
        car: {
          model: this.carinfo.car.model,
          year: this.carinfo.car.year,
          version: this.carinfo.car.version,
          kilometerage: this.carinfo.car.kilometerage,
          price: this.carinfo.car.price,
          color: this.carinfo.car.color,
          description: this.carinfo.car.description,
          image: this.carinfo.car.image,
          origin: this.carinfo.car.origin,
          brand: this.carinfo.car.brand,
          address: this.carinfo.car.address,
          draft: true
        },
      }
      this.PostDraffCar(this, credentials, {
        emulateJSON: true
      })
      if (this.showDifferentPriceError && this.postDifferentPriceCar) {
        this.showDifferentDraft = true
      } else this.showSaveDraft = true
      this.savedraft = true
    },
    // Post car to sever
    PostCar: function() {
      if (this.showDifferentPriceError) {
        this.postDifferentPriceCar = true
        this.SaveDraft()
      } else if (this.savedraft) {
        this.EditOldcar()
      } else {
        this.Creatednewcar()
      }
    },
    Creatednewcar: function() {
      var credentials = {
        seller: {
          id: this.carinfo.seller.id,
          authentoken: this.carinfo.seller.authentoken
        },
        car: {
          model: this.carinfo.car.model,
          year: this.carinfo.car.year,
          version: this.carinfo.car.version,
          kilometerage: this.carinfo.car.kilometerage,
          price: this.carinfo.car.price,
          color: this.carinfo.car.color,
          description: this.carinfo.car.description,
          image: this.carinfo.car.image,
          origin: this.carinfo.car.origin,
          brand: this.carinfo.car.brand,
          address: this.carinfo.car.address
        },
      }
      auth.PostCar(this, credentials, {
        emulateJSON: true
      })
    },
    EditOldcar: function() {
      var carid = this.cardraftID
      var credentials = {
        seller: {
          id: this.carinfo.seller.id,
          authentoken: this.carinfo.seller.authentoken
        },
        car: {
          model: this.carinfo.car.model,
          year: this.carinfo.car.year,
          draft: false
        },
      }
      auth.EditOldcar(this, credentials, carid
        // emulateJSON: true
      )
    },
    PostDraffCar (context, creds) {
      context.$http.post('https://timxengon.herokuapp.com/cars', creds)
      .then(response => {
        this.cardraftID = response.data.car.id
      }).catch(() => {
      })
    },
  },
  watch: {
    kilometerage: function(newValue) {
      if (this.kilometerage !== '') {
        var result = newValue.replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        this.kilometerage = result
        this.showErrorKM = false
      }
    },
    pricecar: function(newValue) {
      if (this.pricecar !== '') {
        var result = newValue.replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        this.pricecar = result
      }
      var price = parseInt(this.pricecar.split('.').join(""))
      if (price !== "" && (price > (this.maxPrice * 1.2) || price < (this.minPrice * 0.8)))
        this.showDifferentPriceError = true
      else this.showDifferentPriceError = false
    }
  },
  created() {
    this.getDraftCarInfo()
    this.getBrands()
    // if (this.checkAuth) {
    //   router.push({
    //     name: 'SellCar'
    //   })
    //   this.isStep1 = true
    // } else router.push({
    //   name: 'login'
    // })
  }
}
