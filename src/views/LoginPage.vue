<template>
  <v-container fill-height style="400px;">
    <v-layout
      align-center
      row
      wrap
      style="margin: 0 auto; width: 400px; height: auto"
    >
      <v-flex x12>
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title> LOGIN </v-toolbar-title>
          </v-toolbar>
          <div class="pa-3">
            <div v-if="idInputCheck" class="idInputCheck">
              ID에 한글과 공백을 사용할 수 없습니다. 5글자 이상입니다.
            </div>
            <v-text-field
              v-model="userId"
              label="ID를 입력하세요."
            ></v-text-field>
            <div v-if="pwInputCheck" class="pwInputCheck">
              암호는 5글자 이상입니다.
            </div>
            <v-text-field
              type="password"
              v-model="userPassword"
              label="암호를 입력하세요."
            ></v-text-field>
            <v-btn class="btn" @click="loginSubmit">login</v-btn>
            <br />
            {{ error }}
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
        token: this.$store.getters.getToken,
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
      if (reg.exec(val) != null || val.search(/\s/) != -1 || val.length < 5) {
        this.userId = this.userId.slice(0, -1);
        this.idInputCheck = true;
      } else {
        this.idInputCheck = false;
      }
    },
    userPassword(val) {
      if (val.length < 5) {
        this.pwInputCheck = true;
      } else {
        this.pwInputCheck = false;
      }
    },
  },
  methods: {
    loginSubmit() {
      if (this.userId.length > 5 && this.userPassword.length > 5) {
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
                    (this.userInfo.token = res.data.token),
                    this.$store.commit("setUser", this.userInfo);
                  this.$router.push("/boardList");
                } else {
                  this.error = "로그인 할 수 없습니다. 올바른 아이디와 암호를 입력하세요.";
                }
              }
            });
        } catch (error) {
          this.error = "로그인 할 수 없습니다. 관리자에게 문의하세요.";
        }
      } else {
        this.error = "올바른 정보를 입력하세요.";
      }
    },
  },
};
</script>

<style>
.v-field__input {
  width: 400px;
}
.idInputCheck,
.pwInputCheck {
  color: red;
}
</style>