<script setup>
  import Modal from '@/components/modal/owner-modal.vue'
  import PetModal from '@/components/modal/owner-pet-modal.vue'
  import { ref , onMounted } from 'vue'
  import { useRouter } from 'vue-router';
  import { PatchOwnerProfile, GetOwnerProfile } from '@/plugins/api/users/users.js';
  import { useLoginStore } from '@/stores/login.js';
  import { useToast } from '@/plugins/toast/toast-plugin.js'

  const toast = useToast()
  const loading = ref(true);
  const router = useRouter();
  const thisModal = ref();
  const thisPetModal = ref();
  const owner = ref({})

  const editProfile = () => {
    // alert('進入編輯模式')
    showModal();
  }

  const addPetProfile = () => {
    // alert('跳轉新增毛小孩頁面')
    showPetModal();
  }

  const submitOwner = async (updatedOwner) => {
    try {
      //console.log("送出資料：", updatedOwner)
      const response = await PatchOwnerProfile(updatedOwner);
      //console.log('送出成功:', response.data);
      toast.show('更新成功', 'success')
      //thisModal.value.p_hide(); // 關閉 Modal
      owner.value = Object.assign({}, owner.value, updatedOwner);


    } catch (error) {
      //console.error('送出失敗:', error);
      alert('更新失敗，請稍後再試。');
    }
  }

  const submitPet = async (data) => {
    try {
      console.log("submitPet");
      console.log(data);
    } catch (error) {
      console.error('送出失敗:', error);
    }
  }

  onMounted(async () => {
    const loginStore = useLoginStore();
    if (!loginStore.is_login || loginStore.user.role !== 'owner') {
        await router.push('/login')
        return
    }


    try {
      const response = await GetOwnerProfile();
      console.log(response)
      owner.value = response.user;
      //console.log("取得的 owner:", owner.value);
    } catch (err) {
      console.error('取得個人資料失敗:', err);
      err.value = '無法取得個人資料，請稍後再試。';
    } finally {
      loading.value = false;
    }
  });


  function showModal() {
    console.log("Modal打開");
    thisModal.value.p_show()
  }
  function showPetModal() {
    console.log("PetModal打開");
    thisPetModal.value.p_show()
  }
</script>
<template>
  <main>
    <div class="container py-5">
      <h2 class="text-center mb-4">飼主及毛小孩個人中心</h2>
      <div class="card mx-auto p-4" style="max-width: 700px; border-radius: 20px;">
        <div class="d-flex flex-column flex-md-row">
          <img :src="owner.avatar" alt="飼主照片" class="rounded img-fluid me-md-4 mb-3 mb-md-0" style="max-width: 250px; height: auto;" />
          <div class="flex-fill">
            <div class="text-end">
              <button class="btn btn-outline-secondary btn-sm" @click="editProfile">
                <i class="bi bi-pencil-square"></i>
              </button>
            </div>
            <p><strong>飼主名稱:</strong>{{ owner.name }}</p>
            <p><strong>所在縣市:</strong>{{ owner.city }}</p>
            <p><strong>所在地區:</strong>{{ owner.area }}</p>
            <p><strong>電話:</strong>{{ owner.phone }}</p>
            <div v-if="!loading && owner.email">
              <p><strong>Email:</strong>{{ owner.email }}</p>
            </div>
            <p><strong>自我介紹:</strong>{{ owner.description }}</p>
          </div>
        </div>
      </div>

      <div class="text-center mt-4">
        <button class="btn btn-success rounded-pill px-4 py-2" @click="addPetProfile">
          <i class="bi bi-plus-circle me-2"></i>新增毛小孩資訊
        </button>
      </div>

      <div class="card mx-auto my-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="" class="img-fluid rounded-start" alt="...">
            <div>111</div>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal title="modal1" ref="thisModal" :ownerData="owner" @submit-owner="submitOwner">
      <template #body>編輯 個人資訊</template>
    </Modal>
    <PetModal title="petModal1" ref="thisPetModal" @submit-pet="submitPet">
      <template #body>新增毛小孩資訊</template>
    </PetModal>
  </main>
</template>
<style scoped>
  .card {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
</style>
