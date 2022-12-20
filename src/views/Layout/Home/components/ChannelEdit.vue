<template>
  <div class="channel-edit">
    <!-- 弹出层的头部区域 -->
    <div>
      <van-nav-bar title="频道管理">
        <template #right>
          <van-icon name="cross" size="18" color="white" @click="showPopup(false)"/>
        </template>
      </van-nav-bar>
    </div>
    <!-- 频道编辑 -->
    <div>
      <van-cell title="我的频道" :border="false">
        <van-button size="mini" round type="danger" plain @click="channelEditFn">{{isEdit===false?'编辑':'完成'}}</van-button>
      </van-cell>
      <van-grid :gutter="10">
        <van-grid-item class="channel-item" v-for="channel in channelsListUser" :key="channel.id" @click="delChannel(channel)">
        <div class="channelText">{{channel.name}}</div>
          <van-badge color="transparent" class="cross-badge" v-if="channel.name!=='推荐'" v-show="isEdit">
            <template #content>
              <van-icon name="cross" class="badge-icon" />
            </template>
          </van-badge>
        </van-grid-item>
      </van-grid>
      <van-cell title="频道推荐" :border="false"></van-cell>
      <van-grid :gutter="10">
        <van-grid-item
        class="channel-item" v-for="channel in channelsListAll"
        :key="channel.id"
        @click="addChannel(channel)">
        <div class="channelText">{{channel.name}}</div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    channelsListUser: {
      type: Array,
      required: true
    },
    channelsListAll: {
      type: Array,
      required: true
    },
    showPopup: {
      type: Function,
      required: true
    },
    addChannel: {
      type: Function,
      required: true
    },
    channelEditFn: {
      type: Function,
      required: true
    },
    isEdit: {
      type: Boolean,
      required: true
    },
    delChannel: {
      type: Function,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.channel-edit {
  .channel-item {
    height: 48px;
    /deep/ .van-grid-item__content {
      background-color: #bfbfd6;
      .van-grid-item__text {
        color: #222;
        font-size: 28px;
      }
    }
  }
}
.cross-badge{
  position: absolute;
  right: -3px;
  top: 0;
  border: none;
}
.channelText{
  font-size: 12px;
}
</style>
