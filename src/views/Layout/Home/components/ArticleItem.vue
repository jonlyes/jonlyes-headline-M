<template>
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
          />
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
          />
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
        <van-icon name="cross" />
      </div>
    </template>
  </van-cell>
</template>
<script>
import { timeAgo } from '@/utils/date'
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object, // 校验对象类型
      required: true// 表示article参数必传
    }
  },
  data () {
    return {}
  },
  methods: {
    formatTime: timeAgo
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
