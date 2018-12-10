<template>
<div id="search">
  <!-- LOADING CONTENT -->
  <!-- <div class="scene" v-if="loading">
    <img class="car" src="../../assets/images/car.svg" />
    <img class="poof" src="../../assets/images/poof.svg" />
    <img class="sign" src="../../assets/images/sign.svg" />
    <em>Loading</em>
  </div> -->
  <!-- END LOADING CONTENT -->

  <!-- <div class="container" v-else> -->
  <div class="container">
    <div class="wrap">
      <div class="searchbar">
        <button type="submit" class="searchButton">Tìm kiếm</button>
        <input id="searchTerm" name="searchTerm" placeholder="Nhập thông tin xe bạn muốn tìm" class="searchTerm" />
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
                  <button id="dropdownMenuButton" class="btn btn-secondary filter-price" aria-haspopup="true" data-toggle="dropdown" aria-expanded="false">Bất kỳ
                    <i class="fas fa-caret-down caret-down-price"></i>
                  </button>
                  <div aria-labelledby="dropdownMenuButton" class="dropdown-menu">
                    <a class="dropdown-item">>300tr</a>
                    <a class="dropdown-item">300tr - 600tr</a>
                    <a class="dropdown-item">600tr - 900tr</a>
                    <a class="dropdown-item">900tr - 1.5 tỷ</a>
                    <a class="dropdown-item">1.5 tỷ - 3 tỷ</a>
                    <a class="dropdown-item">3 tỷ - 5 tỷ</a>
                    <a class="dropdown-item">5 tỷ - 7 tỷ</a>
                    <a class="dropdown-item">7 tỷ - 10 tỷ</a>
                    <a class="dropdown-item">Bất kỳ</a>
                  </div>
                </div>
              </div>
              <div class="col-md-3 filter-midleft">
                <span>Hãng xe</span>
                <div class="dropdown">
                  <button id="dropdownMenuButton" class="btn btn-secondary filter-brand" aria-haspopup="true" data-toggle="dropdown" aria-expanded="false">Bất kỳ
                    <i class="fas fa-caret-down caret-down-brand"></i>
                  </button>
                  <div aria-labelledby="dropdownMenuButton" class="dropdown-menu">
                    <a class="dropdown-item">Honda</a>
                    <a class="dropdown-item">Toyota</a>
                    <a class="dropdown-item">Mazda</a>
                    <a class="dropdown-item">Mercedes-Benz</a>
                    <a class="dropdown-item">Audi</a>
                    <a class="dropdown-item">Hyundai</a>
                    <a class="dropdown-item">Ford</a>
                    <a class="dropdown-item">KIA</a>
                    <a class="dropdown-item">BMW</a>
                    <a class="dropdown-item">Chervolet</a>
                    <a class="dropdown-item">Bất kỳ</a>
                  </div>
                </div>
              </div>
              <div class="col-md-2 filter-midright">
                <span>Màu xe</span>
                <div class="dropdown">
                  <button id="dropdownMenuButton" class="btn btn-secondary filter-color" aria-haspopup="true" data-toggle="dropdown" aria-expanded="false">Bất kỳ
                    <i class="fas fa-caret-down caret-down-color"></i>
                  </button>
                  <div aria-labelledby="dropdownMenuButton" class="dropdown-menu">
                    <a class="dropdown-item">Đen</a>
                    <a class="dropdown-item">Trắng</a>
                    <a class="dropdown-item">Bạc</a>
                    <a class="dropdown-item">Đỏ</a>
                    <a class="dropdown-item">Xám</a>
                    <a class="dropdown-item">Vàng</a>
                    <a class="dropdown-item">Xanh</a>
                    <a class="dropdown-item">Nâu</a>
                    <a class="dropdown-item">Cam</a>
                    <a class="dropdown-item">Tím</a>
                    <a class="dropdown-item">Hỗn hợp</a>
                    <a class="dropdown-item">Bất kỳ</a>
                  </div>
                </div>
              </div>
              <div class="col-md-2 filter-right">
                <span>Đời xe</span>
                <div class="dropdown">
                  <button id="dropdownMenuButton" class="btn btn-secondary filter-year" aria-haspopup="true" data-toggle="dropdown" aria-expanded="false">Bất kỳ
                    <i class="fas fa-caret-down caret-down-year"></i>
                  </button>
                  <div aria-labelledby="dropdownMenuButton" class="dropdown-menu">
                    <a class="dropdown-item">2016</a>
                    <a class="dropdown-item">2015</a>
                    <a class="dropdown-item">2014</a>
                    <a class="dropdown-item">2013</a>
                    <a class="dropdown-item">2012</a>
                    <a class="dropdown-item">2011</a>
                    <a class="dropdown-item">2010</a>
                    <a class="dropdown-item">Bất kỳ</a>
                  </div>
                </div>
              </div>
              <div class="col-md-2 filter-button">
                <button class="btn-filter">Lọc tìm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<style src="./Search.css"></style>
<script src="./Search.js"></script>
