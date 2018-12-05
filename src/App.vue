<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer app />
      <v-toolbar app>title</v-toolbar>
      <v-content>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-content>
      <v-footer app />
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
</style>
