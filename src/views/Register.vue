<template>
    <div class="row">
        <div class="col-md-5 mx-auto">
            <div class="card">
                <div class="card-header text-center">
                    <h4>Üye Ol</h4>
                </div>
                <div class="card-body">

                    <div class="mb-3">
                        <label for="full_name" class="form-label">Adınız</label>
                        <input v-model="userData.full_name" type="text" placeholder="İsim soyisim" class="form-control"
                            id="examfull_nameple" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">E-posta Adresi</label>
                        <input v-model="userData.email" type="email" class="form-control" id="exampleInputEmail1" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Şifre</label>
                        <input v-model="userData.password" type="password" class="form-control"
                            id="exampleInputPassword1" />
                    </div>

                    <div class="d-grid gap-2">
                        <button type="submit" @click="register" class="btn btn-primary">Hemen Üye
                            Ol!</button>
                    </div>

                </div>
                <div class="card-footer text-center">
                    <router-link to="/login" class="text-primary">Zaten üye misin? Tıklayarak hemen giriş
                        yap!</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            userData: {}
        }
    },

    methods: {
        register() {
            this.$store.dispatch("users/register", { ...this.userData })
        }
    }

}
</script>

<style>

</style>