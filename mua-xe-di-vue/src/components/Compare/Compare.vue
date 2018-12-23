<template>
  <div id="comparecar">

    <!-- LOADING CONTENT -->
    <div class="scene" v-if="loading">
      <img class="car" src="../../assets/images/car.svg"/>
      <img class="poof" src="../../assets/images/poof.svg"/>
      <img class="sign" src="../../assets/images/sign.svg"/>
      <em>LOADING...</em>
    </div>
    <!-- END LOADING CONTENT -->

    <div class="container" v-else>
    <div class="col-md-9 container comparetitle">
      <div class="row pagetitle">
        <div class="col-md-2 title-left">
            <img src="../../assets/images/comparecar.png" class="img-fluid" alt="Compare Car">
        </div>
        <div class="col-md-7 tile-right">
          <h4 class="title-compare">Compare</h4>
          <p class="service-info">Easy to compare your car</p>
        </div>
      </div>
      <div class="messError" v-if="error">
        <h5>Add car for compare</h5>
      </div>
      <div class="messError" v-if="error2">
        <h5>Add at least 1 car for compare</h5>
      </div>
    </div>

    <table>
      <thead>
      <tr>
        <td id="titlenone"></td>
        <td id="titlecar" v-if="!addcar1">
          <span v-if="compare1">{{carInfo1.brand}} {{carInfo1.model}} {{carInfo1.year}}
            <i class="fa fa-times-circle-o" id="remove-img" aria-hidden="true" @click="removeCar1">x</i></span></td>
        <td id="titlecar" v-if="addcar1">
          <router-link id="btn-addcar" :to="{ name: 'Search'}">Add car</router-link></td>
        <td id="titlecar" v-if="!addcar2">
          <span v-if="compare2">{{carInfo2.brand}} {{carInfo2.model}} {{carInfo2.year}}
            <i class="fa fa-times-circle-o" id="remove-img" aria-hidden="true" @click="removeCar2">x</i></span></td>
        <td id="titlecar" v-if="addcar2">
          <router-link id="btn-addcar" :to="{ name: 'Search'}">Add car</router-link></td>
        <td id="titlecar" v-if="!addcar3">
          <span v-if="compare3">{{carInfo3.brand}} {{carInfo3.model}} {{carInfo3.year}}
            <i class="fa fa-times-circle-o" id="remove-img" aria-hidden="true" @click="removeCar3">x</i></span></td>
        <td id="titlecar" v-if="addcar3">
          <router-link id="btn-addcar" :to="{ name: 'Search'}">Add car</router-link></td>
      </tr>

    </thead>
    <thead>
      <tr>
        <th id="mainpic">
          <img class="mainpic" src="../../assets/images/compare-cars1.png"></th>
        <th id="picproduct">
          <div v-if="compare1" data-target="#carousel" class="thumb">
            <a :href="'/car/'+ carInfo1.id">
              <img class="d-block" id="car-img" :src="image1"></a></div></th>
        <th id="picproduct">
          <div v-if="compare2" data-target="#carousel" class="thumb">
            <a :href="'/car/'+ carInfo2.id">
              <img class="d-block" id="car-img" :src="image2"></a></div></th>
        <th id="picproduct">
          <div v-if="compare3" data-target="#carousel" class="thumb">
            <a :href="'/car/'+ carInfo3.id">
              <img class="d-block" id="car-img" :src="image3"></a></div></th>
      </tr>
    </thead>
    <tbody>
      <tr class="visible-xs" aria-hidden="true">
        <td>&nbsp;</td>
        <td colspan="3">Price</td>
      </tr>
      <tr>
        <td>Price</td>
        <td id="car-price"><span v-if="compare1">{{priceFormat(carInfo1.price)}}.000.000 VNĐ</span></td>
        <td id="car-price"><span v-if="compare2">{{priceFormat(carInfo2.price)}}.000.000 VNĐ</span></td>
        <td id="car-price"><span v-if="compare3">{{priceFormat(carInfo3.price)}}.000.000 VNĐ</span></td>
      </tr>

      <tr class="visible-xs" aria-hidden="true">
        <td>&nbsp;</td>
        <td id="titleinfo" colspan="3">Basic Info</td>
      </tr>
      <tr>
        <td id="titleinfo" colspan="4">Basic Info</td>
      </tr>

      <tr class="visible-xs" aria-hidden="true">
        <td>&nbsp;</td>
        <td colspan="3">Brand</td>
      </tr>
      <tr>
        <td>Brand</td>
        <td><span v-if="compare1">{{carInfo1.brand}}</span></td>
        <td><span v-if="compare2">{{carInfo2.brand}}</span></td>
        <td><span v-if="compare3">{{carInfo3.brand}}</span></td>
      </tr>

      <tr class="visible-xs" aria-hidden="true">
        <td>&nbsp;</td>
        <td colspan="3">Model</td>
      </tr>
      <tr>
        <td>Model</td>
        <td><span v-if="compare1">{{carInfo1.model}}</span></td>
        <td><span v-if="compare2">{{carInfo2.model}}</span></td>
        <td><span v-if="compare3">{{carInfo3.model}}</span></td>
      </tr>

      <tr class="visible-xs" aria-hidden="true">
        <td>&nbsp;</td>
        <td colspan="3">Year</td>
      </tr>
      <tr>
        <td>Year</td>
        <td><span v-if="compare1">{{carInfo1.year}}</span></td>
        <td><span v-if="compare2">{{carInfo2.year}}</span></td>
        <td><span v-if="compare3">{{carInfo3.year}}</span></td>
      </tr>

      <tr class="visible-xs" aria-hidden="true">
        <td>&nbsp;</td>
        <td colspan="3">Color</td>
      </tr>
      <tr>
        <td>Color</td>
        <td><span v-if="compare1">{{carInfo1.color}}</span></td>
        <td><span v-if="compare2">{{carInfo2.color}}</span></td>
        <td><span v-if="compare3">{{carInfo3.color}}</span></td>
      </tr>

      <tr class="visible-xs" aria-hidden="true">
        <td>&nbsp;</td>
        <td colspan="3">Doors number</td>
      </tr>
      <tr>
        <td>Doors number</td>
        <td><span v-if="compare1">{{carInfo1.number_of_doors}}</span></td>
        <td><span v-if="compare2">{{carInfo2.number_of_doors}}</span></td>
        <td><span v-if="compare3">{{carInfo3.number_of_doors}}</span></td>
      </tr>

      <tr class="visible-xs" aria-hidden="true">
        <td>&nbsp;</td>
        <td colspan="3">Seats number</td>
      </tr>
      <tr>
        <td>Seats number</td>
        <td><span v-if="compare1">{{carInfo1.number_of_seats}}</span></td>
        <td><span v-if="compare2">{{carInfo2.number_of_seats}}</span></td>
        <td><span v-if="compare3">{{carInfo3.number_of_seats}}</span></td>
      </tr>

      <tr class="visible-xs" aria-hidden="true">
        <td>&nbsp;</td>
        <td id="titleinfo"colspan="3">Technical Info</td>
      </tr>
      <tr>
        <td id="titleinfo"colspan="4">Technical Info</td>
      </tr>

      <tr class="visible-xs" aria-hidden="true">
        <td>&nbsp;</td>
        <td colspan="3">Transmission type</td>
      </tr>
      <tr>
        <td>Transmission type</td>
        <td><span v-if="compare1">{{carInfo1.transmission_type}}</span></td>
        <td><span v-if="compare2">{{carInfo2.transmission_type}}</span></td>
        <td><span v-if="compare3">{{carInfo3.transmission_type}}</span></td>
      </tr>

      <tr class="visible-xs" aria-hidden="true">
        <td>&nbsp;</td>
        <td colspan="3">Drive type</td>
      </tr>
      <tr>
        <td>Drive type</td>
        <td><span v-if="compare1">{{carInfo1.drive_type}}</span></td>
        <td><span v-if="compare2">{{carInfo2.drive_type}}</span></td>
        <td><span v-if="compare3">{{carInfo3.drive_type}}</span></td>
      </tr>

      <tr class="visible-xs" aria-hidden="true">
        <td>&nbsp;</td>
        <td colspan="3">Fuel type</td>
      </tr>
      <tr>
        <td>Fuel type</td>
        <td><span v-if="compare1">{{carInfo1.fuel_type}}</span></td>
        <td><span v-if="compare2">{{carInfo2.fuel_type}}</span></td>
        <td><span v-if="compare3">{{carInfo3.fuel_type}}</span></td>
      </tr>

      <tr class="visible-xs" aria-hidden="true">
        <td>&nbsp;</td>
        <td colspan="3">Tank capacity</td>
      </tr>
      <tr v-if = "noncompare">
        <td>Tank capacity</td>
        <td><span v-if="compare1">{{carInfo1.tank_capacity}}</span></td>
        <td><span v-if="compare2">{{carInfo2.tank_capacity}}</span></td>
        <td><span v-if="compare3">{{carInfo3.tank_capacity}}</span></td>
      </tr>
      <tr v-if = "compare">
        <td>Tank capacity</td>
        <td v-if="currentcar1 && better"
            :class="{ 'car-better': carInfo1.id === carBetter.tank_capacity[0] || carInfo1.id === carBetter.tank_capacity[1] }">
            <span v-if="compare1">{{carInfo1.tank_capacity}}</span>
        </td>
        <td v-if="!currentcar1"><span v-if="compare1">{{carInfo1.tank_capacity}}</span></td>

        <td v-if="currentcar2 && better"
            :class="{ 'car-better': carInfo2.id === carBetter.tank_capacity[0] || carInfo2.id === carBetter.tank_capacity[1] }">
            <span v-if="compare2">{{carInfo2.tank_capacity}}</span>
        </td>

        <td v-if="!currentcar2"><span v-if="compare2">{{carInfo2.tank_capacity}}</span></td>

        <td v-if="currentcar3 && better"
            :class="{ 'car-better': carInfo3.id === carBetter.tank_capacity[0] || carInfo3.id === carBetter.tank_capacity[1] }">
            <span v-if="compare3">{{carInfo3.tank_capacity}}</span>
        </td>

        <td v-if="!currentcar3"><span v-if="compare3">{{carInfo3.tank_capacity}}</span></td>
      </tr>

      <tr class="visible-xs" aria-hidden="true">
        <td>&nbsp;</td>
        <td colspan="3">Fuel consumption</td>
      </tr>
      <tr v-if = "noncompare">
        <td>Fuel consumption</td>
        <td><span v-if="compare1">{{carInfo1.fuel_consumption}}</span></td>
        <td><span v-if="compare2">{{carInfo2.fuel_consumption}}</span></td>
        <td><span v-if="compare3">{{carInfo3.fuel_consumption}}</span></td>
      </tr>
      <tr v-if = "compare">
        <td>Fuel consumption</td>
        <td v-if="currentcar1 && better"
            :class="{ 'car-better': carInfo1.id === carBetter.fuel_consumption[0] || carInfo1.id === carBetter.fuel_consumption[1] }">
            <span v-if="compare1">{{carInfo1.fuel_consumption}}</span>
        </td>
        <td v-if="!currentcar1"><span v-if="compare1">{{carInfo1.fuel_consumption}}</span></td>

        <td v-if="currentcar2 && better"
            :class="{ 'car-better': carInfo2.id === carBetter.fuel_consumption[0] || carInfo2.id === carBetter.fuel_consumption[1] }">
            <span v-if="compare2">{{carInfo2.fuel_consumption}}</span>
        </td>

        <td v-if="!currentcar2"><span v-if="compare2">{{carInfo2.fuel_consumption}}</span></td>

        <td v-if="currentcar3 && better"
            :class="{ 'car-better': carInfo3.id === carBetter.fuel_consumption[0] || carInfo3.id === carBetter.fuel_consumption[1] }">
            <span v-if="compare3">{{carInfo3.fuel_consumption}}</span>
        </td>

        <td v-if="!currentcar3"><span v-if="compare3">{{carInfo3.fuel_consumption}}</span></td>
      </tr>

      <tr class="visible-xs" aria-hidden="true">
        <td>&nbsp;</td>
        <td colspan="3">Power</td>
      </tr>
      <tr v-if = "noncompare">
        <td>Power</td>
        <td><span v-if="compare1">{{carInfo1.power}}</span></td>
        <td><span v-if="compare2">{{carInfo2.power}}</span></td>
        <td><span v-if="compare3">{{carInfo3.power}}</span></td>
      </tr>
      <tr v-if = "compare">
        <td>Power</td>
        <td v-if="currentcar1 && better"
            :class="{ 'car-better': carInfo1.id === carBetter.power[0] || carInfo1.id === carBetter.power[1] }">
            <span v-if="compare1">{{carInfo1.power}}</span>
        </td>
        <td v-if="!currentcar1"><span v-if="compare1">{{carInfo1.power}}</span></td>

        <td v-if="currentcar2 && better"
            :class="{ 'car-better': carInfo2.id === carBetter.power[0] || carInfo2.id === carBetter.power[1] }">
            <span v-if="compare2">{{carInfo2.power}}</span>
        </td>

        <td v-if="!currentcar2"><span v-if="compare2">{{carInfo2.power}}</span></td>
        <td v-if="currentcar3 && better"
            :class="{ 'car-better': carInfo3.id === carBetter.power[0] || carInfo3.id === carBetter.power[1] }">
            <span v-if="compare3">{{carInfo3.power}}</span>
        </td>

        <td v-if="!currentcar3"><span v-if="compare3">{{carInfo3.power}}</span></td>
      </tr>

      <tr class="visible-xs" aria-hidden="true">
        <td>&nbsp;</td>
        <td colspan="3">Torque</td>
      </tr>
      <tr v-if = "noncompare">
        <td>Torque</td>
        <td><span v-if="compare1">{{carInfo1.torque}}</span></td>
        <td><span v-if="compare2">{{carInfo2.torque}}</span></td>
        <td><span v-if="compare3">{{carInfo3.torque}}</span></td>
      </tr>
      <tr v-if = "compare">
        <td>Torque</td>
        <td v-if="currentcar1 && better"
            :class="{ 'car-better': carInfo1.id === carBetter.torque[0] || carInfo1.id === carBetter.torque[1] }">
            <span v-if="compare1">{{carInfo1.torque}}</span>
        </td>
        <td v-if="!currentcar1"><span v-if="compare1">{{carInfo1.torque}}</span></td>

        <td v-if="currentcar2 && better"
            :class="{ 'car-better': carInfo2.id === carBetter.torque[0] || carInfo2.id === carBetter.torque[1] }">
            <span v-if="compare2">{{carInfo2.torque}}</span>
        </td>

        <td v-if="!currentcar2"><span v-if="compare2">{{carInfo2.torque}}</span></td>

        <td v-if="currentcar3 && better"
            :class="{ 'car-better': carInfo3.id === carBetter.torque[0] || carInfo3.id === carBetter.torque[1] }">
            <span v-if="compare3">{{carInfo3.torque}}</span>
        </td>

        <td v-if="!currentcar3"><span v-if="compare3">{{carInfo3.torque}}</span></td>
      </tr>

      <tr class="visible-xs" aria-hidden="true">
        <td>&nbsp;</td>
        <td colspan="3">Kilometerage</td>
      </tr>
      <tr v-if = "noncompare">
        <td>Kilometerage</td>
        <td><span v-if="compare1">{{carInfo1.kilometerage}}</span></td>
        <td><span v-if="compare2">{{carInfo2.kilometerage}}</span></td>
        <td><span v-if="compare3">{{carInfo3.kilometerage}}</span></td>
      </tr>
      <tr v-if = "compare">
        <td>Kilometerage</td>
        <td v-if="currentcar1 && better"
            :class="{ 'car-better': carInfo1.id === carBetter.kilometerage[0] || carInfo1.id === carBetter.kilometerage[1] }">
            <span v-if="compare1">{{carInfo1.kilometerage}}</span>
        </td>
        <td v-if="!currentcar1"><span v-if="compare1">{{carInfo1.kilometerage}}</span></td>

        <td v-if="currentcar2 && better"
            :class="{ 'car-better': carInfo2.id === carBetter.kilometerage[0] || carInfo2.id === carBetter.kilometerage[1] }">
            <span v-if="compare2">{{carInfo2.kilometerage}}</span>
        </td>

        <td v-if="!currentcar2"><span v-if="compare2">{{carInfo2.kilometerage}}</span></td>

        <td v-if="currentcar3 && better"
            :class="{ 'car-better': carInfo3.id === carBetter.kilometerage[0] || carInfo3.id === carBetter.kilometerage[1] }">
            <span v-if="compare3">{{carInfo3.kilometerage}}</span>
        </td>

        <td v-if="!currentcar3"><span v-if="compare3">{{carInfo3.kilometerage}}</span></td>
      </tr>

      <tr class="visible-xs" aria-hidden="true">
        <td>&nbsp;</td>
        <td colspan="3"></td>
      </tr>
      <tr>
        <td></td>
        <td><button v-if="compare1" type="button" class="btn btn-contact" @click="showSeller1 = true">Contact</button></td>
        <td><button v-if="compare2" type="button" class="btn btn-contact" @click="showSeller2 = true">Contact</button></td>
        <td><button v-if="compare3" type="button" class="btn btn-contact" @click="showSeller3 = true">Contact</button></td>
      </tr>

    </tbody>
  </table>

