<template>
  <div class="update">
    <h1>수정하기</h1>
    <input v-model="title" />
    <textarea v-model="content"></textarea>
    <button @click="update">수정하기</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      requestBody: this.$route.query,
      title: null,
      content: null,
      detail: {
        bno: this.$route.query.bno,
        btitle: '',
        bcontent: '',
      },
    };
  },
  mounted() {
    this.boardDetail();
  },
  methods: {
    boardDetail() {
      this.$axios
        .get(this.$server + "/detail?bno=" + this.$route.query.bno)
        .then((res) => {
          this.detail = res.data.detail;
          this.title = this.detail.btitle;
          this.content = this.detail.bcontent;
        })
        .catch((err) => {
          alert("오류가 발생했습니다." + err);
        });
    },

    update() {
      let saveData = {};
      saveData.title = this.title;
      saveData.content = this.content;
      saveData.bno = this.detail.bno;
      this.$axios
        .patch(this.$server + "/update", JSON.stringify(saveData), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          if (res.data.result == 1) {
            alert("데이터베이스에 글을 저장했습니다.");
            //this.$router.push({path:"/detail", bno: this.$route.query.bno});
            this.$router.push({path: './detail', query:{bno:this.$route.query.bno}});
          } else {
            alert("ooops! 문제가 발생했습니다.");
          }
        })
        .catch((err) => {
          alert("문제가 발생했습니다." + err);
        });
    },
  },
};
</script>

<style>
.update {
  margin: 0 auto;
  padding: 5px;
  width: 800px;
  height: 500px;
  background-color: bisque;
}

.update input {
  width: 100%;
  height: 30px;
}

.update textarea {
  width: 100%;
  height: 300px;
}
</style>