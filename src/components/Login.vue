<template>
  <div class="card ">
    <div class="card-header text-center">
      <h4>Kayıt Ol</h4>
    </div>
    <div class="card-body">
      <div class="form-group">
        <div class="mb-3">
          <label class="form-label"><small>Adınız ve Soyadınız</small></label>
          <input type="text" placeholder="Ad Soyad..." class="form-control" />
        </div>
        <div class="mb-3">
          <label class="form-label"><small>E-Posta Adresiniz</small></label>
          <input
            type="mail"
            placeholder="ornek@example.com..."
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label class="form-label"
            ><small>İlgi Duyduğunuz Kategoriler</small></label
          >
          <select class="form-select" aria-label="Default select example">
            <option selected disabled>Kategori Seçiniz...</option>
            <option value="Vue.js">Vue.js</option>
            <option value="React.js">React.js</option>
            <option value="Angular.js">Angular.js</option>
          </select>
        </div>
        <div class="d-grid gap-2">
            <button class="btn btn-warning">Kayıt Ol !</button>
        </div>
      </div>
    </div>
    <div class="card-footer">
        <small><a href="#" class="text-primary">Zaten Üyeyim</a></small>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
