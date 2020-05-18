<template>
  <div>
    <div class="side_logo">
      <img alt="logo" src="../assets/logo.png" :class="$store.state.isCollapse?'logo_img':'logo'">
    </div>
    <el-menu class="el-menu-vertical-demo nav" @open="handleOpen" @close="handleClose" :unique-opened="true" :collapse="getIsCollapse"
             background-color="#20222a" text-color="#fff" active-text-color="#05fffc" :default-active="activeIndex" @select="handleSelect">
      <template v-for="(item, index) in navList">
        <el-submenu v-if="item.children && item.children.length" :key="index + ''" :index="item.path" >
          <template slot="title" class="side_name">
            <i v-if="item.icon" class="iconfont" :class="item.icon"></i>
            <span slot="title" class="label_name">{{ item.title }}</span>
          </template>
          <el-menu-item v-for="(v, i) in item.children" :key="index + '-' + i" :index="v.path" style="padding-left: 50px">
            <span slot="title">{{ v.title }}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :key="index + ''" :index="item.path" class="side_name">
          <i class="iconfont" :class="item.icon"></i>
          <span slot="title" class="label_name">{{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
export default {
  name: 'SideNav',
  data () {
    return {
      navList: [{
        title: '首页',
        icon: 'el-icon-house',
        path: '/dashboard'
      },
        {
          title: '表情列表',
          icon: 'el-icon-sunny',
          path: '/emojisList'
        },
        {
          title: 'flex瀑布流',
          icon: 'el-icon-wallet',
          path: '/flexList'
        },
        {
          title: 'vue图片裁剪',
          icon: 'el-icon-crop',
          path: '/vueCropperList'
        }
      ]
    }
  },
  created () {
  },
  computed: {
    activeIndex () {
      // return this.$route.meta.parentRoute || this.$route.path
      return this.$route.path
    },
    ...mapGetters(['getIsCollapse'])
  },
  mounted () {
    this.setIsCollapse()
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (path) {
      if (!/^\//.test(path)) return
      this.$router.push(path)
    },
    setIsCollapse () {
      window.onresize = function () {
        if (document.body.clientWidth < 750) {
          store.state.isCollapse = true
        } else {
          store.state.isCollapse = false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .side_logo {
   border-bottom: 2px solid #000000;
    text-align: center;
    img {
      padding-top: 20px;
      padding-bottom: 10px;
    }
  }
  .nav {
    position: relative;
    border: none;
    background-color: transparent;
    .side_name {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .iconfont {
      color: #FFFFFF;
      font-size: 18px;
    }
    &:not(.el-menu--collapse) {
      width: 260px;
    }
    .label_name {
      font-size: 14px;
      margin-left: 10px;
    }
    li{
      text-align: left;
    }
    .toggle {
      position: absolute;
      background-color: red;
      top: 0;
      right: -30px;
      width: 30px;
      height: 30px;
      z-index: 999;
    }
  }

</style>
