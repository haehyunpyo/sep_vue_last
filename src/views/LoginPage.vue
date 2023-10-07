<template>
  <div class="login">
    <h1>login</h1>
    <input v-model="userId" type="text" />
    <div v-if="idInputCheck" class="idInputCheck">
      ID에 한글과 공백을 사용할 수 없습니다.
    </div>
    <input v-model="userPassword" type="password" />
    <div v-if="pwInputCheck" class="pwInputCheck">암호는 5글자 이상입니다.</div>
    <button class="btn" @click="loginSubmit">LOGIN</button>
    {{ error }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: null,
      userPassword: null,
      error: "",
      userInfo: {
        m_name: this.$store.getters.getUserName,
        m_id: this.$store.getters.getUserId,
      },
      idInputCheck: false,
      pwInputCheck: false,
    };
  },
  // Vue 인스턴스의 데이터 변경을 관찰 / 반응
  watch: {
    userId(val) {
      const reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
      //this.error = reg.exec(val);
      if (reg.exec(val) != null || val.search(/\s/) != -1) {
        this.idInputCheck = true;
        return (this.userId = this.userId.slice(0, -1));
      }
      
    },
    userPassword(val) {
      if (val.length < 4) {
        this.pwInputCheck = true;
      } else {
        this.pwInputCheck = false;
      }
    },
  },

  methods: {
    loginSubmit() {
      //alert(this.userId + ":" + this.userPassword);
      let login = {};
      (login.userId = this.userId), (login.userPassword = this.userPassword);
      try {
        this.$axios
          .post(this.$server + "/login", JSON.stringify(login), {
            headers: { "Content-Type": `application/json` },
          })
          .then((res) => {
            if (res.status === 200) {
              if (res.data.count == 1) {
                (this.userInfo.m_name = res.data.m_name),
                  (this.userInfo.m_id = login.userId),
                  this.$store.commit("setUser", this.userInfo);
                this.$router.push("/boardList");
              } else {
                this.error = "올바른 아이디와 암호를 입력하세요.";
              }
            }
          });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.login {
  margin: 0 auto;
  width: 300px;
  height: 300px;
  background-color: gray;
  padding: 10px;
}
.login input,
button {
  border: 0px;
  width: 100%;
  height: 30px;
  padding: 5px;
  margin-bottom: 5px;
  box-sizing: border-box;
}
</style>
