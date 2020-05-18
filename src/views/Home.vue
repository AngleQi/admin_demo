<template>
  <div class="home">
    <h1>欢迎来到我的小世界</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  }
}
</script>

<style lang="less" scoped>
  .home{
    height:80vh;
    width:100%;
    text-align: center;
    background-image: url("../assets/login_gif2.gif");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    h1{
      color: #FFFFFF;
      font-size: 40px;
      letter-spacing:10px;
    }
  }
</style>
