<template>
  <div class="about">
    <!--    Vue-WeiXin-face-->
    <!-- 页面内容区域 -->
    <div :class="faceShow ? 'contentBox contFaceShow' : 'contentBox'">
      <ul>
        <li v-for="(item,index) in content" :key="index">
          <span>{{item}}</span>
        </li>
      </ul>
    </div>
    <!-- 输入框区域 -->
    <div :class="faceShow ?'box boxFaceShow' : 'box'" ref="heightFace">
      <input type="text" v-model="textConent" class="inputContent">
      <el-button class="referBut" @click="referContent" type="primary">提交</el-button>
      <el-button class="faceBut" @click="faceContent" type="danger" plain>表情</el-button>
    </div>
    <!-- 表情区域 -->
    <div class="browBox" v-if="faceShow">
      <ul>
        <li v-for="(item,index) in faceList" :key="index" @click="getBrow(index)">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  // 导入JSON格式的表情库
  const appData = require('@/assets/emojis.json')
  export default {
    name: 'about',
    data () {
      return {
        textConent: '',
        faceList: [],
        faceShow: false,
        getBrowString: '',
        content: []
      }
    },
    methods: {
      // 表情
      faceContent () {
        this.faceShow = !this.faceShow
        if (this.faceShow == true) { //eslint-disable-line
          for (var i in appData) {
            this.faceList.push(appData[i].char)
          }
        } else {
          this.faceList = []
        }
      },
      // 获取用户点击之后的标签 ，存放到输入框内
      getBrow (index) {
        for (var i in this.faceList) {
          if (index == i) { //eslint-disable-line
            this.getBrowString = this.faceList[index]
            this.textConent += this.getBrowString
          }
        }
      },
      // 将input的内容渲染到页面上
      referContent () {
        if (this.textConent == '') //eslint-disable-line
          return alert('请输入内容')
        // 存入
        this.content.push(this.textConent)
        // 清空input数据
        this.textConent = ''
        // 关闭表情列表
        this.faceShow = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .about {
    width: 100%;
    height: 80vh;
    padding: 0px;
    position: relative;
    margin: 0px;
    .contentBox {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      text-align: right;
      position: absolute;
      bottom: 60px;
      li {
        list-style: none;
        padding: 4px 10px;
        margin-bottom: 20px;
        span {
          background: #e6e6e6;
          border-radius: 5px;
          padding: 5px;
        }
      }
    }
    .contFaceShow {
      position: absolute;
      bottom: 240px;
    }
    .box {
      width: 100%;
      height: 40px;
      margin: auto;
      position: absolute;
      bottom: 0px;
      .inputContent {
        position: absolute;
        bottom: 0%;
        left: 0%;
        width: 70%;
        height: 100%;
        border: 1px solid #ccc;
      }
      .referBut {
        position: absolute;
        bottom: 0%;
        right: 18%;
      }
      .faceBut {
        position: absolute;
        bottom: 0;
        right: 24%;
      }
    }
    .boxFaceShow {
      position: absolute;
      bottom: 200px !important;
    }
    .browBox {
      width: 100%;
      height: 200px;
      background: #e6e6e6;
      position: absolute;
      bottom: 0px;
      overflow: scroll;
      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        li {
          width: 14%;
          font-size: 26px;
          list-style: none;
          text-align: center;
        }
      }
    }
  }
</style>
