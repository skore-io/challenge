<template>
  <div class="image-player">
    <img :src="content.url" alt="Imagem" />
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.image-player {
  width: 100%; 
  height: 400px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-player img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
