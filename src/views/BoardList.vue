<template>
  <link
    rel="stylesheet"
    href="//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css"
  />
  <div>
    <h1>board : {{ this.userInfo.m_name }}</h1>
    <table>
      <thead>
        <tr>
          <th>제목</th>
          <th>글쓴이</th>
          <th>날짜</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="n in list" v-bind:key="n.bno">
          <td class="title">
            <a v-on:click="viewDetail(`${n.bno}`)"
              >{{ n.bno}}. {{ n.btitle }} 
              <span v-if="n.commentcount > 0">&nbsp;<i class="xi-comment"></i>{{ n.commentcount }}</span>
            </a>
          </td>
          <td>{{ n.m_name }}</td>
          <td>{{ n.bdate }}</td>
          <td>{{ n.blike }}</td>
        </tr>
      </tbody>
    </table>
    <div class="paging">
      <button v-bind:disabled="this.pageNo == 1" v-on:click="board(1)">
        <i class="xi-fast-backward"></i>
      </button>
      <button
        v-bind:disabled="this.pageNo - 10 < 1"
        v-on:click="board(this.pageNo - 10)"
      >
        <i class="xi-step-backward"></i>
      </button>
      <button
        v-bind:disabled="this.pageNo - 1 < 1"
        v-on:click="board(this.pageNo - 1)"
      >
        <i class="xi-arrow-left"></i>
      </button>
      <button v-for="i in pageList" :key="i" v-on:click="board(i)">
        {{ i }}
      </button>
      <button
        v-bind:disabled="this.pageNo + 1 > this.totalPage"
        v-on:click="board(this.pageNo + 1)"
      >
        <i class="xi-arrow-right"></i>
      </button>
      <button
        v-bind:disabled="this.pageNo + 10 > this.totalPage"
        v-on:click="board(this.pageNo + 10)"
      >
        <i class="xi-step-forward"></i>
      </button>
      <button
        v-bind:disabled="this.pageNo == this.totalPage"
        v-on:click="board(this.totalPage)"
      >
        <i class="xi-fast-forward"></i>
      </button>
    </div>
    <button v-if="this.userInfo.m_name != null" @click="write">글쓰기</button>
  </div>
</template>

<script>
export default {
  name: "BoardList",
  data() {
    return {
      list: [],
      //this.$router = 라우터 객체
      //this.$route = 라우터 상태를 관리하는 객체
      requestBody: this.$route.query,
      pageNo: this.$route.query.pageNo,
      totalcount: null,
      totalPage: null,
      startPage: null,
      endPage: null,
      pageList: [],
      userInfo: {
        m_name: this.$store.getters.getUserName,
        m_id: this.$store.getters.getUSerId,
      }
    };
  },
  mounted() {
    this.board(this.requestBody.pageNo);
  },
  methods: {
    paging(totalcount) {
      //페이징 관련 일을 여기에서 처리합니다.
      this.totalcount = totalcount;
      this.totalPage = Math.ceil(this.totalcount / 10);
      this.startPage = this.pageNo / 11 > 0 ? parseInt(this.pageNo / 11) * 10 + 1 : 1;
      this.endPage = this.startPage + 10 > this.totalPage ? (this.totalPage + 10) % 10 : 10;
      this.pageList = [];
      for (let i = 0; i < this.endPage; i++) {
        this.pageList[i] = this.startPage + i;
      }
    },
    board(pageNo) {
      this.requestBody.pageNo = pageNo;
      this.$axios
        .get(this.$server + "/board", { params: this.requestBody })
        .then((res) => {
          this.list = res.data.list;
          this.pageNo = res.data.pageNo;
          this.paging(res.data.totalcount);
        })
        .catch((err) => {
          alert("문제가 발생했습니다." + err);
        });
    },
    viewDetail(bno) {
      //alert(bno+"번을 눌렀습니다");
      this.requestBody.bno = bno;
      this.$router.push({
        path: "./detail",
        query: this.requestBody,
      });
    },
    write() {
      this.$router.push("write");
    },
  },
};
</script>

<style scoped>
table {
  width: 800px;
  height: 300px;
  border-collapse: collapse;
  margin: 0 auto;
}
th {
  background-color: rgb(169, 109, 109);
}
td {
  border-bottom: 1px gray solid;
}
tr:hover {
  background-color: gray;
  color: rgb(0, 0, 0);
}
.title {
  text-align: left;
  padding-left: 10px;
}
#td1 {
  width: 10%;
}
#td2 {
  width: 30%;
}
td a {
  color: black;
}
span {
  color: deeppink;
  font-size: x-small;
}
.paging {
  margin: 0 auto;
  width: 800px;
  height: 50px;
  line-height: 50px;
}
.active {
  font-weight: bold;
  color: red;
}
</style>
