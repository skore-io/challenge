<template>
  <div>
    <video :src="content.url" controls width="100%"></video>
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