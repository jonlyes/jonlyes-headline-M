<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      @load="onLoad">
      <ArticleItem
        v-for="articleItem in articleList"
        :key="articleItem.art_id"
        :article="articleItem">
      </ArticleItem>
    </van-list>
  </div>
</template>

<script>
import ArticleItem from './ArticleItem'
import { getArticleNewsRecommendation } from '@/api'
export default {
  name: 'ArticleList',
  components: { ArticleItem },
  data () {
    return {
      articleList: [], // 文章列表
      loading: false,
      finished: false,
      timer: new Date().getTime
    }
  },
  props: {
    channelId: Number
  },
  methods: {
    async onLoad () {
      // 获取文章新闻推荐
      const res = await getArticleNewsRecommendation({
        channel_id: this.channelId,
        timestamp: this.timer
      })
      // 判断数据是否全部加载完成
      if (res.data.data.results.length === 0) {
        this.finished = true
        return undefined
      }
      this.articleList = res.data.data.results
      this.timer = res.data.data.pre_timestamp
      // 加载状态结束
      this.loading = false
    }
  },
  async created () {
    // 获取文章新闻推荐
    const res = await getArticleNewsRecommendation({
      channel_id: this.channelId,
      timestamp: this.timer
    })
    this.articleList = res.data.data.results
    this.timer = res.data.data.pre_timestamp
  }
}
</script>

<style>

</style>
