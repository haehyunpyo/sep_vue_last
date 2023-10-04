<!-- MenuPage.vue 메뉴바를 생성하고 화면에 보여줍니다. -->
<template>
  <header>
    <nav class="nav">
      <ul>
        <li><router-link to="/">index</router-link></li>
        <li><router-link to="/main">main</router-link></li>
        <li><router-link to="/boardList">게시판</router-link></li>
        <li class="lir" v-if="this.$store.getters.getUserId == null">
          <router-link to="/join">join</router-link>
        </li>
        <li class="lir" v-if="this.$store.getters.getUserId == null">
          <router-link to="/login">login</router-link>
        </li>
        <li @click="logout" class="lir" v-if="this.$store.getters.getUserId != null">logout</li>
        <li class="lir" v-if="this.$store.getters.getUserId != null">
          <router-link to="/myInfo">myInfo</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "MenuPage",
  methods:{
    logout(){
      if(confirm('로그아웃 하시겠습니까?')){
        this.$store.commit("logout"); //로그아웃 작업
        this.$router.push("/login");  // 페이지 이동
      }
    }
  }
};
</script>

<style>
/* nav 를 fixed 로 하였기 때문에 높이를 높여 영역을 확보하게 합니다 */
body {
  margin: 0;
  padding: 0;
}
header {
  height: 00px;
}
nav {
  position: fixed;
  top: 0;
  width: 100%;
  height: 30px;
  background-color: gray;
}
nav ul {
  margin: 0;
  padding: 0;
}
nav li {
  list-style: none;
  float: left;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
nav li:hover {
  font-weight: bold;
}
a {
  text-decoration: none;
  color: white;
}
.lir {
  float: right;
  width: 80px;
}
</style>
