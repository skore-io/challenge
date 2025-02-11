<template>
  <div class="course-page">
    <div v-if="error">
      <p style="color: red;">{{ error }}</p>
    </div>

    <div class="course-container">
      <!-- Contêiner da lista de conteúdos e barra de progresso -->
      <div class="content-list-container">
        <ProgressBar :progress="progressPercentage" />
        <ContentList
          :contents="contents"
          :selectedContentId="selectedContentId"
          @select-content="handleSelectContent"
          @item-clicked="handleItemClicked"
        />
      </div>

      <!-- Player de conteúdo -->
      <ContentPlayer :content="selectedContent" />
    </div>
  </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar.vue';
import ContentList from '@/components/ContentList.vue';
import ContentPlayer from '@/components/ContentPlayer.vue';

export default {
  components: {
    ProgressBar,
    ContentList,
    ContentPlayer,
  },
  data() {
    return {
      contents: [],
      selectedContentId: null,
      clickedItems: [], // Armazena os IDs dos itens clicados
      error: null,
    };
  },
  computed: {
    // Retorna o conteúdo selecionado
    selectedContent() {
      return this.contents.find((content) => content.id === this.selectedContentId);
    },
    // Calcula a porcentagem de itens clicados
      progressPercentage() {
      if (this.contents.length === 0) return 0;
      console.log('Bateu na percentage:', Math.round((this.clickedItems.length / this.contents.length) * 100));
      return Math.round((this.clickedItems.length / this.contents.length) * 100);
      },
  },
  async created() {
    await this.loadContents();
  },
  methods: {
    // Carrega os conteúdos
    async loadContents() {
      const contentIds = [
        '26a42e72-cc93-44b3-acae-01537a36322b',
        '3a5a94aa-17da-4e9a-b493-fe7e81294631',
        '4372ebd1-2ee8-4501-9ed5-549df46d0eb0',
        '6969d6c7-40ea-4a3c-b635-d6546b971304',
        '7acff1c5-4c43-4923-a323-d22a12573041',
        'd060ab17-c961-4de7-929f-a0d52aa3ecf4',
        '88a269f7-3cd8-41d1-8ec0-09969ff11ea1',
      ];

      try {
        this.contents = await Promise.all(
          contentIds.map(async (id) => {
            try {
              const query = `
                query Provision($contentId: String!) {
                  provision(content_id: $contentId) {
                    id
                    title
                    description
                    contentBody
                    url
                    type
                    bytes
                    metadata
                  }
                }
              `;
              const variables = { contentId: id };

              console.log(`Enviando requisição para ID=${id}`);
              const response = await this.$graphql.request(query, variables);
              console.log(`Resposta recebida para ID=${id}:`, response);

              return { ...response.provision, clicked: false }; // Adiciona a propriedade "clicked"
            } catch (error) {
              console.error(`Erro ao buscar conteúdo com ID ${id}:`, error);
              return null;
            }
          })
        );

        this.contents = this.contents.filter((content) => content !== null);
      } catch (error) {
        console.error('Erro ao carregar conteúdos:', error);
      }
    },
    // Atualiza o conteúdo selecionado
    handleSelectContent(contentId) {
      this.selectedContentId = contentId;
    },
    // Marca o item como clicado
    handleItemClicked(contentId) {
      if (!this.clickedItems.includes(contentId)) {
        this.clickedItems.push(contentId); // Adiciona o ID ao array de itens clicados
      }
    },
  },
};
</script>

<style scoped>
.course-page {
  background-color: #FBFCFE;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
}

.course-container {
  display: flex;
  flex: 1;
  gap: 20px;
  overflow: hidden; /* Evita que o conteúdo ultrapasse o contêiner */
}

.content-list-container {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Espaço entre a barra de progresso e a lista */
  min-width: 250px; /* Largura mínima */
  max-width: 400px; /* Largura máxima */
}
</style>