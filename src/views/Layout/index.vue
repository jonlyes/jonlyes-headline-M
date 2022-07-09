<template>
  <div>
    <div class="home_container">
      <!-- 二级路由页面 -->
      <router-view></router-view>
    </div>
    <div>
      <!-- 底部导航组件 -->
      <van-tabbar v-model="active" route>
        <van-tabbar-item to="/layout/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item to="/layout/user" icon="setting-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang="less">
.home_container{
  padding-bottom: 50px;
}
.van-tabbar{
  border-top: 1px solid #f8f8f8;
}
</style>
