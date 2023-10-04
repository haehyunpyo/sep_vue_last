<template>
  <div class="write">
    <h1>글쓰기</h1>
    <input v-model="title" />
    <textarea v-model="content"></textarea>
    <button @click="write">글쓰기</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: null,
      content: null,
    };
  },
  methods: {
    write() {
      let saveData = {};
      saveData.title = this.title;
      saveData.content = this.content;
      this.$axios
        .post(this.$server+'/write', JSON.stringify(saveData), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          if (res.data.result == 1) {
            alert("데이터베이스에 글을 저장했습니다.");
            //location.href="/boardList";
            this.$router.push("/boardList");
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
.write {
  margin: 0 auto;
  padding: 5px;
  width: 800px;
  height: 500px;
  background-color: bisque;
}

.write input {
  width: 100%;
  height: 30px;
  margin-bottom: 5px;
  box-sizing: border-box;
}

.write textarea {
  width: 100%;
  height: 300px;
  box-sizing: border-box;
}
</style>