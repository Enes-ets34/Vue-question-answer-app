<template>
  <div
    class=" loading-container d-flex justify-content-center align-items-center"
  >
    <div
      class="spinner-border text-dark m-5"
      style="width: 3rem; height: 3rem;"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(216, 216, 216, 0.5);
}
</style>
