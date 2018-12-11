<template>
<div id="search">
  <!-- LOADING CONTENT -->
  <div class="scene" v-if="loading">
    <img class="car" src="../../assets/images/car.svg" />
    <img class="poof" src="../../assets/images/poof.svg" />
    <img class="sign" src="../../assets/images/sign.svg" />
    <em>Loading</em>
  </div>
  <!-- END LOADING CONTENT -->

  <div class="container" v-else>
    <div class="wrap">
      <div class="searchbar">
        <button type="submit" class="searchButton" @click="searchCars">Tìm kiếm</button>
        <input v-model="searchWord" id="searchTerm" name="searchTerm" placeholder="Nhập thông tin xe bạn muốn tìm" class="searchTerm" v-on:keyup.enter="searchCars" />
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-md-10">
        <div class="row row-filter">
          <div class="container">
            <div class="row">
              <div class="col-md-3 filter-left">
                <span>Khoản tiền</span>
                <div class="dropdown">
                  <button id="dropdownMenuButton" class="btn btn-secondary filter-price" aria-haspopup="true" data-toggle="dropdown" aria-expanded="false" v-model="money.value">{{money.text}}
                    <i class="fas fa-caret-down caret-down-price"></i>
                  </button>
                  <div aria-labelledby="dropdownMenuButton" class="dropdown-menu">
                    <a class="dropdown-item" v-for="money in moneys" @click="selectKhoanTien(money)"> {{money.text}}</a>
                  </div>
                </div>
              </div>
              <div class="col-md-3 filter-midleft">
                <span>Hãng xe</span>
                <div class="dropdown">
                  <button id="dropdownMenuButton" class="btn btn-secondary filter-brand" aria-haspopup="true" data-toggle="dropdown" aria-expanded="false">{{car_maker.text}}
                    <i class="fas fa-caret-down caret-down-brand"></i>
                  </button>
                  <div aria-labelledby="dropdownMenuButton" class="dropdown-menu">
                    <a  v-for="car_maker in car_makers" class="dropdown-item" @click="selectHangXe(car_maker)">{{car_maker.text}}</a>
                  </div>
                </div>
              </div>
              <div class="col-md-2 filter-midright">
                <span>Màu xe</span>
                <div class="dropdown">
                  <button id="dropdownMenuButton" class="btn btn-secondary filter-color" aria-haspopup="true" data-toggle="dropdown" aria-expanded="false">{{car_color.text}}
                    <i class="fas fa-caret-down caret-down-color"></i>
                  </button>
                  <div aria-labelledby="dropdownMenuButton" class="dropdown-menu">
                    <a v-for="color in car_colors" class="dropdown-item" @click="selectMauXe(color)">{{color.text}}</a>
                  </div>
                </div>
              </div>
              <div class="col-md-2 filter-right">
                <span>Đời xe</span>
                <div class="dropdown">
                  <button id="dropdownMenuButton" class="btn btn-secondary filter-year" aria-haspopup="true" data-toggle="dropdown" aria-expanded="false">{{doi_xe.text}}
                    <i class="fas fa-caret-down caret-down-year"></i>
                  </button>
                  <div aria-labelledby="dropdownMenuButton" class="dropdown-menu">
                    <a v-for="doixe in car_lives" class="dropdown-item" @click="selectDoiXe(doixe)">{{doixe.text}}</a>
                  </div>
                </div>
              </div>
              <div class="col-md-2 filter-button">
                <button class="btn-filter">Lọc tìm</button>
              </div>
            </div>
          </div>
        </div>

        <!-- WAITING! Pagination -->
        <div v-if="!no_cars" id="pages"
             class="pages"
             is="uib-pagination"
             v-model="pagination"
             :total-items="totalpages"
             :items-per-page="10"
             :direction-links="true"
             next-text="Tiếp"
             previous-text="Trước"
             first-text="Trang đầu"
             last-text="Trang cuối"
             :max-size="5"
             :boundary-links="true"
             :boundary-link-numbers="true" :rotate="true">
        </div>
        <!-- WAITING! Pagination -->

        <div class="row car-row" v-for="car in search_cars[1]">
          <a class="container container-listview" href="/car/79">
            <div class="row">
              <div class="col-md-4">
                <img :src="car.img" class="img-fluid img-car">
              </div>
              <div class="col-md-8">
                <div class="row">
                  <div class="col-md-6 text-left">
                    <span class="car-name">{{car.brand}} {{car.model}}</span>
                  </div>
                  <div class="col-md-6 text-right">
                    <span class="check-badge">
                      <i class="fas fa-check-circle"></i>
                      TUANTRAN DA CHECK HANG
                    </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 text-left price">
                    <span>{{car.price}}.000.000 đ</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 text-left year-distance">
                    <span class="year">
                      <i class="fas fa-calendar"></i>
                      {{car.year}}
                    </span>
                    <span class="distance">
                      <i class="fas fa-car"></i>
                      {{car.kilometerage}}
                    </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 text-left describe">
                    <p>
                      {{car.desc}}
                    </p>
                  </div>
                </div>
                <div class="row addition-info">
                  <div class="col-md-6 text-left">
                    <span class="liked-car">
                      <i class="fas fa-heart"></i>
                      {{car.saves_count}} Yêu thích
                    </span>
                    <span>
                      <i class="fas fa-comment"></i>
                      {{car.comments_count}} Bình luận
                    </span>
                  </div>
                  <div class="col-md-6 text-right">
                    <span class="date-create">
                      <i class="fas fa-clock"></i>
                      {{car.created_at.substring(0, 10)}}
                    </span>
                     <span class="location-car">
                      <i class="fas fa-map-marker"></i>
                      Đà Nẵng
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div v-if="no_cars" class="row car-row">
          CARS NOT FOUND
        </div>

        <!-- WAITING! Pagination -->
        <div v-if="!no_cars" id="pages"
             class="pages"
             is="uib-pagination"
             v-model="pagination"
             :total-items="totalpages"
             :items-per-page="10"
             :direction-links="true"
             next-text="Tiếp"
             previous-text="Trước"
             first-text="Trang đầu"
             last-text="Trang cuối"
             :max-size="5"
             :boundary-links="true"
             :boundary-link-numbers="true"
             :rotate="true"
             :force-ellipses="false"
             @change="getAllCars">
        </div>
        <!-- WAITING! Pagination -->
      </div>
      <div class="col-md-2">
        <div class="addition-information">
          ĐÁNH GIÁ
          <hr class="hr">
          <div class="review-news" v-for="review in reviews_array">
            <a class="news-link" :href="review.url">
              <div>
                <img :src="review.image" class="news-image">
                {{review.title}}
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
</template>
<style src="./Search.css"></style>
<script src="./Search.js"></script>
