<template>
  <div class="pet-service">
    <!-- 加載狀態 -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- 主要內容 -->
    <div v-else class="service-card d-flex justify-content-center">
      <div class="service-content">
        <!-- 頭部信息區域 -->
        <div class="header-section">
          <div class="row align-items-center">
            <div class="freelancer-info d-flex align-items-center">
              <img
                :src="freelancerProfile?.avatar?.[0]"
                :alt="freelancerProfile.name"
                class="freelancer-avatar"
              />
              <div class="freelancer-details">
                <h2 class="freelancer-name">
                  {{ serviceInfo.title }} <span>/ {{ freelancerProfile.name }} </span>
                </h2>
                <div class="rating-section">
                  <div class="stars">
                    <div class="row gx-1 align-items-center">
                      <SvgIcon
                        v-for="star in 5"
                        :key="star"
                        name="star"
                        :color="star <= reviewStatus.avg_rating ? '#FFCF75' : '#FFFFFF'"
                      />
                    </div>
                  </div>
                  <span class="review-count text-black-700">({{ reviewStatus.count }}則評價)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 自我介紹 -->
        <div class="section">
          <div class="section-title text-primary-dark-second fw-bold">自我介紹</div>
          <p class="section-content text-black">{{ freelancerProfile.description }}</p>
        </div>

        <!-- 服務圖片輪播 -->
        <div class="section">
          <div class="image-carousel">
            <div class="carousel-container" ref="carouselContainer">
              <div class="carousel-track">
                <div
                  class="carousel-slide"
                  v-for="(image, index) in serviceInfo.images"
                  :key="index"
                >
                  <img :src="image" :alt="`服務圖片 ${index + 1}`" class="carousel-image" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 服務介紹 -->
        <div class="section info-section">
          <div class="info-title text-primary-dark-second fw-bold">
            <SvgIcon name="paw_group" color="#a77d56" />服務介紹
          </div>
          <div class="info-content text-primary-dark-second">
            {{ serviceInfo.description }}
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <div
                class="rounded-pill bg-primary d-flex justify-content-center align-items-center info-badge"
              >
                <SvgIcon name="datepicker" color="#452B14" />
                <span class="fw-bold text-black"> 服務時間 </span>
              </div>
              <div class="section-content fw-bold text-black-800">
                {{ freelancerProfile.available_weekday_cn }}
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div
                class="rounded-pill bg-primary d-flex justify-content-center align-items-center info-badge"
              >
                <SvgIcon name="map" color="#452B14" />
                <span class="fw-bold text-black"> 服務地區 </span>
              </div>
              <div class="section-content fw-bold text-black-800">
                {{
                  freelancerProfile.address?.slice(0, 3) +
                  ' ' +
                  freelancerProfile.address?.slice(-3)
                }}
              </div>
            </div>
          </div>
        </div>

        <!-- 基本資訊 -->
        <div class="section pet-info-section">
          <div class="section-title text-primary-dark-second fw-bold">服務寵物</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label fw-bold">類型</span>
              <span class="info-value fw-bold text-black-800">{{
                freelancerProfile.allowed_pet_types_cn
              }}</span>
            </div>
            <div class="info-item">
              <span class="info-label fw-bold">體型</span>
              <span class="info-value fw-bold text-black-800">{{
                freelancerProfile.allowed_pet_sizes_cn
              }}</span>
            </div>
            <div class="info-item">
              <span class="info-label fw-bold">年齡</span>
              <span class="info-value fw-bold text-black-800"
                >{{ serviceInfo.allowed_pet_ages?.min }}歲～{{
                  serviceInfo.allowed_pet_ages?.max
                }}歲</span
              >
            </div>
            <div class="info-item">
              <span class="info-label fw-bold">性別</span>
              <span class="info-value fw-bold text-black-800">{{
                freelancerProfile.allowed_pet_genders_cn
              }}</span>
            </div>
          </div>
        </div>
        <div class="section service-info-section">
          <div class="section-title text-primary-dark-second fw-bold">我提供的服務</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label fw-bold">每天尿尿及便便次數</span>
              <span class="info-value fw-bold text-black-800"
                >{{ serviceInfo.extra_options?.pee_poo_times_per_day }}次</span
              >
            </div>
            <div class="info-item">
              <span class="info-label fw-bold">每天散步次數</span>
              <span class="info-value fw-bold text-black-800"
                >{{ serviceInfo.extra_options?.walk_times_per_day }}次</span
              >
            </div>
            <div class="info-item">
              <span class="info-label fw-bold">養護環境</span>
              <span class="info-value fw-bold text-black-800">{{
                serviceInfo.extra_options?.house_type
              }}</span>
            </div>
            <div class="info-item">
              <span class="info-label fw-bold">區域面積坪數</span>
              <span class="info-value fw-bold text-black-800"
                >{{ serviceInfo.extra_options?.outdoor_area_size }}坪</span
              >
            </div>
          </div>
        </div>

        <!-- 評價區域 -->
        <div class="review-section">
          <div class="review-title text-primary-dark-second fw-bold d-flex align-items-center">
            評論 <span class="text-black-700">/{{ reviews.length }}則評價</span>
          </div>
          <div class="review-container">
            <div v-for="review in reviews" :key="review.id" class="review-card">
              <div class="review-header">
                <img :src="review.avatar" :alt="review.name" class="review-avatar" />
                <div class="review-info">
                  <div class="reviewer-name fw-bold text-primary-dark-second">
                    {{ review.name }}
                  </div>
                  <div class="stars">
                    <div class="row gx-1 align-items-center">
                      <SvgIcon
                        v-for="star in 5"
                        :key="star"
                        name="star"
                        :color="star <= serviceProvider.rating ? '#FFCF75' : '#FFFFFF'"
                      />
                    </div>
                  </div>
                </div>
                <span class="review-date text-black-700">{{ review.date }}</span>
              </div>
              <div class="review-comment text-black">{{ review.comment }}</div>
            </div>
          </div>
          <!-- 分頁器-->
          <div class="pagination d-flex justify-content-between align-items-center">
            <!-- Prev -->
            <div class="arrow arrow-left">
              <SvgIcon name="chevron_left" color="#B6B6B6" />
            </div>

            <!-- 分頁列表 -->
            <div class="pages d-flex">
              <div
                v-for="page in 5"
                :key="page"
                class="page fw-bold d-flex justify-content-center align-items-center"
              >
                {{ page }}
              </div>
            </div>

            <!-- Next -->
            <div class="arrow arrow-right">
              <SvgIcon name="chevron_right" color="#B6B6B6" />
            </div>
          </div>
        </div>
      </div>
      <!-- 💡 Fixed Booking 區塊 -->
      <div class="booking-fixed">
        <div class="booking-box">
          <div class="booking-title text-primary-dark-second text-center fw-bold">服務</div>
          <div class="price-info d-flex justify-content-between">
            <div class="service-type text-black-900">
              <SvgIcon name="home_care" color="'#FFFFFF'" />
              到府服務
            </div>
            <div class="price text-primary-dark-second fw-bold">
              NT ${{ serviceInfo.price }}/{{ serviceInfo.price_unit }}
            </div>
          </div>
          <button class="btn btn-book w-100 mt-3" :disabled="bookingLoading">
            <span v-if="bookingLoading" class="spinner-border spinner-border-sm me-2"></span>
            我要預約
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getServiceDetail } from '@/plugins/api/services/services.js'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const weeksCn = ['日', '一', '二', '三', '四', '五', '六']
const bodySizesCn = ['小於10公斤以下', '10公斤以上~20公斤以下', '大於20公斤以上']
const genderCn = ['男生', '女生']
const petCn = ['犬', '貓']

