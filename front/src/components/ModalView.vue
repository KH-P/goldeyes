<template>
  <div class="modal">
    <div class="overlay" @click="$emit('close-modal')"></div>
    <div class="modal-card">
        <slot />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
/* Modal */
.modal,
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  display: block;
}
.overlay {
  opacity: 0.5;
  background-color: black;
}
.modal-card {
  position: relative;
  width: 500px;
  max-width: 60%;
  margin: auto;
  margin-top: 100px;
  background-color: white;
  z-index: 10;
  opacity: 1;
  border-radius: 6px;
}
.desc {
  padding: 6px;
  font-size: 14px;
}
.desc-image {
	width: 100%;
	height: 100%;
	border-radius: 4px;
	/* border: 1px solid var(--bs-gray-100); */
	background: var(--bs-gray-100);
	object-fit: contain;
}
.desc-t {
  color: var(--bs-gray-600);
  width: 100px;
  margin-right: 20px;
}
</style>