/* 실제로 라우팅을 해주는 파일. 이곳에서 각 파일로 연결시켜 줍니다. */
import { createRouter, createWebHistory } from 'vue-router'
import indexPage from '@/views/IndexPage.vue'
import boardList from '@/views/BoardList.vue'
import mainPage from '@/views/MainPage.vue'
import loginPage from '@/views/LoginPage.vue'
import joinPage from '@/views/JoinPage.vue'
import detailPage from '@/views/DetailPage.vue'
import writePage from '@/views/WritePage.vue'
import updatePage from '@/views/UpdatePage.vue'
import commentUpdate from '@/views/CommentUpdate.vue'

const routes = [
 {path: '/', name: 'index', component: indexPage},
 {path: '/join', name: 'join', component: joinPage},
 {path: '/boardList', name: 'boardList', component: boardList},
 {path: '/main', name: 'main', component: mainPage},
 {path: '/login', name: 'login', component: loginPage},
 {path: '/detail', name: 'detailPage', component: detailPage},
 {path: '/write', name: 'writePage', component: writePage},
 {path: '/update', name: 'updatePage', component: updatePage},
 {path: '/commentUpdate', name: 'commentUpdate', component: commentUpdate},
 {path: '/error', name: 'errorPage', component: ()=> import('@/views/ErrorPage.vue')},
 {path: "/:pathMatch(.*)*", redirect: "/error"}
]
const router = createRouter({
 history: createWebHistory(process.env.BASE_URL),
 routes
})
export default router