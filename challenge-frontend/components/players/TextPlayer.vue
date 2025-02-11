<template>
  <div class="text-player">
    <h1>{{ content.title }}</h1>
    <p>{{ content.contentBody }}</p>
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
.text-player {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  overflow-y: auto;
  background-color: #FEFEFE;
}

.text-player h1 {
  font-size: 2em; 
  margin: 0.5em 0;
  color: #000000;
}

.text-player p {
  font-size: 1em;
  color: #000000;
}
</style>
