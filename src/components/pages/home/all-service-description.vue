<script setup>
import SvgIcon from '@/components/svg-icon/svg-icon.vue'
</script>
<template>
<div class="position-relative w-100 bg-secondary-tint home-service py-4 d-flex">
  <div class="home-service-blush">
    <img class="w-100 h-100" src="@/assets/images/home/blush_left.png" alt="">
  </div>
  <div class="container home-service-section">
    <div class="d-flex flex-column align-items-center">
      <div class="d-flex align-items-center">
        <SvgIcon name="paw_group" :size="56" color="#A87D57" />
        <div class="px-2">
          <h5 class="home-title">所有服務說明</h5>
        </div>
      </div>
      <div class="w-100 py-5">
        <div class="row">
          <div class="col-5">
            <div class="w-100 home-service-img">
              <img class="w-100" src="@/assets/images/home/service_description.png" alt="">
            </div>
          </div>
          <div class="col-7">
            <div class="w-100 h-100 d-flex justify-content-between">
              <div class="row">
                <div class="col-12">
                  <div class="row">
                    <div class="col-5">
                      <div class="d-flex">
                        <SvgIcon class="me-2" name="pet_grooming" :size="36" color="#452B14" />
                        <p class="home-service-subTitle">寵物美容</p>
                      </div>
                    </div>
                    <div class="col-7">
                      <p class="home-service-text">專業洗澡 - 深層清潔，呵護敏感肌膚</p>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="row">
                    <div class="col-5">
                      <div class="d-flex">
                        <SvgIcon class="me-2" name="pet_boarding" :size="36" color="#452B14" />
                        <p class="home-service-subTitle">寵物寄宿/日托</p>
                      </div>
                    </div>
                    <div class="col-7">
                      <p class="home-service-text">溫馨寄宿 - 舒適寬敞的環境，讓毛孩自在放鬆</p>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="row">
                    <div class="col-5">
                      <div class="d-flex">
                        <SvgIcon class="me-2" name="home_care" :size="36" color="#452B14" />
                        <p class="home-service-subTitle">到府照顧</p>
                      </div>
                    </div>
                    <div class="col-7">
                      <p class="home-service-text">專人照顧 - 專業飼養員全天陪伴，隨時關注寵物狀態</p>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="row">
                    <div class="col-5">
                      <div class="d-flex">
                        <SvgIcon class="me-2" name="pet_walking" :size="36" color="#452B14" />
                        <p class="home-service-subTitle">寵物散步</p>
                      </div>
                    </div>
                    <div class="col-7">
                      <p class="home-service-text">戶外散步 - 定期帶毛孩出門運動，保持健康與活力</p>
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
  <div class="home-service-blush right">
    <img class="w-100 h-100" src="@/assets/images/home/blush_right.png" alt="">
  </div>
</div>
</template>