const route = useRoute()
const router = useRouter()
const serviceId = route.params.id

const loading = ref(true)
const bookingLoading = ref(false)

// 響應式數據
const serviceProvider = ref({})
const freelancerProfile = ref({})
const serviceInfo = ref({})
const reviewStatus = ref({})
const reviews = ref([])

// 獲取服務提供者資訊
const fetchServiceDetail = async (id) => {
  try {
    loading.value = true
    const { freelancer_profile, service, review_status } = await getServiceDetail(id)
    freelancer_profile.available_weekday_cn = freelancer_profile?.available_weekdays
      .map((i) => weeksCn[i])
      .join('、')
    freelancer_profile.allowed_pet_sizes_cn = service?.allowed_pet_sizes
      .map((i) => bodySizesCn[i])
      .join('、')
    freelancer_profile.allowed_pet_genders_cn = service?.allowed_pet_genders
      .map((i) => genderCn[i])
      .join('、')
    freelancer_profile.allowed_pet_types_cn = service?.allowed_pet_types
      .map((i) => petCn[i])
      .join('、')
    freelancerProfile.value = freelancer_profile
    serviceInfo.value = service
    reviewStatus.value = review_status
  } catch (error) {
    console.error('獲取服務提供者資訊失敗:', error)
  } finally {
    loading.value = false
  }
}

