<template>
  <link
    rel="stylesheet"
    href="//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css"
  />
  <div class="detail">
    <div class="board-detail">
      <div class="board-titles">
        <div class="board-title">
          {{ detail.btitle }}
          <button v-if="detail.m_id == this.$store.getters.getUserId" v-on:click="update">수정</button>
          <button v-if="detail.m_id == this.$store.getters.getUserId" v-on:click="deletepost">삭제</button>
        </div>
        <div class="detail-like" v-text="detail.blike"></div>
      </div>
      <div class="board-info">
        <div class="board-name" v-text="detail.m_name"></div>
        <div class="board-date" v-text="detail.bdate"></div>
      </div>
      <div class="board-content" v-html="detail.bcontent"></div>
    </div>
    <div v-if="this.userInfo.m_name != null" class="comment">
      <textarea v-model="comment"></textarea>
      <button @click="commentWrite">댓글쓰기</button>
    </div>
    <div>
      <button v-if="this.userInfo.m_name != null" v-on:click="board">게시판으로</button>
    </div>

    <div class="commentList">
      <div class="comments" v-for="c in commentList" v-bind:key="c.cno">
        <div class="comment-head">
          <div class="comment-name">
            {{ c.m_name }}
            <button v-if="c.m_id == this.$store.getters.getUserId" @click="commentUpdate(`${c.c_no}`)">수정</button>
            <button v-if="c.m_id == this.$store.getters.getUserId" @click="commentDel(`${c.c_no}`)">삭제</button>
          </div>
          <div class="comment-date">
            <i class="xi-time-o"></i>{{ c.c_date }}
          </div>
        </div>
        <div class="comment-comment" v-html="c.c_comment.replaceAll(/(\n|\r\n)/g,'<br>')"></div>
      </div>
    </div>
    <div v-if="commentList != 0">
      <button v-on:click="board">게시판으로</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      requestBody: this.$route.query,
      re : this.$route.query.re,
      detail: {
        bno: this.$route.query.bno,
        btitle: "",
        bcontent: "",
        bdate: "",
        m_name: "",
        blike: "",
        m_id:"",
      },
      commentsList: [],
      comment: null,
      userInfo: {
        m_name: this.$store.getters.getUserName,
        m_id: this.$store.getters.getUserId,
      }
    };
  },
  mounted() {
    this.boardDetail();
  },
  methods: {
    commentUpdate(cno) {
      if (confirm("댓글을 수정하시겠습니까?")) {
        this.requestBody.cno = cno;
        this.$router.push({
          path: "./commentUpdate",
          query: this.requestBody,
        });
      }
    },
    commentDel(cno) {
      if (confirm("댓글을 삭제하시겠습니까?")) {
        this.$axios
          .delete(this.$server + "/commentDel?cno=" + cno)
          .then((res) => {
            if (res.data.result == 1) {
              alert("댓글을 삭제했습니다.");
              this.$router.go(this.requestBody);
            } else {
              alert("ooops! 문제가 발생했습니다.");
            }
          })
          .catch((err) => {
            alert("문제가 발생했습니다." + err);
          });
      }
    },
    commentWrite() {
      let commentData = {};
      commentData.bno = this.$route.query.bno;
      commentData.comment = this.comment;
      commentData.m_id = this.userInfo.m_id;
      this.$axios
        .post(this.$server + "/commentWrite", JSON.stringify(commentData), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          if (res.data.result == 1) {
            //this.$router.push({path: './detail',query : this.requestBody});
            //this.$router.reload({query:this.requestBody});
            //this.$router.go(this.requestBody);
            //this.$router.go();
            //수정 후 갱신이 불가능? 
            //this.$router.go(-1);
            //this.$router.go(0);
            this.$router.push({path: './detail',query:{bno:this.$route.query.bno, re:this.re+1}});
          } else {
            alert("ooops! 문제가 발생했습니다.");
          }
        })
        .catch((err) => {
          alert("문제가 발생했습니다. 요기?" + err);
        });
    },
    board() {
      this.$router.push("/boardList");
    },
    boardDetail() {
      this.$axios
        .get(this.$server + "/detail?bno=" + this.$route.query.bno)
        .then((res) => {
          this.detail = res.data.detail;
          this.detail.bcontent = this.detail.bcontent.replaceAll(/(\n|\r\n)/g,'<br>');
          this.commentList = res.data.commentsList;
        })
        .catch((err) => {
          alert("오류가 발생했습니다." + err);
        });
    },
    deletepost() {
      if (confirm("삭제하시겠습니까?")) {
        this.$axios({
          url: this.$server + "/delete",
          method: "post",
          params: { bno: this.detail.bno },
        })
          .then((res) => {
            if (res.data.result == 1) {
              alert("데이터베이스에서 삭제했습니다.");
              this.$router.push({
                path: "/boardList",
                query: this.requestBody,
              });
            } else {
              alert("oops! 문제가 발생했습니다. 다시 시도하지 마세요.");
            }
            //alert('통신 결과 : ' + res.data.result);
          })
          .catch((err) => {
            alert("에러가 발생했습니다." + err);
          });
      }
    },
    update() {
      if (confirm("수정하시겠습니까?")) {
        // this.requestBody.detail = this.detail;
        this.$router.push({
          path: "/update",
          query: this.requestBody,
        });
      }
    },
  },
};
</script>
<style scoped>
.detail {
  margin: 0 auto;
  width: 800px;
  height: auto;
}
.board-detail {
  width: 800px;
  height: auto;
  min-height: 300px;
  background-color: aliceblue;
  text-align: left;
  padding: 10px;
  box-sizing: border-box;
}
.commentList {
  width: 800px;
  height: auto;
}
.comments {
  margin: 5px 0px;
  width: 100%;
  min-height: 80px;
  box-sizing: border-box;
  text-align: left;
  padding: 5px;
}
.comment-head {
  background-color: bisque;
  width: 100%;
  line-height: 30px;
  height: 30px;
  box-sizing: border-box;
}
.comment-name {
  line-height: 30px;
  height: 30px;
  padding-left: 5px;
  width: calc(50% - 5px);
  float: left;
}
.comment-date {
  line-height: 30px;
  height: 30px;
  padding-right: 5px;
  width: calc(50% - 5px);
  float: left;
  text-align: right;
}
.comment-comment {
  width: 100%;
  min-height: 20px;
  height: auto;
  padding: 10px;
  width: calc(100% - 20px);
  background-color: cornsilk;
}
.comment {
  margin: 10px 0px;
  padding: 10px;
  width: 800px;
  height: 150px;
  display: flex;
  box-sizing: border-box;
  background-color: antiquewhite;
}
.comment textarea {
  width: calc(100% - 100px);
  height: 100%;
  border: 0px;
  float: left;
  box-sizing: border-box;
  resize: none;
}
.comment button {
  width: 100px;
  height: 100%;
  float: right;
  border: 0px;
}
.board-titles {
  width: 100%;
  height: 50px;
  border-bottom: 2px solid black;
}
.board-title {
  width: calc(100% - 50px);
  font-size: larger;
  height: 50px;
  line-height: 50px;
  float: left;
}
.detail-like {
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  float: right;
  background-color: aquamarine;
}
.board-info {
  width: 100%;
  height: 30px;
  padding: 10px;
  line-height: 10px;
  background-color: silver;
  box-sizing: border-box;
}
.board-name {
  width: 50%;
  height: 100%;
  float: left;
}
.board-date {
  width: 50%;
  height: 100%;
  float: right;
  text-align: right;
}
.board-content {
  padding: 10px;
  min-height: 300px;
  height: auto;
  box-sizing: border-box;
}
</style>