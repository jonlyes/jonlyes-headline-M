<template>
    <div>
        <!-- 搜素页面头部 -->
        <div class="search-header">
            <!-- 后退组件 -->
            <van-icon name="arrow-left" color="white" size="18" class="goBack" @click="$router.back()" />
            <!-- 搜素组件 -->
            <van-search
            v-model.trim="keyWord"
            placeholder="请输入关键词"
            background="#007BFF"
            shape="round"
            v-focus
            @input="inputFn"
            @search="searchFn" />
        </div>
        <!-- 搜索建议列表 -->
        <div class="suggest-list" v-if="suggestList.length!==0">
          <div class="suggest-item"
           v-for="(item,index) of suggestList"
           :key="index"
           v-html="lightFn(item,keyWord)"
           @click="searchFn(item)"></div>
        </div>
        <!-- 搜索历史 -->
        <div class="search-history" v-else>
          <!-- 标题 -->
          <van-cell title="搜索历史">
            <!-- 右侧图标 -->
            <template #right-icon>
              <van-icon name="delete" class="search-icon" @click="delFn" />
            </template>
          </van-cell>
          <!-- 历史列表 -->
          <div class="history-list">
            <span class="history-item" v-for="(item,index) of history" :key="index" @click="searchFn(item)">{{item}}</span>
          </div>
        </div>
    </div>
</template>

<script>
import { getLenovoSuggested } from '@/api'
export default {
  data () {
    return {
      keyWord: '', // 搜素关键词
      timer: null, // 防抖函数的时间戳
      suggestList: [], // 联想建议列表
      history: JSON.parse(localStorage.getItem('history')) || []
    }
  },
  methods: {
    inputFn () {
      // 防抖函数
      clearTimeout(this.timer)
      if (this.keyWord.length === 0) {
        // keyWord值为空就清空suggestList数组
        this.suggestList = []
      } else {
        this.timer = setTimeout(async () => {
          // 获取联想建议列表
          const res = await getLenovoSuggested({ q: this.keyWord })
          this.suggestList = res.data.data.options
        }, 500)
      }
    },
    lightFn (originStr, target) {
      // 关键词高亮函数
      // origin 原始的字符串
      // target 关键字
      const reg = new RegExp(target, 'ig')
      // 使用可选链，在origin没值的时候直接返回undefined，避免空值调用replace函数报错
      return originStr?.replace(reg, (match) => {
        return `<span style="color:red;">${match}</span>`
      })
    },
    searchFn (value) {
      // 搜索函数
      if (value.trim().length > 0) {
        // 历史记录去重并保存到本地存储中
        this.history.push(value)
        const newHistory = []
        this.history.forEach((item) => {
          if (newHistory.indexOf(item) === -1) newHistory.push(item)
        })
        this.history = newHistory
        localStorage.setItem('history', JSON.stringify(newHistory))
        // 路由跳转
        this.$router.push(`/SearchResult/${value}`)
      }
    },
    delFn () {
      // 清楚历史记录
      this.history = []
      localStorage.removeItem('history')
    }
  }
}
</script>

<style scoped lang="less">
.search-header{
    height: 46px;
    display: flex;
    align-items: center;
    background-color:#007bff;
    /* 后退按钮 */
    .goBack{
        padding-left: 14px;
    }
    .van-search{
        flex: 1;
        height: 46px;
    }
}
.suggest-list{
  .suggest-item{
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    //实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.search-icon{
  font-size: 16px;
  line-height: inherit;
}
.history-list{
  padding: 0 10px;
  .history-item{
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>
