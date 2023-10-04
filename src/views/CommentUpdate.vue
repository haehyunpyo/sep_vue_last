<template>
  <div class="update">
    <h1>댓글 수정하기</h1>
    
    <textarea v-model="comment"></textarea>
    <button @click="update">수정하기</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      requestBody: this.$route.query,
      comment: '',
    };
  },
  mounted() {
    this.commentDetail(this.$route.query.cno);
  },
  methods: {
    commentDetail(cno) {
      this.$axios
        .get(this.$server + "/commentDetail?cno=" + cno)
        .then((res) => {
          this.comment = res.data.c_comment;
          //alert(res.c_comment);
        })
        .catch((err) => {
          alert("오류가 발생했습니다." + err);
        });
    },

    update() {
      let comment = {};
      comment.comment = this.comment;
      comment.cno = this.requestBody.cno;
      this.$axios
        .put(this.$server + "/commentUpdate", JSON.stringify(comment),
          {headers: { "Content-Type": "application/json" },})
        .then((res) => {
          if (res.data.result == 1) {
            this.$router.push({path: "/detail", query: this.requestBody});
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