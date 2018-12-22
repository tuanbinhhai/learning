<template>
<div id="car-detail">
  <div class="container">
    <div class="container">
      <div class="container container-car-brand">
        <div class="row">
          <div class="col-md-6 col-car-brand">
            <h1>Lexus LX</h1>
          </div>
          <div class="col-md-6 col-compare-save">
            <span class="compareCar">
               <i id="fa-compare" class="fas fa-plus-square"></i>
               <span>Thêm vào so sánh</span>
            </span>
            <span class="likeCar">
              <i id="fa-likeCar" class="fas fa-heart"></i>
              <span>Yêu thích</span>
            </span>
          </div>
        </div>
        <hr class="hr" />
      </div>
      <div class="container">
        <div class="row">
          <div id="clear-padding" class="col-md-8">

            <div class="container">
              <div id="carousel" class="carousel slide" data-ride="carousel" >
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img class="d-block w-100" v-if="car.image" :src="car.image[0]" alt="First slide">
                  </div>
                  <div class="carousel-item">
                    <img class="d-block w-100" v-if="car.image" :src="car.image[1]" alt="Second slide">
                  </div>
                  <div class="carousel-item">
                    <img class="d-block w-100" v-if="car.image" :src="car.image[2]" alt="Third slide">
                  </div>
                </div>
              </div>
              <div class="clearfix">
                <div id="thumbcarousel" class="carousel slide" data-interval="false">
                  <div id="car-carousel" class="carousel-inner">
                    <div class="carousel-item active">
                      <div data-target="#carousel" data-slide-to="0" class="thumb">
                        <img class="d-block w-100" v-if="car.image" :src="car.image[0]" alt="First slide">
                      </div>
                      <div data-target="#carousel" data-slide-to="1" class="thumb">
                        <img class="d-block w-100" v-if="car.image" :src="car.image[1]" alt="Second slide">
                      </div>
                       <div data-target="#carousel" data-slide-to="2" class="thumb">
                        <img class="d-block w-100" v-if="car.image" :src="car.image[2]" alt="Third slide">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="container container-car-specs">
              <h5 class="title-car-specs">THÔNG TIN CƠ BẢN</h5>
              <div class="row row-car-specs">
                <div class="col-md-6">
                  <h6 class="col header-car-specs">Thông số cơ bản</h6>
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <th scope="row">Xuất xứ: </th>
                        <td>{{car.origin}}</td>
                      </tr>
                      <tr>
                        <th scope="row">Dòng xe: </th>
                        <td>{{car.type_of_chassi}}</td>
                      </tr>
                      <tr>
                        <th scope="row">Số KM đã đi: </th>
                        <td>{{car.kilometerage}}</td>
                      </tr>
                      <tr>
                        <th scope="row">Màu: </th>
                        <td>{{car.color}}</td>
                      </tr>
                      <tr>
                        <th scope="row">Số cửa: </th>
                        <td>{{car.number_of_doors}}</td>
                      </tr>
                      <tr>
                        <th scope="row">Số chỗ ngồi: </th>
                        <td>{{car.number_of_seats}}</td>
                      </tr>
                      <tr>
                        <th scope="row">Kích thước: </th>
                        <td>{{car.length}} x {{car.width}} x {{car.height}} mm</td>
                      </tr>
                      <tr>
                        <th scope="row">Tiêu thụ: </th>
                        <td>{{car.fuel_consumption}} l/100km</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="col-md-6">
                  <h6 class="col header-car-specs">Nhiên liệu - Động cơ</h6>
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <th scope="row">Loại nhiên liệu: </th>
                        <td>{{car.fuel_type}}</td>
                      </tr>
                      <tr>
                        <th scope="row">Công suất: </th>
                        <td>{{car.power}} kW</td>
                      </tr>
                      <tr>
                        <th scope="row">Momen xoắn: </th>
                        <td>{{car.torque}} Nm</td>
                      </tr>
                      <tr>
                        <th scope="row">Dung tích bình xăng: </th>
                        <td>{{car.tank_capacity}} l</td>
                      </tr>
                    </tbody>
                  </table>
                  <h6 class="col header-car-specs">Hộp số chuyển động</h6>
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <th scope="row">Hộp số: </th>
                        <td>{{car.transmission_type}}</td>
                      </tr>
                      <tr>
                        <th scope="row">Hệ dẫn động: </th>
                        <td>{{car.drive_type}}</td>
                      </tr>
                      <tr>
                        <th scope="row">Loại dẫn động: </th>
                        <td>{{car.type_of_four_wheel_drive}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="row row-description">
                <div class="col-md-12">
                  <h6 class="col header-car-specs">Miêu tả</h6>
                  <p class="col car-description">{{car.description}}
                  </p>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="container">
                  <div class="row row-post">
                    <div class="col-md-2">
                      <img src="https://www.bootdey.com/img/Content/user_1.jpg" alt="user profile image" class="img-avatar"/>
                    </div>
                    <div id="col-cmt-box" class="col-md-10">
                      <div>
                        <textarea  placeholder="Thêm bình luận ..." cols="5" class="txtarea-content"></textarea>
                        <div>
                          <button type="button" id="btn-post" class="btn btn-primary">Đăng</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="row row-border">
                      <div class="col-md-2">
                        <img  src="https://www.bootdey.com/img/Content/user_1.jpg" alt="user profile image" class="img-avatar">
                      </div>
                      <div class="col-md-10 user-comment" v-for="comment in comments">
                        <div class="cmt-content">
                          <h5 class="post-name">{{comment.user_name}}</h5>
                        </div>
                        <p v-if="comment.created_at">{{comment.content}}<br/>
                          {{comment.created_at.substring(0, 10)}}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="clear-padding" class="col-md-4">
            <div class="container container-seller">
              <div class="container container-seller">
                <span>Giá bán</span>
                <h4 id="car-price">{{car.price}}.000.000 VNĐ</h4>
                <span>Người bán</span>
                <h4>{{seller.name}}</h4>
                <span>Địa chỉ</span>
                <h4>{{car.address}}</h4>
                <span>Đăng ngày: </span>
                <span class="date-post" v-if="car.created_at">{{car.created_at.substring(0, 10)}}</span>
                <h1>
                  <button type="button" class="btn btn-contact">Liên hệ</button>
                </h1>
                <div class="container container-verified">
                  <h5>CHỨNG NHẬN:</h5>
                  <hr class="hr">
                </div>
                <div class="container">
                  <div class="container container-checked">
                    <div class="row">
                      <div class="col-md-2">
                        <i id="icon-checked" aria-hidden="true" class="fas fa-check-circle"></i>
                      </div>
                      <div class="col-md-10">
                        <h5 id="title-check">XE ĐÃ KIỂM TRA</h5>
                        <span id="span-check">Muaxedi đã kiểm tra xác thực xe này </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="container">
                  <h6 class="expert-check">ĐÁNH GIÁ CỦA CHUYÊN GIA: </h6>
                  <hr class="hr">
                </div>



               <!--  <div class="gauge">
                   <div class="category poor">
                    <span class="char">T</span>
                    <span class="char">Ố</span>
                    <span class="char">T</span>
                    </div>
                    <div class="category fair">
                      <span class="char">K</span>
                      <span class="char">H</span>
                      <span class="char">Á</span>
                      <span class="char"></span>
                      <span class="char">T</span>
                      <span class="char">Ố</span>
                      <span class="char">T</span>
                    </div>
                    <div class="category good">
                      <span class="char">R</span>
                      <span class="char">Ấ</span>
                      <span class="char">T</span>
                      <span class="char"></span>
                      <span class="char">T</span>
                      <span class="char">Ố</span>
                      <span class="char">T</span>
                    </div>
                    <div class="category excellent">
                      <span class="char">T</span>
                      <span class="char">U</span>
                      <span class="char">Y</span>
                      <span class="char">Ệ</span>
                      <span class="char">T</span>
                      <span class="char"></span>
                      <span class="char">V</span>
                      <span class="char">Ơ</span>
                      <span class="char">I</span>
                    </div>
                    <div class="needle" style="--needle-degree:80deg;">
                      
                    </div>
                </div> -->


              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>
</template>
<style src="./Detail.css"></style>
<script src="./Detail.js"></script>
