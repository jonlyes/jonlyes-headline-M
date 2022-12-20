<template>
  <div>
    <div>
      <van-nav-bar fixed>
        <template #left>
          <img src="@/assets/logo.png" alt="" class="logo">
        </template>
        <template #right>
          <van-icon name="search" size="18" color="#fff" @click="moveSearch"/>
        </template>
      </van-nav-bar>
    </div>
    <div class="main">
      <van-tabs v-model="channelId" animated sticky offset-top="46px">
        <van-tab
        v-for="channel in channelsListUser"
        :key="channel.id"
        :title="channel.name"
        :name="channel.id">
        <ArticleList :channelId="channelId"></ArticleList>
        </van-tab>
      </van-tabs>
      <!-- 编辑频道图标 -->
      <van-icon name="plus" size="16px" class="moreChannels" @click="showPopup(true)" />
    </div>
    <!-- 频道管理弹出层 -->
    <van-popup v-model="show" position="bottom">
      <!-- 编辑管理层组件 -->
      <ChannelEdit
      :channelsListUser="channelsListUser"
      :channelsListAll="unCheckChannelsList"
      :isEdit="isEdit"
      :showPopup="showPopup"
      :addChannel="addChannel"
      :delChannel="delChannel"
      :channelEditFn="channelEditFn">
      </ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannelList, getAllChannelList, upUserChannelList, delUserChannel } from '@/api'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './components/ChannelEdit.vue'
export default {
  components: { ArticleList, ChannelEdit },
  data () {
    return {
      show: false,
      channelId: 0,
      channelsListUser: [],
      channelsListAll: [],
      isEdit: false
    }
  },
  computed: {
    unCheckChannelsList () {
      // 频道列表去重，将全部频道减去用户频道
      const channelUser = JSON.stringify(this.channelsListUser)
      return this.channelsListAll.filter((item) => {
        return channelUser.indexOf(JSON.stringify(item)) === -1
      })
    }
  },
  methods: {
    showPopup (boolean) {
      this.isEdit = false
      this.show = boolean
    },
    moveSearch () {
      // 跳转到Search组件
      this.$router.push('/search')
    },
    async addChannel (channel) {
      if (this.isEdit) {
        this.channelsListUser.push(channel)
        // 对象拷贝
        const newChannels = JSON.parse(JSON.stringify(this.channelsListUser))
        // 过滤掉推荐
        const newArr = newChannels.filter((item, index) => {
          return index !== 0
        })
        // 删除channel对象的name属性，添加seq属性作为顺序序号
        const newChannelsList = newArr.map((channel, index) => {
          delete channel.name
          channel.seq = `${index}`
          channel.id = `${channel.id}`
          return channel
        })
        await upUserChannelList({ channels: newChannelsList })
      }
    },
    channelEditFn () {
      this.isEdit = !this.isEdit
    },
    async delChannel (channel) {
      if (this.isEdit) {
        // 删除用户频道的channel
        if (channel.id !== 0) {
          const index = this.channelsListUser.findIndex((obj) => obj.id === channel.id)
          this.channelsListUser.splice(index, 1)
          await delUserChannel({ id: channel.id })
        }
      } else {
        this.show = false
        this.channelId = channel.id
      }
    }
  },
  async created () {
    // 获取用户的频道列表
    const res = await getUserChannelList()
    this.channelsListUser = res.data.data.channels
    const res2 = await getAllChannelList()
    this.channelsListAll = res2.data.data.channels
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
  /deep/ .van-tabs__wrap{
    padding-right: 30px;
    background-color: #fff;
  }
  .moreChannels{
    position: fixed;
    top: 60px;
    right: 8px;
    z-index: 999;
  }
  /deep/ .van-popup{
    width:100vw;
    height: 100vh;
  }
</style>
