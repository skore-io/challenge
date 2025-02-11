<template>
  <div class="content-list">
    <h3>Conteúdos do Curso</h3>
    <ul>
      <li
        v-for="content in contents"
        :key="content.id"
        :class="{ active: content.id === selectedContentId, clicked: content.clicked }"
        @click="handleClick(content.id)"
      >
        {{ content.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    contents: {
      type: Array,
      required: true,
    },
    selectedContentId: {
      type: String,
      default: null,
    },
  },
  methods: {
    handleClick(contentId) {
      // Marca o item como clicado
      const content = this.contents.find((c) => c.id === contentId);
      if (content && !content.clicked) {
        content.clicked = true;
        this.$emit('item-clicked', contentId); // Emite um evento para o componente pai
      }
      this.$emit('select-content', contentId); // Emite o evento para selecionar o conteúdo
    },
  },
};
</script>

<style scoped>
.content-list {
  min-width: 250px;
  max-width: 400px; 
  padding: 10px;
  border-radius: 8px;
  background-color: #FEFEFE;
  color: rgb(189, 88, 214);
  overflow-y: auto;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  color: #391688;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 5px;
  border: 2px solid;
  border-color: #F5F6FA;
  transition: all 0.3s ease;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  width: 100%;
  box-sizing: border-box; 
}

li.clicked {
  background-color: #A379C4; 
  color: white;
}

li.active {
  background-color: #F6F7FB;
  color: #391688;
  border-color: #BBB7C7;
}

li:hover {
  color: #391688;
  background-color: #ffCB00;
  border-color: #ffCB00;
  
}
h3{
  color: #230B45;
}
</style>