<!-- pop up seller info -->
<transition name="modal" v-if="showSeller1">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <a @click="cancelModal" class="close-button"></a>
      <div class="modal-container">
        <span class="sellerinfo">Seller</span>
        <br><span>{{seller1.name}}</span></br>
        <span class="sellerinfo">Address</span>
        <br><span>{{carInfo1.address}}</span></br>
        <span class="sellerinfo">Phone</span>
        <div id="phonebox">
        <br><a href="tel:seller1.phone" target="" id="sellerphone">
          <span>{{seller1.phone}}</span>
        </a></br>
        </div>
        <div class="modal-footer">
          <button @click="cancelModal" type="button" class="btn btn-outline-primary" id="btn-modal">OK</button>
        </div>
      </div>
    </div>
  </div>
</transition>

<transition name="modal" v-if="showSeller2">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <a @click="cancelModal" class="close-button"></a>
      <div class="modal-container">
        <span class="sellerinfo">Seller</span>
        <br><span>{{seller2.name}}</span></br>
        <span class="sellerinfo">Address</span>
        <br><span>{{carInfo2.address}}</span></br>
        <span class="sellerinfo">Phone</span>
        <div id="phonebox">
        <br><a href="tel:seller2.phone" target="" id="sellerphone">
          <span>{{seller2.phone}}</span>
        </a></br>
        </div>
        <div class="modal-footer">
          <button @click="cancelModal" type="button" class="btn btn-outline-primary" id="btn-modal">OK</button>
        </div>
      </div>
    </div>
  </div>
</transition>

<transition name="modal" v-if="showSeller3">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <a @click="cancelModal" class="close-button"></a>
      <div class="modal-container">
        <span class="sellerinfo">Seller</span>
        <br><span>{{seller3.name}}</span></br>
        <span class="sellerinfo">Address</span>
        <br><span>{{carInfo3.address}}</span></br>
        <span class="sellerinfo">Phone</span>
        <div id="phonebox">
        <br><a href="tel:seller3.phone" target="" id="sellerphone">
          <span>{{seller3.phone}}</span>
        </a></br>
        </div>
        <div class="modal-footer">
          <button @click="cancelModal" type="button" class="btn btn-outline-primary" id="btn-modal">OK</button>
        </div>
      </div>
    </div>
  </div>
</transition>
<!-- end pop up seller info -->

</div>
  </div>
</template>
<style src="./Compare.css" scoped></style>
<script src="./Compare.js"></script>
