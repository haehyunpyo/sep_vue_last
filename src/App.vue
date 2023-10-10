<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <!-- 메뉴 -->
      메뉴<br />
      메뉴<br />
      메뉴<br />
      메뉴<br />
    </v-navigation-drawer>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>poseidon</v-app-bar-title>
      <v-btn variant="text" prepend-icon="mdi-format-list-bulleted-square"
        ><router-link to="/boardList">BOARD</router-link></v-btn
      >
      <v-btn variant="text" prepend-icon="mdi-home"
        ><router-link to="/">HOME</router-link></v-btn
      >
      <v-btn variant="text" prepend-icon="mdi-account"
        ><router-link to="/login">LOGIN</router-link></v-btn
      >
    </v-app-bar>
    <v-main>
      <!-- 화면에 보여지는 부분 -->
      <router-view />
    </v-main>
    <v-footer> 하단에 보여지는 부분 </v-footer>
  </v-app>
</template>
<script setup>
import { ref } from "vue";
const drawer = ref(null);
</script>
<script>
export default {
  data: () => ({ drawer: null }),
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: white;
}
</style>
