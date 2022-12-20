<template>
  <div>
    <!-- 一条文章 -->
    <van-cell>
      <template #title>
        <div title-box>
          <!-- 标题 -->
          <div class="title">{{ article.title }}</div>
          <!-- 单图 -->
          <div v-if="article.cover.type === 1">
            <van-image
              slot="default"
              class="thumb"
              :src="article.cover.images[0]"
            >
              <template v-slot:error>图片跑路了</template>
            </van-image>
          </div>
        </div>
          <!-- 多图 -->
        <div v-if="article.cover.type >1" class="thumb-box">
          <div
            v-for="(img, index) in article.cover.images"
            :key="index"
          >
            <van-image
              class="thumb"
              :src="img"
            >
              <template v-slot:error>图片跑路了</template>
            </van-image>
          </div>
        </div>
      </template>
      <template #label>
        <div class="label-box">
          <div>
            <span>{{ article.aut_name }}</span>
            <span>{{ article.comm_count }}评论</span>
            <span>{{formatTime(article.pubdate) }}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon name="cross" @click.stop="show=true" v-if="isCross"/>
        </div>
      </template>
    </van-cell>
    <!-- 反馈面板 -->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      :cancel-text="cancelText"
      close-on-click-action
      get-container="body"
      @select="onSelect"
      @cancel="onCancel"
      @close="onClose"/>
  </div>
</template>
<script>
import { timeAgo } from '@/utils/date'
import { firstActions, secondActions } from '@/api/report'
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object, // 校验对象类型
      required: true// 表示article参数必传
    },
    disLikeEv: {
      type: Function
    },
    reportArticleEv: {
      type: Function
    },
    isCross: {
      type: Boolean,
      default: () => true
    }
  },
  data () {
    return {
      show: false,
      actions: firstActions,
      cancelText: '取消'
    }
  },
  methods: {
    formatTime: timeAgo,
    onCancel () { // 点击取消或返回触发
      this.show = true
      if (this.cancelText === '取消') {
        this.show = false
      } else {
        this.cancelText = '取消'
        this.actions = firstActions
      }
    },
    onSelect (actions, index) { // 点击面板选项触发
      this.show = true
      if (actions.name === this.actions[1].name) {
        this.cancelText = '返回'
        this.actions = secondActions
      } else if (actions.name === '不感兴趣') {
        // 发射事件-对文章不喜欢
        this.$emit('disLikeEv', this.article.art_id)
        this.show = false
      } else {
        // 发射事件-举报文章
        this.$emit('reportArticleEv', this.article.art_id, index)
        this.show = false
      }
    },
    onClose () {
      this.cancelText = '取消'
      this.actions = firstActions
    }
  }
}
</script>

<style scoped lang="less">
.title-box{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
.label-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.label-box span{
    margin: 0 3px;
    &:first-child{
        margin: 0;
    }
}
.cover-wrap{
    display: flex;
  }
  .thumb{
    width:113px;
    height: 70px;
    background-color: #f8f8f8;
    object-fit: cover;
  }
  .thumb-box{
    display: flex;
    justify-content: space-between;

  }
</style>
