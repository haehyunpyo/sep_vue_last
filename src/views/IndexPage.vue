<template>
    <div class="index">
        <h1>index</h1>
    <table>
      <thead>
        <tr>
          <th>제목</th>
          <th>날짜</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="n in list" v-bind:key="n.bno">
          <td class="title">
            <a v-on:click="viewDetail(`${n.bno}`)">{{ n.btitle }}</a>
          </td>
          <td>{{ n.bdate }}</td>
        </tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr>
          <th>제목</th>
          <th>날짜</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="n in cmtTop5" v-bind:key="n.bno">
          <td class="title">
            <a v-on:click="viewDetail(`${n.bno}`)">{{ n.btitle }}</a>
          </td>
          <td>{{ n.bdate }}</td>
        </tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr>
          <th>아이디</th>
          <th>날짜</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="n in members" v-bind:key="n.bno">
          <td class="title">
            <a v-on:click="viewDetail(`${n.bno}`)">{{ n.m_id }}</a>
          </td>
          <td>{{ n.m_joindate }}</td>
        </tr>
      </tbody>
    </table>
    </div>
</template>

<script>
export default {
    name: 'indexPage',
    data(){
        return{
            list:[],
            members:[],
            cmtTop5:[],
        }
    },
    mounted(){
        this.index();
    },
    methods:{
        index(){
            this.$axios.get(this.$server + '/index')
            .then((res) => {
                this.list = res.data.list;
                this.members = res.data.members;
                this.cmtTop5 = res.data.cmtTop5;
            })
            .catch((err) => {
                alert("에러발생" + err);
            });
        }
    }
}
</script>

<style>
.index{
    margin: 0 auto;
    width: 800px;
    height: auto;
    background-color: bisque;
    text-align: left;
    padding: 10px;
}
.index ul, .index li{
    background-color: white;
}
table {
    border: 1px solid gray;
    margin: 10px;
}
th {
    border-bottom: 1px solid gray;
}
a{
    color: black;
}
</style>