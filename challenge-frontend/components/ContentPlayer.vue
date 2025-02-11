<template>
  <div class="content-player">
    <div v-if="content">
      <h2>{{ content.title }}</h2>
      <p>{{ content.description }}</p>

      <hr class="dividerbar" />

      <!-- Exibe o conteúdo com base no tipo -->
      <component :is="contentComponent" :content="content" @completed="$emit('content-completed')" />
    </div>
    <div v-else>
      <p>Selecione um conteúdo para começar.</p>
    </div>
  </div>
</template>

<script>
import PdfPlayer from './players/PdfPlayer.vue';
import VideoPlayer from './players/VideoPlayer.vue';
import ImagePlayer from './players/ImagePlayer.vue';
import TextPlayer from './players/TextPlayer.vue';
import LinkPlayer from './players/LinkPlayer.vue';

export default {
  props: {
    content: {
      type: Object,
      default: null,
    },
  },
  computed: {
    // Encaminha pro componente do tipo de player correto
    contentComponent() {
      switch (this.content.type) {
        case 'pdf':
          return PdfPlayer;
        case 'video':
          return VideoPlayer;
        case 'image':
          return ImagePlayer;
        case 'text':
          return TextPlayer;
        case 'link':
          return LinkPlayer;
        default:
          return null;
      }
    },
  },
};
</script>

<style scoped>
.content-player {
  flex: 1;
  padding: 20px;
  background-color: #fbfcfee8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 80vh; 
  overflow: auto; 
}

.content-player h2 {
  color: #000000;
  margin-bottom: 10px; 
}

.content-player p {
  color: #000000;
  margin-top: 10px;
}

.dividerbar {
  border: 0; 
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(189, 88, 214, 0) 0%,
    rgba(189, 88, 214, 1) 50%,
    rgba(189, 88, 214, 0) 100%
  ); 
  box-shadow: 0 2px 4px rgba(189, 88, 214, 0.3);
  margin: 10px 0; 
}
</style>