// 獲取評價資訊
const fetchReviews = async () => {
  try {
    reviews.value = [
      {
        id: 1,
        name: 'YuFang',
        rating: 5,
        date: '2月1日',
        comment: '第6次預約小莫樓的服務，真的是心中最理想的保姆！對待寵物細心且專業。',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      },
      {
        id: 2,
        name: 'MinJun',
        rating: 5,
        date: '1月28日',
        comment: '非常專業的服務，我的狗狗很喜歡她！下次還會再預約。',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      },
    ]
  } catch (error) {
    console.error('獲取評價資訊失敗:', error)
  }
}

// 初始化
onMounted(async () => {
  fetchServiceDetail(serviceId)
  fetchReviews()
})
</script>

<style lang="scss" scoped>
.pet-service {
  min-height: 100vh;
  padding: 20px 0;
}

// 我要預約區域
.booking-fixed {
  position: sticky;
  right: 0;
  top: 104px;
  width: 416px;
  height: 100%;

  .booking-title {
    font-size: 24px;
    margin-bottom: 24px;
  }
  .booking-box {
    padding: 20px;
    border-radius: 20px;
    background-color: #ffffff;
    .service-type {
      font-size: 20px;
      svg {
        width: 28px;
        height: 28px;
      }
    }

    .price {
      font-size: 20px;
    }

    .btn-book {
      background: #ecb88a;
      color: #452b14;
      font-size: 20px;
      border: 2px solid #ecb88a;
      border-radius: 100px;
      padding: 16px 24px;
      font-weight: bold;
      transition: all 0.3s ease;
    }

    .btn-book:hover:not(:disabled) {
      transform: translateY(-2px);
    }
  }
}

// 服務圖片
.image-carousel {
  margin: 60px 0 80px;
}

.carousel-container {
  position: relative;
  overflow: hidden;
  height: 300px;
}

.carousel-track {
  display: flex;
  height: 100%;
}

.carousel-slide {
  width: calc(33.33% - 16px);
  height: 100%;
  margin-right: 24px;
  &:last-child {
    margin-right: 0;
  }
}

.carousel-image {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
}

//主要內容
.service-card {
  position: relative;
  padding: 30px 0;
}

.service-content {
  width: calc(100% - 416px);
  margin-right: 24px;
}

.header-section {
  margin-bottom: 40px;
  // 評論星星樣式
  .stars svg {
    width: 32px;
    height: 32px;
    margin-right: 8px;
  }

  .rating-section {
    display: flex;
    align-items: flex-end;
    gap: 10px;
  }

  .review-count {
    font-size: 16px;
  }
}

.freelancer-avatar {
  width: 196px;
  height: 196px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #a87d57;
  margin-right: 24px;
}

.freelancer-name {
  font-size: 24px;
  font-weight: 700;
  color: #452b14;
  margin-bottom: 20px;

  span {
    font-size: 20px;
    color: #a87d57;
    margin-left: 16px;
  }
}

.section {
  margin-bottom: 12px;

  .section-title {
    position: relative;
    font-size: 20px;
    padding-left: 12px;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      width: 4px;
      height: 20px;
      border-radius: 100px;
      background-color: #a87d57;
    }
  }

  .section-content {
    max-width: 506px;
    font-size: 16px;
  }
}

.info-section {
  margin-bottom: 84px;
  .info-title {
    font-size: 24px;
    padding-bottom: 12px;
    margin-bottom: 20px;
    border-bottom: 2px solid #a87d57;
    svg {
      width: 32px;
      height: 30px;
      margin-right: 12px;
    }
  }
  .info-content {
    font-size: 16px;
    line-height: 1.8;
    margin-bottom: 28px;
    white-space: pre-line;
  }
  .info-badge {
    width: 113px;
    height: 32px;
    font-size: 16px;
    margin-bottom: 12px;
    svg {
      width: 24px;
      height: 24px;
      margin-right: 4px;
    }
  }
}

.info-grid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-label {
  width: fit-content;
  color: #ffffff;
  padding: 4px 12px;
  border-radius: 100px;
  background-color: #a87d57;
  font-size: 16px;
}

.service-info-section {
  margin: 100px 0 88px;
}

