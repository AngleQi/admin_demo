<template>
  <div class="login">
    <div class="login_main">
          <div class="login_left">
            <p class="title">ZQ | 后台管理系统</p>
          </div>
          <div class="login_right">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="20px" class="login-ruleForm">
              <el-form-item prop="userName">
                <el-input v-model="ruleForm.userName" placeholder="用户名"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" v-model="ruleForm.password" placeholder="密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="submitForm('ruleForm')" class="login_btn"  v-loading.fullscreen.lock="loading"
                           element-loading-text="拼命加载中"
                           element-loading-spinner="el-icon-loading"
                           element-loading-background="rgba(0, 0, 0, 0.8)">登 录</el-button>
              </el-form-item>
            </el-form>
          </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.login{
  margin: 0 0;
  height:100vh;
  width:100%;
  overflow: hidden;
  background-image: url("../assets/login_gif.gif");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .login_main{
    margin: 250px auto;
    text-align: center;
    .login_left{
      color: #05fffc;
      font-size: 30px;
      font-weight: bold;
      letter-spacing:10px;
    }
    .login_right{
      width: 480px;
      height: 270px;
      background-color: #061b5c;
      opacity: .7;
      margin: 30px auto;
      display: flex;
      justify-content: center;
      align-items: center;
      .login-ruleForm{
        width: 400px;
        .login_btn{
          width: 380px;
          background-color:  #05fffc;
          border: none;
          color: #000000;
        }
      }
     /deep/.el-input__inner {
        background-color: transparent;
        border: 1px solid #1adcff;
        color: #1adcff;
      }
    }
  }
}
</style>

<script>
import common from '@/common/js/common'
export default {
  name: 'login',
  data () {
    return {
      ruleForm: {
        password: '',
        userName: ''
      },
      rules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 32, message: '长度在 8 到 32 个字符', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  mounted () {
    this.getCookie()
  },
  components: {
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.setCookie(this.ruleForm.userName, this.ruleForm.password)
          this.$router.push({ name: 'Dashboard'})
        } else {
          this.$message.error('请通过验证')
          return false
        }
      })
    },
    // 设置cookie
    setCookie (name, pwd) {
      common.setCookie('userName', name)
      common.setCookie('password', pwd)
    },
    // 读取cookie
    getCookie: function () {
      this.ruleForm.userName = common.getCookie('userName')
      this.ruleForm.password = common.getCookie('password')
    },
    // 清除cookie
    clearCookie: function () {
      this.setCookie('', '', -1) // 修改2值都为空，天数为负1天就好了
    }
  }
}
</script>
