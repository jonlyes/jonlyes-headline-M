<template>
    <div>
        <!-- 评论列表 -->
        <div class="cmt-list">
          <!-- 评论的item项 -->
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多评论了,请发表更多评论"
            @load="onLoad">
            <div class="cmt-item" v-for="item of comments" :key="item.com_id">
                <!-- 头部区域 -->
                <div class="cmt-header">
                    <!-- 头部左侧 -->
                    <div class="cmt-header-left">
                        <img :src="item.aut_photo" class="avatar">
                        <span class="uname">{{item.aut_name}}</span>
                    </div>
                    <div class="cmt-header-right">
                        <van-icon name="like" size="16" color="red" v-if="item.is_liking" @click="commentsLike(item,true)" />
                        <van-icon name="like-o" size="16" color="gray" v-else @click="commentsLike(item,false)" />
                    </div>
                </div>
                <!-- 主体区域 -->
                <div class="cmt-body">{{item.content}}</div>
                <!-- 底部区域 -->
                <div class="cmt-footer">{{formatTime(item.pubdate)}}</div>
            </div>
          </van-list>
        </div>
        <!-- 发表评论区域 -->
        <div :class="{'art-cmt-container-1':!isShow,'art-cmt-container-2':isShow}">
          <!-- 底部添加评论区域-1 -->
          <div class="add-cmt-box van-hairline--top"  v-if="isShow===false">
            <van-icon name="arrow-left" size="16px" @click="$router.back()" />
            <div class="ipt-cmt-div" @click="isShowCom">发表评论</div>
            <div class="icon-box">
              <van-badge :content="commentCount" max="99">
                <van-icon name="comment-o" size="20px" @click="rollingCom" />
              </van-badge>
              <van-icon name="star-o" size="20px"/>
              <van-icon name="share-o" size="20px"/>
            </div>
          </div>
          <!-- 底部添加评论区域-2 -->
          <div class="cmt-box van-hairline--top" v-else>
            <textarea placeholder="友善评论、理性发言、阳光心灵" v-focus @blur="blurFn" v-model="content"></textarea>
            <van-button type="default" :disabled="this.content.trim().length===0"  @click="releaseComment">发布</van-button>
          </div>
        </div>
    </div>
</template>

<script>
import { getComment, CommentLike, cancelCommentLike, articleComments } from '@/api'
import { timeAgo } from '@/utils/date'
export default {
  data () {
    return {
      content: '', // 评论内容
      offset: null, // 评论数据的偏移量
      isShow: false, // 是否显示评论盒子
      comments: [], // 评论数据
      commentCount: null, // 评论数量
      loading: false, // 底部加载状态
      finished: false// 是否全部加载完成
    }
  },
  methods: {
    formatTime: timeAgo,
    // 评论的点赞/取消点赞
    async commentsLike (obj, bool) {
      if (bool === true) {
        // 取消点赞
        await cancelCommentLike({ target: obj.com_id })
        obj.is_liking = false
      } else {
        // 点赞
        await CommentLike({ target: obj.com_id })
        obj.is_liking = true
      }
    },
    // 发布评论
    async releaseComment () {
      const res = await articleComments({ content: this.content, art_id: this.$route.params.id })
      this.commentCount++
      this.comments.unshift(res.data.data.new_obj)
      // vue Bom是异步更新，因此将滚动事件放到下一次微任务中
      this.$nextTick(() => {
        this.rollingCom()
      })
    },
    // 是否显示评论框
    isShowCom () {
      this.isShow = !this.isShow
    },
    // 输入框 - 失去焦点
    blurFn () {
      setTimeout(() => {
        this.isShow = false
      }, 0)
    },
    // 滚动到评论区域
    rollingCom () {
      const now = window.scrollY// 获取已经目前滚动到的位置
      const dist = document.querySelector('.article-container').offsetHeight// 获取要滚动到的位置
      const step = dist / 20// 每次滚动的步长
      setTimeout(() => {
        if (dist > now + step) {
          window.scrollTo(now, now + step)
          this.rollingCom()
        }
      }, 100)
      // const theDic = document.querySelector('.cmt-list')
      // console.log(theDic)
      // theDic.scrollIntoView({
      //   behavior: 'smooth',
      //   block: 'start'
      // })
    },
    // 评论列表底部加载事件
    async onLoad () {
      if (this.comments.length === 0) {
        this.loading = false
        return// 页面没有数据就停止本次load事件
      }
      // 获取评论数据
      const res = await getComment({ source: this.$route.params.id, offset: this.offset })
      this.comments = [...this.comments, ...res.data.data.results]
      this.commentCount = res.data.data.total_count === 0 ? null : res.data.data.total_count
      this.offset = res.data.data.last_id
      // 判断数据是否全部加载完成
      if (res.data.data.last_id === null) {
        this.finished = true
      }
      // 加载状态结束
      this.loading = false
    }
  },
  async created () {
    const res = await getComment({ source: this.$route.params.id })
    this.comments = res.data.data.results
    this.commentCount = res.data.data.total_count === 0 ? null : res.data.data.total_count
    this.offset = res.data.data.last_id
    if (res.data.data.results.length === 0) {
      this.finished = true
    }
  }
}
</script>

<style scoped lang="less">
.cmt-list{
    padding: 10px;
    .cmt-item{
        padding: 15px 0;
        border-top: 1px solid #f8f8f8;
        .cmt-header{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .cmt-header-left{
                display: flex;
                align-items: center;
                .avatar{
                    width: 40px;
                    height: 40px;
                    background-color: #f8f8f8;
                    border-radius: 50%;
                    margin-right: 15px;
                }
                .uname{
                    font-size: 12px;
                }
            }
        }
        .cmt-body{
            font-size: 14px;
            line-height: 28px;
            text-indent: 2em;
            margin-top: 6px;
            word-break: break-all;
        }
        .cmt-footer{
            font-size: 12px;
            color: gray;
            margin-top: 10px;
        }
    }
}
// 文章详情-底部评论
.art-cmt-container-1{
  padding-bottom: 46px;
}
.art-cmt-container-2{
  padding-bottom: 80px;
}
//发布评论的盒子
.add-cmt-box{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  padding-left: 10px;
  .ipt-cmt-div{
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box{
    width:40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}
.child{
  width: 20px;
  height: 20px;
  background-color: #f2f3f5;
}
//发布评论的盒子-2
.cmt-box{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: white;
  textarea{
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button{
    height: 100%;
    border: none;
  }
}
</style>