//評論
.review-section {
  padding: 16px;
  border-radius: 20px;
  background-color: rgba(#ffffff, 0.7);

  .review-title {
    font-size: 24px;
    padding-bottom: 12px;
    margin-bottom: 28px;
    border-bottom: 2px solid #a87d57;
    span {
      font-size: 16px;
      margin-left: 12px;
    }
  }

  .review-container {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .review-header {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
  }

  .review-avatar {
    width: 86px;
    height: 86px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 12px;
  }

  .review-info {
    flex: 1;
  }

  .reviewer-name {
    margin-bottom: 12px;
  }

  // 評論星星樣式
  .stars svg {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  .pagination {
    margin-top: 40px;

    .page {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      font-size: 20px;
      margin-right: 8px;
      &:last-child {
        margin-right: 0;
      }
      &.active {
        background-color: #ecb88a;
      }
    }
    .arrow {
      svg {
        width: 44px;
        height: 44px;
      }
    }
  }
}

@media (max-width: 768px) {
  // 我要預約區域
  .booking-fixed {
    position: fixed;
    right: 0;
    left: 0;
    top: auto;
    bottom: 0;
    width: 100%;
    height: auto;

    .booking-title {
      font-size: 20px;
      margin-bottom: 16px;
    }

    .booking-box {
      padding: 12px;
      border-radius: 20px 20px 0 0;
      box-shadow: 0 0 8px 0 rgba(#000000, 0.15);
      .service-type {
        font-size: 16px;
        svg {
          width: 24px;
          height: 24px;
        }
      }

      .price {
        font-size: 16px;
      }

      .btn-book {
        background: #ecb88a;
        color: #452b14;
        font-size: 20px;
        border: 2px solid #ecb88a;
        border-radius: 100px;
        padding: 8px 24px;
        font-weight: bold;
        transition: all 0.3s ease;
      }
    }
  }

  // 服務圖片
  .image-carousel {
    margin: 20px 0 32px;
  }

  .carousel-container {
    height: 160px;
  }

  .carousel-slide {
    width: calc(33.33% - 8px);
    margin-right: 12px;
  }

  //主要內容
  .service-card {
    margin: 0;
    padding: 0;
  }

  .service-content {
    width: 100%;
    margin-right: 0;
  }

  .header-section {
    // 評論星星樣式
    .stars svg {
      width: 16px;
      height: 16px;
    }

    .rating-section {
      align-items: center;
    }

    .review-count {
      font-size: 12px;
    }
  }

  .freelancer-avatar {
    width: 100px;
    height: 100px;
    border: 2px solid #a87d57;
  }

  .freelancer-name {
    font-size: 20px;
    margin-bottom: 4px;

    span {
      margin-left: 8px;
    }
  }

  .section {
    .section-title {
      font-size: 16px;
      &:before {
        height: 16px;
      }
    }

    .section-content {
      max-width: 100%;
    }
  }

  .info-section {
    margin-bottom: 24px;
    .info-title {
      font-size: 16px;
      padding-bottom: 8px;
      margin-bottom: 12px;
      border-bottom: 1px solid #a87d57;
      svg {
        width: 24px;
        height: 22px;
      }
    }
    .info-content {
      margin-bottom: 24px;
    }
    .info-badge {
      width: 93px;
      height: 29px;
      font-size: 14px;
      margin-bottom: 8px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .info-item {
    gap: 8px;
  }

  .info-label {
    padding: 4px 8px;
    border-radius: 100px;
    font-size: 14px;
  }

  .service-info-section {
    margin: 40px 0 44px;
  }
  //評論
  .review-section {
    padding: 12px;
    background-color: #f9eadc;
    border: 1px solid #a87d57;
    .review-title {
      font-size: 20px;
      padding-bottom: 8px;
      margin-bottom: 24px;
      border-bottom: 1px solid #a87d57;
      span {
        font-size: 14px;
      }
    }
    .review-container {
      gap: 28px;
    }

    .review-header {
      margin-bottom: 12px;
    }

    .review-avatar {
      width: 68px;
      height: 68px;
    }

    .reviewer-name {
      margin-bottom: 8px;
    }

    // 評論星星樣式
    .stars svg {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }

    .review-date {
      font-size: 14px;
    }
    .pagination {
      margin-top: 28px;

      .page {
        width: 32px;
        height: 32px;
        font-size: 16px;
      }
      .arrow {
        svg {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
}
</style>
