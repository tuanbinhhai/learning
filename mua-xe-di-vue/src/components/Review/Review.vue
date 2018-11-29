<template>
<div id="Review">
  <!-- LOADING CONTENT -->
  <div class="scene" v-if="loading">
    <img class="car" src="../../assets/images/car.svg" />
    <img class="poof" src="../../assets/images/poof.svg" />
    <img class="sign" src="../../assets/images/sign.svg" />
    <em>Loading</em>
  </div>
  <!-- END LOADING CONTENT -->

  <div class="container" v-else>
    <!-- WAITING! Pagination -->
    <div id="pages"
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

    <div class="row">
      <div class="row col-md-10 review-row" v-for="review in reviews_array">
        <a v-bind:href="review.url" target="_blank" id="reviewcell">
          <div class="row">
            <div class="col-md-4">
              <img :src="review.image" class="img-fluid img-review">
            </div>
            <div class="col-md-8 text-left reviewtitle">
              <b><span class="review-name">{{review.title}}</span></b>
              <br><span>Nguồn: {{review.url}} </span>
            </div>
          </div>
        </a>
      </div>
    </div>

    <!-- WAITING! Pagination -->
    <div id="pages"
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
         @change="pageChanged">
    </div>
    <!-- WAITING! Pagination -->
  </div>
</div>
</template>
<style src="./Review.css"></style>
<script src="./Review.js"></script>
