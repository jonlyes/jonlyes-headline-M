<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        offset="50"
        @load="onLoad">
        <ArticleItem
          v-for="articleItem in articleList"
          :key="articleItem.art_id"
          :article="articleItem"
          @disLikeEv="disLikeEvent"
          @reportArticleEv="reportArticleEvent"
          @click.native="ArticleDetailFn(articleItem.art_id)">
        </ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Notify } from 'vant'
import ArticleItem from '@/components/ArticleItem.vue'
import { getArticleNewsRecommendation, disLikeActionItem, reportArticleItem } from '@/api'
export default {
  name: 'ArticleList',
  components: { ArticleItem },
  data () {
    return {
      articleList: [], // 文章列表git
      loading: false, // 底部加载状态
      isLoading: false, // 顶部刷新状态
      finished: false, // 是否全部加载完成
      timer: new Date().getTime
    }
  },
  props: {
    channelId: Number
  },
  methods: {
    // 封装发请求的函数，专门获取文章列表数据
    async getArticleFn () {
      // 获取文章新闻推荐
      const res = await getArticleNewsRecommendation({
        channel_id: this.channelId,
        timestamp: this.timer
      })
      // 加载状态结束
      this.loading = false
      // 刷新状态结束
      this.isLoading = false
      this.articleList = [...this.articleList, ...res.data.data.results]
      this.timer = res.data.data.pre_timestamp
      // 判断数据是否全部加载完成
      if (!res.data.data.pre_timestamp) {
        this.finished = true
      }
    },
    // 底部加载方法
    onLoad () {
      if (this.articleList.length === 0) {
        this.loading = false
        return// 页面没有数据就停止本次load事件
      }
      this.getArticleFn()
    },
    // 顶部刷新方法
    async onRefresh () {
      this.articleList = []
      this.timer = new Date().getTime
      // 获取文章新闻推荐
      this.getArticleFn()
    },
    // 反馈-对文章不喜欢
    async disLikeEvent (id) {
      // 反馈-对文章不喜欢
      await disLikeActionItem({ target: id })
      Notify({
        type: 'success',
        message: '反馈成功'
      })
    },
    async reportArticleEvent (id, articleType) {
      console.log(11)
      await reportArticleItem({ target: id, type: articleType })
      Notify({
        type: 'success',
        message: '反馈成功'
      })
    },
    // 文章单元格的点击事件
    ArticleDetailFn (id) {
      this.$router.push({
        path: `/ArticleDetail/${id}`
      })
    }
  },
  // 组件创建时获取新闻推荐
  async created () {
    // 获取文章新闻推荐
    this.getArticleFn()
  }
}
</script>

<style>
</style>
