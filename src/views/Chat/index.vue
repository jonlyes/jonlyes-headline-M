<template>
    <div class="container">
        <!-- 固定导航 -->
        <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小智同学"></van-nav-bar>
        <!-- 聊天区域 -->
        <div class="chat-list">
            <div v-for="(item,index) of list" :key="index">
                <!-- 左侧 - 小智 -->
                <div class="chat-item left" v-if="item.name!=='me'">
                    <van-image fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <div class="chat-pao">{{item.msg}}</div>
                </div>
                <!-- 右侧 - 用户 -->
                <div class="chat-item right" v-else>
                    <div class="chat-pao">{{item.msg}}</div>
                    <van-image fit="cover" round :src="$store.state.userPhoto" />
                </div>
            </div>
        </div>
        <!-- 对话区域 -->
        <div class="reply-container van-hairline--top">
            <van-field v-model="word" placeholder="说点什么..." @keyup.enter="sendFn">
                <template #button>
                    <span style="font-size:12px;color:#999" @click="sendFn">发送</span>
                </template>
            </van-field>
        </div>
    </div>
</template>

<script>
import { io } from 'socket.io-client'
import { getToken } from '@/utils/token'
export default {
  name: 'Chat',
  data () {
    return {
      word: '', // 对话内容
      token: getToken(),
      socket: null,
      list: []
    }
  },
  methods: {
    // 发送对话内容
    sendFn () {
      if (this.word.trim().length === 0) return// 输入空格或者不输入就不发送对话
      this.socket.emit('message', {
        msg: this.word,
        timestamp: new Date()
      })
      this.list.push({ name: 'me', msg: this.word })
      this.word = ''
      // 锚点 —— 滚动到底部
      this.$nextTick(() => {
        const theDic = document.querySelector('.chat-list>div:last-child')
        theDic.scrollIntoView({
          behavior: 'smooth'
        })
      })
    }
  },
  created () {
    // 建立websocket即时通讯链接
    this.socket = io('ws://geek.itheima.net', {
      query: {
        token: this.token
      },
      transports: ['websocket']
    })
    // 监听websocket是否成功建立
    this.socket.on('connect', () => {
      console.log('websocket即时通讯建立链接成功')
    })
    // 接受消息
    this.socket.on('message', data => {
      this.list.push({ name: 'xz', msg: data.msg })
      // 锚点 —— 滚动到底部
      this.$nextTick(() => {
        const theDic = document.querySelector('.chat-list>div:last-child')
        theDic.scrollIntoView({
          behavior: 'smooth'
        })
      })
    })
  },
  destroyed () {
    this.socket.close()
    this.socket = null
    console.log('通讯链接关闭成功')
  }
}
</script>

<style lang="less" scoped>
.container{
    height: 100%;
    width: 100%;
    position :absolute;
    left:0;
    top: 0;
    box-sizing: border-box;
    background: #fafafa;
    padding: 46px 0 50px 0;
    .chat-list{
        height: 100%;
        overflow-y: scroll;
        .chat-item{
            padding: 10px;
            .van-image{
                vertical-align: top;
                width: 40px;
                height: 40px;
            }
            .chat-pao{
                vertical-align: top;
                display: inline-block;
                min-width: 40px;
                max-width: 70%;
                min-height: 40px;
                line-height: 38px;
                border: 0.5px solid #c2d9ea;
                border-radius: 4px;
                position: relative;
                padding: 0 10px;
                background-color: #e0effb;
                word-break: break-all;
                font-size: 14px;
                color: #333;
                &::before{
                    content: '';
                    width: 10px;
                    height: 10px;
                    position: absolute;
                    top: 12px;
                    border-top: 0.5px solid #c2d9ea;
                    border-right: 0.5px solid #c2d9ea;
                    background: #e0effb;
                }
            }
        }
    }
}
.chat-item.right{
    text-align: right;
    .chat-pao{
        margin-left: 0;
        margin-right: 15px;
        &::before{
            right: -5px;
            transform: rotate(45deg);
        }
    }
}
.chat-item.left{
    text-align: left;
    .chat-pao{
        margin-right: 0;
        margin-left: 15px;
        &::before{
            left: -5px;
            transform: rotate(-135deg);
        }
    }
}
.reply-container{
    position: fixed;
    left: 0;
    bottom: 0;
    height: 44px;
    width: 100%;
    background: #f5f5f5;
    z-index: 9999;
}
/deep/ .van-icon-arrow-left.van-nav-bar__arrow{
    color: #fff;
    font-size: 16px;
}
</style>
