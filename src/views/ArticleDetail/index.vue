<template>
    <div>
        <!-- Header区域 -->
        <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />
        <!-- 文章信息区域 -->
        <div class="article-container">
            <!-- 文章标题 -->
            <h1 class="art-title">{{artObj.title}}</h1>
            <!-- 用户信息 -->
            <van-cell center :title="artObj.aut_name" :label="formatTime(artObj.pubdate)">
                <template #icon>
                    <van-image class="avatar" width="60px" height="60px" round :src="artObj.aut_photo" />
                </template>
                <template #default>
                    <div>
                        <van-button type="info" size="mini" v-if="artObj.is_followed" @click="followed(false)">已关注</van-button>
                        <van-button icon="plus" type="info" size="mini" v-else @click="followed(true)">关注</van-button>
                    </div>
                </template>
            </van-cell>
            <!-- 分割线 -->
            <van-divider></van-divider>
            <!-- 文章内容 -->
            <div class="art-content" v-html="artObj.content"></div>
            <!-- 分割线 -->
            <van-divider>End</van-divider>
            <!-- 点赞 -->
            <div class="like-box">
                <van-button icon="good-job" type="danger" size="small" v-if="artObj.attitude===1" @click="giveLike(false)">已点赞</van-button>
                <van-button icon="good-job-o" type="danger" plain size="small" v-else @click="giveLike(true)">点赞</van-button>
            </div>
        </div>
        <!-- 评论列表区域 -->
        <div>
          <CommentList />
        </div>
    </div>
</template>

<script>
import { getArticleDetail, focusUser, cancelFocus, giveArticleLike, cancelArticleLike } from '@/api'
import { timeAgo } from '@/utils/date'
import CommentList from '@/views/ArticleDetail/CommentList.vue'
export default {
  components: { CommentList },
  data () {
    return {
      artObj: {} // 文章详情
    }
  },
  methods: {
    // 时间格式化
    formatTime: timeAgo,
    async followed (Boolean) {
      if (Boolean) {
        // 关注用户
        await focusUser({ target: this.artObj.art_id })
        this.artObj.is_followed = true
      } else {
        // 取消关注
        await cancelFocus({ target: this.artObj.art_id })
        this.artObj.is_followed = false
      }
    },
    // 对文章的点赞/取消点赞
    async giveLike (Boolean) {
      if (Boolean) {
        // 对文章点赞
        await giveArticleLike({ target: this.artObj.art_id })
        this.artObj.attitude = 1
      } else {
        // 取消对文章点赞
        await cancelArticleLike({ target: this.artObj.art_id })
        this.artObj.attitude = 0
      }
    }
  },
  async created () {
    const res = await getArticleDetail({ art_id: this.$route.params.id })
    this.artObj = res.data.data
  }

}
</script>

<style scoped lang="less">
.article-container{
    padding: 10px;
    margin-top: 46px;
}
.art-title{
    font-size: 16px;
    font-weight: bold;
    margin: 10px 0;
}
.art-content{
    font-size: 12px;
    line-height: 24px;
    width: 100%;
    overflow: hidden;
    word-break: break-all;
      /deep/ img{
        width: 100%;
      }
      /deep/ pre{
        white-space: pre-wrap;
        word-wrap: break-word;
      }
}
.van-cell{
    padding: 5px 0;
    &::after{
        display: none;
    }
}
.avatar{
    background-color: #f8f8f8;
    margin-right: 5px;
    border: none;
}
.like-box{
    display: flex;
    justify-content: center;
}
/deep/ .van-icon-arrow-left.van-nav-bar__arrow{
    color: #fff;
    font-size: 16px;
}

</style>
