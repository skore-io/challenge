<template>
    <div class="link-player">
      <a :href="content.url" target="_blank">{{ content.description }}</a>
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
  .link-player {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    font-size: 1.5em;
    word-wrap: break-word;
    background-color: #FEFEFE;
  }
  
  .link-player a {
    text-decoration: none;
    color: #007BFF;
  }
  </style>
  