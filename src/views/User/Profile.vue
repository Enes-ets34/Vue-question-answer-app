<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 mx-auto">
        <div class="card">
          <div
            class="card-header d-flex justify-content-between align-items-center "
          >
            <h3 v-if="!editProfile">{{ user.name }}</h3>
            <i
              v-if="!editProfile"
              @click.prevent="editProfile = true"
              class="far fa-edit ms-1 text-primary"
            ></i>

            <input
              v-if="editProfile"
              type="text"
              v-model="user.name"
              class="form-control"
            /><a
              v-if="editProfile"
              class="text-danger ms-2"
              href="#"
              @click.prevent="editProfile = false"
              >İptal</a
            >
          </div>
          <div class="card-body">
            <h4>bio</h4>
            <p v-if="!editProfile" v-html="user.bio"></p>
            <quill-editor v-else v-model:value="user.bio"></quill-editor>
          </div>
          <div class="card-body">
            <h4>İlgi Alanı</h4>
            <p>{{ user?.category?.title }}</p>
          </div>
          <button
            v-if="editProfile"
            @click="updateProfile"
            class="btn btn-warning"
          >
            Güncelle
          </button>
          <div class="card-footer">
            <small>
              <a
                v-if="!changePassword"
                @click.prevent="changePassword = true"
                href="#"
                >Şifreyi değiştir</a
              >
              <a
                v-if="changePassword"
                @click.prevent="changePassword = false"
                href="#"
                class="text-danger"
                >İptal</a
              >
            </small>
            <div v-if="changePassword" class="form-group">
              <small>şifre</small>
              <input
                type="password"
                placeholder="****"
                class="form-control mb-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { appAxios } from "../../utils/appAxios";
export default {
  computed: {
    ...mapGetters({
      currentUser: "users/currentUser"
    })
  },
  data() {
    return {
      changePassword: false,
      editProfile: false,
      user: null,
      updatedInfo: null
    };
  },

  methods: {
    updateProfile() {
      appAxios
        .patch(`/users/${this.currentUser.id}`, {
          bio: this.updatedInfo.bio,
          name: this.updatedInfo.name
        })
        .then(res => {
          this.editProfile = false;
          console.log(res?.data);
        })
        .catch(err => console.error(err));
    }
  },
  computed: {
    ...mapGetters({
      currentUser: "users/currentUser"
    })
  },
  created() {
    appAxios.get(`users/${this.currentUser.id}?_expand=category`).then(res => {
      this.user = { ...res?.data };
      console.log(this.user);
    });
  },
  watch: {
    editProfile(editProfile) {
      if (editProfile) {
        this.updatedInfo = { ...this.user };
        console.log(this.updatedInfo);
      } else {
        this.updatedInfo = null;
      }
    }
  }
};
</script>

<style></style>
