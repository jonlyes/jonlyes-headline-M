<template>
    <div>
        <!-- 搜索结果页-头部导航 -->
        <div class="search-result-container">
            <!-- 点击实现后退效果 -->
            <van-nav-bar
            title="搜索结果"
            left-arrow
            @click-left="$router.go(-1)"
            fixed/>
        </div>
        <div>
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :immediate-check="false"
              offset="50"
              @load="onLoad">
                <ArticleItem
                v-for="item of results"
                :key="item.art_id"
                :article="item"
                :isCross="false"
                @click.native="ArticleDetailFn(item.art_id)" />
            </van-list>
          </van-pull-refresh>
        </div>
    </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
import { getSearchResults } from '@/api'// 获取搜索结果
export default {
  name: 'SearchResult',
  components: { ArticleItem },
  data () {
    return {
      page: 1,
      results: [], // 搜索结果
      loading: false, // 底部加载状态
      isLoading: false, // 顶部刷新状态
      finished: false
    }
  },
  methods: {
    // 底部加载方法
    async onLoad () {
      if (this.results.length === 0) {
        this.loading = false
        return // 页面没有数据就停止本次load事件
      }
      this.page++
      const res = await getSearchResults({ page: this.page, q: this.$route.params.kw })
      // 加载状态结束
      this.loading = false
      this.results.push(...res.data.data.results)
      // 判断数据是否全部加载完成
      if (res.data.data.results.length < 10) {
        this.finished = true
      }
    },
    // 顶部刷新方法
    async onRefresh () {
      this.page = 1
      const res = await getSearchResults({ page: this.page, q: this.$route.params.kw })
      this.results = res.data.data.results
      // 刷新状态结束
      this.isLoading = false
    },
    // 文章单元格的点击事件
    ArticleDetailFn (id) {
      this.$router.push({
        path: `/ArticleDetail/${id}`
      })
    }
  },
  async created () {
    const res = await getSearchResults({ page: this.page, q: this.$route.params.kw })
    this.results = res.data.data.results
  }
}
</script>
<style lang="less" scoped>
.search-result-container{
    padding-top: 46px;
}
/deep/ .van-icon-arrow-left{
    color: #fff;
    font-size: 16px;
}
</style>
