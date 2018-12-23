<template>
<div id="sellcar">
  <div class="col-md-9 container sellcartitle">
    <div class="row pagetitle">
      <div class="col-md-2 title-left">
        <img src="../../assets/images/bestprice.png" class="img-fluid" alt="Best Price">
      </div>
      <div class="col-md-7 tile-right">
        <h4 class="title-sellcar">EASY SELL CAR WITH 4 STEPS</h4>
        <p class="service-info">Input information follow step</p>
      </div>
    </div>
  </div>
  <div class="tab">
    <button class="tablinks" :class="{ 'step-active': isStep1 }" disabled>Step 1</button>
    <button class="tablinks" :class="{ 'step-active': isStep2 }" disabled>Step 2</button>
    <button class="tablinks" :class="{ 'step-active': isStep3 }" disabled>Step 3</button>
    <button class="tablinks" :class="{ 'step-active': isStep4 }" disabled>Step 4</button>
  </div>
  <!-- Step 1 -->
  <div id="Step1" class="tabcontent" v-if="isStep1">
    <div class="container">
      <div class="row">
        <transition name="modal" v-if="showModal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <a @click="cancelModal" class="close-button"></a>
              <div class="modal-container">
                <croppa v-model="croppa"
                        :width="690"
                        :height="404"
                        placeholder="Chọn hoặc kéo thả một bức ảnh vào đây"
                        :placeholder-font-size="20"
                        remove-button-color="#00a3cb"
                        :remove-button-size="30"
                        :prevent-white-space="true"
                        accept="image/*"
                        :file-size-limit="5120000"
                        @image-remove="removeImageModal"
                        @new-image-drawn="onNewImage"
                        @file-type-mismatch="onFileTypeMismatch"
                        @file-size-exceed="onFileSizeExceed">
                  <img slot="placeholder" src="../../assets/images/uploadPlaceholder.png" />
                </croppa>
                <div v-if="outSizeImage">
                  <p class="modal-error">
                    {{outSizeErrorMsg}}
                  </p>
                </div>
                <div v-if="ImageTypeMismatch">
                  <p class="modal-error">
                    {{TypeMismatchErrorMsg}}
                  </p>
                </div>
                <div class="modal-footer">
                  <button @click="cancelModal" type="button" class="btn btn-outline-primary" id="btn-modal">Cancel</button>
                  <button v-if="showSaveButton" type="button" class="btn btn-outline-primary" id="btn-modal"
                  @click="carImgCropped = croppa.generateDataUrl()"
                  v-on:click.once="cropAndSave">Save</button>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <div class="container">
          <img @click="showUploadImgModal" id="uploadImage" src="../../assets/images/openUpload.png" />
          <span class="span-img" v-for="(image,index) in carImg_array">
            <img id="show-image" :src="image" />
            <i class="fa fa-times-circle-o" id="remove-img" aria-hidden="true" @click="removeImageArray(index)">x</i>
          </span>
        </div>
        <div v-if="showErrorNonCar" class="error-nocar-image">{{errorNonCarImageMsg}}</div>
        <div v-if="showErrorImage" class="error-image">{{errorImageMsg}}</div>
        <div v-if="showLoadingUploadImage" class="loading-upload"><img src="../../assets/images/loading-image.gif" /></div>
      </div>
      <div class="row row-filter">
        <div class="col-md-12">
        </div>
      </div>
      <div class="row row-filter">
        <div class="col-md-4" id="col1-step1-left">
          <div class="header-step1">Car Brand</div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-step1"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    {{carBrand}}
                    <!-- <i class="fa fa-caret-down caret-down" aria-hidden="true"></i> -->
            </button>
            <div class="dropdown-menu" id="dropdown-menu-large" aria-labelledby="dropdownMenuButton">
              <a v-for="(brand,index) in carBrands_array"
                 class="dropdown-item"
                 :class="{'active-car-info': isActiveBrand == index}"
                 @click="setActiveBrand(brand,index)">
                 {{brand}}
              </a>
            </div>
            <div v-if="showErrorBrand" class="error-car">{{errorBrandMsg}}</div>
          </div>
        </div>
        <div class="col-md-4" id="col1-step1-center">
          <div class="header-step1">Car Model</div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-step1"
                    type="button" id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    {{carModel}}
                    <!-- <i class="fa fa-caret-down caret-down-mid" aria-hidden="true"></i> -->
            </button>
            <div class="dropdown-menu" id="dropdown-menu-large" aria-labelledby="dropdownMenuButton">
              <a v-for="(model,index) in carModels_array"
                 class="dropdown-item"
                 :class="{'active-car-info': isActiveModel == index}"
                 @click="setActiveModel(model,index)">
                 {{model}}
              </a>
            </div>
            <div v-if="showErrorModel" class="error-car">{{errorModelMsg}}</div>
          </div>
        </div>
        <div class="col-md-4" id="col1-step1-right">
          <div class="header-step1">Car Year</div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-step1"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    {{carYear}}
                    <!-- <i class="fa fa-caret-down caret-down" aria-hidden="true"></i> -->
            </button>
            <div class="dropdown-menu" id="dropdown-menu-large" aria-labelledby="dropdownMenuButton">
              <a v-for="(year,index) in carYear_array"
                 class="dropdown-item"
                 :class="{'active-car-info': isActiveYear == index}"
                 @click="setActiveYear(year,index)">
                 {{year}}
              </a>
            </div>
            <div v-if="showErrorYear" class="error-car">{{errorYearMsg}}</div>
          </div>
        </div>
      </div>
      <div class="row row-filter">
        <div class="col-md-4" id="col1-step1-left">
          <div class="header-step1">Number of used km</div>
          <div class="input-group" id="km-input">
            <input type="text" class="form-control" v-model="kilometerage" maxlength="12" placeholder="Ví dụ: 5.000 KM">
            <!-- <span class="input-group-addon">KM</span> -->
          </div>
          <div v-if="showErrorKM" class="error-car">{{errorKMMsg}}</div>
        </div>
        <div class="col-md-4" id="col1-step1-center">
          <div class="header-step1">Origin</div>
          <div>
            <button v-for="(origin,index) in carOrigins_array"
                    type="button"
                    class="btn btn-outline-primary"
                    @click="setActiveOrigin(origin,index)"
                    id="btn-origin"
                    :class="{'active-car-info': isActiveOrigin == index}">
                    {{origin}}
            </button>
          </div>
          <div v-if="showErrorOrigin" class="error-car">{{errorOriginMsg}}</div>
        </div>
        <div class="col-md-4" id="col1-step1-right">
          <div class="header-step1">Location</div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-step1"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    {{carAddress}}
                    <!-- <i class="fa fa-caret-down caret-down" aria-hidden="true"></i> -->
            </button>
            <div class="dropdown-menu" id="dropdown-menu-large" aria-labelledby="dropdownMenuButton">
              <a v-for="(address,index) in carAddresses_array"
                 class="dropdown-item"
                 :class="{'active-car-info': isActiveAddress == index}"
                 @click="setActiveAddress(address,index)">
                 {{address}}
              </a>
            </div>
            <div v-if="showErrorAddress" class="error-car">{{errorAddressMsg}}</div>
          </div>
        </div>
      </div>
      <div class="row row-filter">
        <div class="col-md-12" id="col3-step1">
          <div class="header-step1">Color {{carColor}}</div>
          <div class="row" id="row-color">
            <button v-for="(color,index) in carColors_array"
                    @click="setActiveColor(color,index)"
                    type="button"
                    class="btn btn-outline-primary"
                    id="btn-color"
                    :class="{'active-color': isActiveColor == index}"
                    :style="color_array[index]">
             </button>
          </div>
          <div v-if="showErrorColor" class="error-car">{{errorColorMsg}}</div>
        </div>
      </div>
      <div class="row row-filter">
        <div class="col">
          <button type="submit" id="btn-next-step1" @click="validateStep1">Next</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Step 2 -->
  <div id="Step2" class="tabcontent" v-if="isStep2">
    <div class="step2opt">
      <div class="col-md-9">
        <p class="title-info-step2">Title</p>
        <h5 align="left">{{carinfo.car.brand}} {{carinfo.car.model}} {{carinfo.car.year}}</h5>
      </div>

      <div class="col-md-9">
        <p class="title-info-step2">Description</p>
        <div align="left">
          <textarea v-model="carDescription"
                    @focus="showErrorDes = false"
                    type="text"
                    class="step2-description"
                    name="Description"
                    cols="5">
          </textarea>
          <div v-if="showErrorDes" class="error-car">{{errorDesMsg}}</div>
        </div>
      </div>
      <div class="col-md-9">
        <p class="title-info-step2">Price</p>
        <div align="left">
          <input v-model="pricecar"
                 @focus="showErrorPrice = false"
                 placeholder="0"
                 type="text"
                 class="step2-price"
                 name="Price"
                 maxlength="5"/>
                 .000.000 VND
          <div v-if="showErrorPrice" class="error-car">{{errorPriceMsg}}</div>
        </div>
        <div class="recommend-price">
             Recomend Price
             <span id="recommend-price-num">{{numberFormat(this.recommendPrice)}}.000.000 VND</span>
        </div>
        <div v-if="showPriceRange"
             class="price-range">
             Price of similar car from{{numberFormat(this.minPrice)}}.000.000 VND
             <span v-if="showMaxPrice">to{{numberFormat(this.maxPrice)}}.000.000 VND</span>
        </div>
        <div v-if="showPriceRange" class="recommend-price-warning">It just a recomend price</div>
        <div v-if="showDifferentPriceError" class="different-price-error">
          <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
          Your price is too different. We will check it before it available to sell.
        </div>
      </div>
      <div class="col-md-9 row navi-button">
        <div class="col-md-2 step-left">
          <button type="button" class="btn-continue" @click="ActiveStep1()">Back</button>
        </div>
        <div class="col-md-2 step-right">
          <button type="button" class="btn-continue" @click="validateStep2()">Next</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Step 3 -->
  <div id="Step3" class="tabcontent Step3" v-if="isStep3">
    <div class="col-md-8 main-title">
      <h4 class="description">Advertising</h4>
    </div>
    <div class="step3opt">
      <div class="col-md-9 title">
        <p class="title-info">Push news</p>
      </div>
      <div align="left" class="row">
        <div class="col-md-3 option1">
          <button type="button"
                  class="btn-option"
                  :class="{ 'option-active': istimePush1 }"
                  @click="ActiveTimePush1day ()">
                  <b>1 day</b> <br/>
                  15.000 đ
           </button>
        </div>
        <div class="col-md-3 option2">
          <button type="button"
                  class="btn-option"
                  :class="{ 'option-active': istimePush3 }"
                  @click="ActiveTimePush3day ()">
                  <b>3 days</b> <br/>
                  43.000 đ
          </button>
        </div>
        <div class="col-md-3 option3">
          <button type="button"
                  class="btn-option"
                  :class="{ 'option-active': istimePush7 }"
                  @click="ActiveTimePush7day ()">
                  <b>7 days</b> <br/>
                  95.000 đ
          </button>
        </div>
      </div>
    </div>

    <div class="step3opt">
      <div class="col-md-9 title">
        <p class="title-info">Priority News</p>
      </div>
      <div align="left" class="row">
        <div class="col-md-3 option1">
          <button type="button"
                  class="btn-option"
                  :class="{ 'option-active': isPushfirst }"
                  @click="ActivePushFirst ()">
                  <b>1 day</b> <br/>
                  25.000 đ
          </button>
        </div>
        <div class="col-md-6 option1">
          <p class="infodescriotion">This news will stay at top 1 search in 24 hour</p>
        </div>
      </div>
    </div>

    <div class="step3opt">
      <div class="col-md-9 title">
        <p class="title-info">Check car service</p>
      </div>
      <div align="left" class="row">
        <div class="col-md-3 option1">
          <button type="button"
                  class="btn-option"
                  :class="{ 'option-active': ischeckTechnical }"
                  @click="ActiveCheckTechnical ()">
                  <b>Technical check</b> <br/>
                  500.000 đ
          </button>
        </div>
        <div class="col-md-3 option2">
          <button type="button"
                  class="btn-option"
                  :class="{ 'option-active': isreviewPost }"
                  @click="ActiveReviewPost ()">
                  <b>Write Review</b> <br/>
                  250.000 đ
          </button>
        </div>
        <div class="col-md-3 option3">
          <button type="button"
                  class="btn-option"
                  :class="{ 'option-active': issigntoSell }"
                  @click="ActiveSigntoSell ()">
                  <b>Sign for sell</b> <br/>
                  10% car's price
          </button>
        </div>
      </div>
      <div class="col-md-9 option3">
        <p class="infodescriotion">Car with clear infomation easy to sell</p>
      </div>
    </div>

    <div class="row navi-button">

      <div class="col-md-2 step-left">
        <button type="button" class="btn-continue" @click="ActiveStep2()">Back</button>
      </div>
      <div class="col-md-2 step-right">
        <button type="button" class="btn-continue" @click="ActiveStep4()">Next</button>
      </div>

    </div>
  </div>

  <!-- Step 4 -->
  <div id="Step4" class="col-md-10 tabcontent" v-if="isStep4">
    <div class="container">
      <div class="col-md-12 container_step4">
        <div class="main-title">
          <h5>PREVIEW</h5>
        </div>
        <div class="col-md-12 container container-car-brand">
          <div class="row">
            <div class="col-md-6 col-car-brand">
              <h2>{{carinfo.car.brand}} {{carinfo.car.model}} {{carinfo.car.year}}</h2>
            </div>
            <div class="col-md-6 col-compare-save">
              <span class="compareCar"> <i id="fa-compare" class="fa fa-plus-square-o" aria-hidden="true"></i><span>Add to compare</span></span>
              <span class="likeCar "> <i id="fa-likeCar" class="fa fa-heart-o" aria-hidden="true"></i><span>Save</span></span>
            </div>
          </div>
          <hr class="hr" />
        </div>
        <div class="container">
          <div class="row">
            <div class="col-md-8" id="clear-padding">
              <div class="container">
                <div id="carousel" class="carousel slide" data-ride="carousel">
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img class="d-block w-100" id="car-img-active" :src="carImg_array[0]">
                    </div>
                    <div class="carousel-item">
                      <img class="d-block w-100" id="car-img-active" :src="carImg_array[1]">
                    </div>
                    <div class="carousel-item">
                      <img class="d-block w-100" id="car-img-active" :src="carImg_array[2]">
                    </div>
                    <div class="carousel-item">
                      <img class="d-block w-100" id="car-img-active" :src="carImg_array[3]">
                    </div>
                    <div class="carousel-item">
                      <img class="d-block w-100" id="car-img-active" :src="carImg_array[4]">
                    </div>
                    <div class="carousel-item">
                      <img class="d-block w-100" id="car-img-active" :src="carImg_array[5]">
                    </div>
                  </div>
                </div>
                <div class="clearfix">
                  <div id="thumbcarousel" class="carousel slide" data-interval="false">
                    <div class="carousel-inner" id="car-carousel">
                      <div class="carousel-item active">
                        <div data-target="#carousel" data-slide-to="0" class="thumb"><img class="d-block w-100" id="car-img" :src="carImg_array[0]"></div>
                        <div data-target="#carousel" data-slide-to="1" class="thumb"><img class="d-block w-100" id="car-img" :src="carImg_array[1]"></div>
                        <div data-target="#carousel" data-slide-to="2" class="thumb"><img class="d-block w-100" id="car-img" :src="carImg_array[2]"></div>
                      </div>

                      <div class="carousel-item">
                        <div data-target="#carousel" data-slide-to="3" class="thumb"><img class="d-block w-100" id="car-img" :src="carImg_array[3]"></div>
                        <div data-target="#carousel" data-slide-to="4" class="thumb"><img class="d-block w-100" id="car-img" :src="carImg_array[4]"></div>
                        <div data-target="#carousel" data-slide-to="5" class="thumb"><img class="d-block w-100" id="car-img" :src="carImg_array[5]"></div>

                    </div>

                    <a id="car-img-carousel" class="carousel-control-prev" href="#thumbcarousel" role="button" data-slide="prev">
                    <span><i class="fa fa-chevron-left" id="carousel-icon" aria-hidden="true"></i></span>
                  </a>
                    <a id="car-img-carousel" class="carousel-control-next" href="#thumbcarousel" role="button" data-slide="next">
                    <span><i class="fa fa-chevron-right" id="carousel-icon" aria-hidden="true"></i></span>
                  </a>
                  </div>

                </div>

              </div>
              <div class="container container-car-specs">
                <h5 class="title-car-specs">BASIC INFO</h5>
                <div class="row row-car-specs">
                  <div class="col-md-6">
                    <h6 class="col header-car-specs">Basic info</h6>
                    <table class="table table-striped">
                      <tbody>
                        <tr>
                          <th scope="row">Origin</th>
                          <td>{{carinfo.car.origin}}</td>
                        </tr>
                        <tr>
                          <th scope="row">Type of chassi</th>
                          <td>{{carinfo.car.type_of_chassi}}</td>
                        </tr>
                        <tr>
                          <th scope="row">KM</th>
                          <td>{{numberFormat(carinfo.car.kilometerage)}}</td>
                        </tr>
                        <tr>
                          <th scope="row">Color</th>
                          <td>{{carinfo.car.color}}</td>
                        </tr>
                        <tr>
                          <th scope="row">Doors number</th>
                          <td>{{carinfo.car.number_of_doors}}</td>
                        </tr>
                        <tr>
                          <th scope="row">Seats number</th>
                          <td>{{carinfo.car.number_of_seats}}</td>
                        </tr>
                        <tr>
                          <th scope="row">Size</th>
                          <td>{{carinfo.car.length}} x {{carinfo.car.width}} x {{carinfo.car.height}}</td>
                        </tr>
                        <tr>
                          <th scope="row">Fuel consumption</th>
                          <td>{{carinfo.car.fuel_consumption}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col-md-6">
                    <h6 class="col header-car-specs">Fuel engine</h6>
                    <table class="table table-striped">
                      <tbody>
                        <tr>
                          <th scope="row">Fuel type</th>
                          <td>{{carinfo.car.fuel_type}}</td>
                        </tr>
                        <tr>
                          <th scope="row">Power</th>
                          <td>{{carinfo.car.power}}</td>
                        </tr>
                        <tr>
                          <th scope="row">Torque</th>
                          <td>{{carinfo.car.torque}}</td>
                        </tr>
                        <tr>
                          <th scope="row">Tank capacity</th>
                          <td>{{carinfo.car.tank_capacity}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <h6 class="col header-car-specs">Transmission</h6>
                    <table class="table table-striped">
                      <tbody>
                        <tr>
                          <th scope="row">Transmission type</th>
                          <td>{{carinfo.car.transmission_type}}</td>
                        </tr>
                        <tr>
                          <th scope="row">Drive type</th>
                          <td>{{carinfo.car.drive_type}}</td>
                        </tr>
                        <tr>
                          <th scope="row">Type of wheel drive</th>
                          <td>{{carinfo.car.type_of_four_wheel_drive}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="row row-description">
                  <div class="col-md-12">
                    <h6 class="col header-car-specs">Description</h6>
                    <p class="col car-description">
                      {{carinfo.car.description}}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
            <div class="col-md-4" id="clear-padding">
              <div class="container container-seller">

                <div class="container container-seller">
                  <span>Price</span>
                  <h4 id="car-price">{{numberFormat(carinfo.car.price)}}.000.000 VND</h4>
                  <span>Seller</span>
                  <h4>{{carinfo.seller.username}}</h4>
                  <span>Address</span>
                  <h4>{{carinfo.car.address}}</h4>
                  <span>Date post</span>
                  <h1><button type="button" class="btn btn-contact">Contact</button></h1>
                </div>
                <div class="container container-verified">
                  <h5>Verify</h5>
                  <hr class="hr" />
                </div>
                <div class="container">
                  <div class="container container-checked">
                    <div class="row">
                      <div class="col-md-2">
                        <i id="icon-checked" class="fa fa-check-circle" aria-hidden="true"></i>
                      </div>
                      <div class="col-md-8">
                        <h5 id="title-check">Car checked</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="msgDraft" v-if="showSaveDraft">
      <h5>This is saved draft</h5>
    </div>
    <div class="msgDifferent" v-if="showDifferentDraft">
      <i class="fa fa-check-square-o" aria-hidden="true"></i><span class="confirm-admin-msg">Your sell saved. We will contact to confirm. Thanks!</span>
    </div>
    <div class="row navi-button">

      <div class="col-md-2 step-left">
        <button type="button" class="btn-continue" @click="ActiveStep3()">Back</button>
      </div>
      <div class="col-md-2 step-left">
        <button type="button" class="btn-savedraft" @click="SaveDraft()" :disabled="savedraft">Save Draff</button>
      </div>
      <div class="col-md-2 step-right">
        <button type="button" class="btn-post" @click="PostCar()" :disabled="showDifferentDraft">Save</button>
      </div>
    </div>
  </div>
</div>
</template>
<script src="./Sellcar.js"></script>
<style src="./Sellcar.css" scoped></style>
<style src="../../assets/style/CarDetail.css">
