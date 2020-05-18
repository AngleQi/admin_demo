<template>
  <div class="tags" v-if="showTags">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :xs="20" :sm="21" :md="21" :lg="22" :xl="23">
        <el-tabs :value="currentActiveTab" @contextmenu.native="handleContextmenu" :closable="showTags!==1" @tab-click="goTags" @edit="closeTags">
          <el-tab-pane :key="item.path" v-for="item in tagsList" :label="item.title" :name="item.path">
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :xs="4" :sm="3" :md="3" :lg="2" :xl="1">
        <el-dropdown @command="handleTags">
          <el-button size="mini" type="primary">
            更多<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu size="small" slot="dropdown">
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import bus from '../common/js/bus'
export default {
  data () {
    return {
      activeTab: '',
      tagsList: []
    }
  },
  mounted () {
  },
  computed: {
    showTags () {
      return this.tagsList.length || 0
    },
    currentActiveTab () {
      if (this.showTags !== 1) {
        return this.$route.fullPath
      }
    }
  },
  created () {
    this.handleContextmenu()
  },
  methods: {
    goTags (e) {
      console.log(e)
      if (this.showTags) {
        this.$router.replace(e.paneName)
      }
    },
    // 关闭单个标签
    closeTags (index) {
      let isCurrent = null
      for (let k in this.tagsList) {
        if (this.tagsList[k].path === index) {
          isCurrent = k
          break
        }
      }
      this.tagsList = this.tagsList.filter(t => t.path !== index)
      let replactPath = ''
      if (index === this.$route.fullPath) {
        if (this.tagsList.length === isCurrent) {
          replactPath = this.tagsList[isCurrent].path
        } else if (this.tagsList[isCurrent - 1] === undefined) {
          replactPath = this.tagsList[0].path
        } else {
          replactPath = this.tagsList[isCurrent - 1].path
        }
      }
      console.log(replactPath, index)
      if (replactPath) {
        this.$router.replace(replactPath)
      }
    },
    // 关闭全部标签
    closeAll () {
      this.tagsList = []
      this.$router.push('/login')
    },
    // 关闭其他标签
    closeOther () {
      const curItem = this.tagsList.filter(item => {
        return item.path === this.$route.fullPath
      })
      this.tagsList = curItem
    },
    // 设置标签
    setTags (route) {
      const isExist = this.tagsList.some(item => {
        return item.path === route.fullPath
      })
      if (!isExist) {
        if (this.tagsList.length >= 5) {
          this.tagsList.shift()
        }
        console.log(route.matched)
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.matched[1].components.default.name
        })
      }
      // 绑定数据
      // tags为定义的变量，this.tagsList为集合数据
      bus.$emit('tags', this.tagsList)
    },
    handleTags (command) {
      command === 'other' ? this.closeOther() : this.closeAll()
    },
    handleContextmenu () {
      this.setTags(this.$route)
      // 监听数据 bus.$on('close_current_tags',() =>{ }) ()中是获取的上文中的集合数据
      // 监听关闭当前页面的标签页
      bus.$on('close_current_tags', () => {
        for (let i = 0, len = this.tagsList.length; i < len; i++) {
          const item = this.tagsList[i]
          if (item.path === this.$route.fullPath) {
            if (i < len - 1) {
              this.$router.push(this.tagsList[i + 1].path)
            } else if (i > 0) {
              this.$router.push(this.tagsList[i - 1].path)
            } else {
              this.$router.push('/login')
            }
            this.tagsList.splice(i, 1)
          }
        }
      })
    }
  },
  watch: {
    $route (newValue) {
      this.setTags(newValue)
    }
  }
}

</script>

<style scoped lang="sass">
  .tags
    width: 100%
</style>
