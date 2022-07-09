<template>
  <div>
    <div>
      <van-nav-bar fixed>
        <template #left>
          <img src="@/assets/logo.png" alt="" class="logo">
        </template>
        <template #right>
          <van-icon name="search" size="18" color="#fff"/>
        </template>
      </van-nav-bar>
    </div>
    <div class="main">
      <van-tabs v-model="channelId" animated sticky offset-top="46px">
        <van-tab
        v-for="channel in channelsList"
        :key="channel.id"
        :title="channel.name"
        :name="channel.id">
        <ArticleList :channelId="channelId"></ArticleList>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getUserChanneList } from '@/api'
import ArticleList from './components/ArticleList.vue'
export default {
  components: { ArticleList },
  data () {
    return {
      channelId: 0,
      channelsList: []
    }
  },
  async created () {
    // 获取用户的频道列表
    const res = await getUserChanneList()
    this.channelsList = res.data.data.channels
  }
}
</script>

<style scoped lang="less">
  .logo{
    width: 100px;
    height: 30px;
  }
  .main{
    padding-top:46px;
  }
</style>
