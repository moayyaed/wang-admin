<template>
  <div class="layout">
    <el-container v-if="showMenu" class="container">
      <el-aside class="aside">
        <div class="head">
          <div>
            <img src="//s.weituibao.com/1582958061265/mlogo.png" alt="">
            <span>admin</span>
          </div>
        </div>
        <div class="line"/>
        <el-menu
          :default-active="currentPath"
          :default-openeds="defaultOpen"
          background-color="#222832"
          text-color="#fff"
          :router="true">
          <el-submenu index="1">
            <template #title>
              <span>Dashboard</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/introduce"><i class="el-icon-data-line" />系统介绍</el-menu-item>
              <el-menu-item index="/dashboard"><i class="el-icon-odometer" />Dashboard</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template #title>
              <span>首页配置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/swiper"><i class="el-icon-picture" />轮播图配置</el-menu-item>
              <el-menu-item index="/hot"><i class="el-icon-star-on" />热销商品配置</el-menu-item>
              <el-menu-item index="/new"><i class="el-icon-sell" />新品上线配置</el-menu-item>
              <el-menu-item index="/recommend"><i class="el-icon-thumb" />为你推荐配置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template #title>
              <span>模块管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/category"><i class="el-icon-menu" />分类管理</el-menu-item>
              <el-menu-item index="/good"><i class="el-icon-s-goods" />商品管理</el-menu-item>
              <el-menu-item index="/order"><i class="el-icon-s-order" />订单管理</el-menu-item>
              <el-menu-item index="/guest"><i class="el-icon-user-solid" />会员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template #title>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/account"><i class="el-icon-lock" />修改密码</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container class="content">
        <Header/>
        <div class="main">
          <router-view/>
        </div>
        <Footer/>
      </el-container>
    </el-container>
    <el-container v-else class="container">
      <router-view/>
    </el-container>
  </div>
</template>

<script>
  import { reactive, toRefs } from 'vue'
  import { useRouter } from 'vue-router'
  import { localGet } from '@/utils'
  import { noMenu, pathMap } from '@/config'
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  export default {
    name: 'App',
    components: {
      Header,
      Footer
    },
    setup() {
      const router = useRouter()
      const state = reactive({
        defaultOpen: ['1', '2', '3', '4'],
        showMenu: true,
        currentPath: '/dashboard'
      })

      router.beforeEach((to, from, next) => {
        if (to.path === '/login') {
          next()
        } else {
          if (!localGet('token')) {
            next({
              path: '/login'
            })
          } else {
            next()
          }
        }
        state.showMenu = !noMenu.includes(to.path)
        state.currentPath = to.path
        document.title = pathMap[to.name]
      })

      return {
        ...toRefs(state)
      }
    }
  }
</script>
<style scoped>
.layout {
  min-height: 100vh;
  background-color: #ffffff;
}
.content {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
}
.main {
  height: calc(100vh - 100px);
  overflow: auto;
  padding: 10px;
}
.container {
  height: 100vh;
}
.aside {
  width: 200px!important;
  background-color: #222832;
}
.head {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
.head > div {
  display: flex;
  align-items: center;
}

.head img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.head span {
  font-size: 20px;
  color: #ffffff;
}
.line {
  border-top: 1px solid hsla(0,0%,100%,.05);
  border-bottom: 1px solid rgba(0,0,0,.2);
}
</style>

<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.el-menu {
  border-right: none!important;
}
.el-submenu {
  border-top: 1px solid hsla(0, 0%, 100%, .05);
  border-bottom: 1px solid rgba(0, 0, 0, .2);
}
.el-submenu:first-child {
  border-top: none;
}
.el-submenu [class^="el-icon-"] {
  vertical-align: -1px!important;
}
a {
  color: #409eff;
  text-decoration: none;
}
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
.el-popper__arrow {
  display: none;
}
</style>
