<template>
    <div>
      <iframe :src="content.url" width="100%" height="500px"></iframe>
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