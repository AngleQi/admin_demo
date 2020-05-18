<template>
  <el-container>
    <el-aside :width="$store.state.isCollapse?'60px':'260px'">
     <side-nav></side-nav>
    </el-aside>
    <el-container>
      <el-header>
        <div class="logo" @click="COLLAPSE_MENU">
          <i class="icon-zhedie el-icon-s-fold" v-show="!$store.state.isCollapse"></i>
          <i class="icon-zhedie el-icon-s-fold icon_down" v-show="$store.state.isCollapse"></i>
        </div>
        <div class="user">
          <img class="mr-10 avatar">
          <el-dropdown @command="handleCommand">
            <div class="el-dropdown-link">
              <span class="user-name">{{$store.state.userName}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-header>
        <tabs-list></tabs-list>
      </el-header>
      <el-main>
        <transition name="move" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideNav from "../components/SideNav";
import TabsList from "../components/TabsList";
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'index',
  data () {
    return {
    }
  },
  components: {
    SideNav,
    TabsList
  },
  methods: {
    ...mapMutations(['COLLAPSE_MENU']),
    ...mapGetters(['getIsCollapse']),
    handleCommand (command) {
      if (command === 'edit') {
        this.$router.push({ name: 'resetPwd' })
      } else if (command === 'logout') {
        this.$confirm('是否退出系统, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('logout').then(() => {
            this.$router.push({ name: 'login' })
          })
        })
      }
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
@import '../common/css/index.css';
  .el-container {
    height: 100vh;
    background-color: #eeeeee;
  }
  .el-header {
    display: flex;
    line-height: 60px;
    background-color: #FFFFFF;
    color: #000000;
    border-bottom: 1px solid #eeeeee;
    .logo {
      display: flex;
      .icon-zhedie{
        margin: 10px;
        padding: 5px;
        font-size: 30px;
        cursor: pointer;
      }
      .icon_down {
        transform: rotate(-90deg)
      }
    }
    .user {
      flex: 1;
      text-align: right;
      .el-dropdown {
        color: #000000;
      }
      .user-name {
        cursor: pointer;
      }
    }
  }
  .el-aside {
    background-color: #20222a;
  }
  .el-main {
    background-color: #FFFFFF;
    margin: 5px 8px 8px 8px;
  }

</style>
