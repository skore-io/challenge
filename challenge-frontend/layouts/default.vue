<template>
  <v-app light>
    <v-app-bar
      app
      fixed
      color="primary"
      dark
    >
      <v-toolbar-title>
        &copy; Challenge {{ new Date().getFullYear() }}
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; Challenge {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
<style>
html, body, #__nuxt, #__layout, .v-application {
  height: 100%;
}

.v-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.v-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>