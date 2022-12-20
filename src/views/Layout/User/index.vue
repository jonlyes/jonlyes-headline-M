<template>
    <div class="user-container">
        <!-- 用户基本信息面板 -->
        <div class="user-card">
            <!-- 用户头像、姓名 -->
            <van-cell>
                <!-- 使用 title 插槽来自定义标题 -->
                <template #icon>
                    <img :src="userInfo.photo" alt="" class="avatar">
                </template>
                <template #title>
                    <span class="username">{{userInfo.name}}</span>
                </template>
                <template #label>
                    <van-tag color="#fff" text-color="#007bff">申请认证</van-tag>
                </template>
            </van-cell>
            <!-- 动态、关注、粉丝 -->
            <div class="user-data">
                <div class="user-data-item">
                    <span>{{userInfo.art_count}}</span>
                    <span>关注</span>
                </div>
                <div class="user-data-item">
                    <span>{{userInfo.follow_count}}</span>
                    <span>动态</span>
                </div>
                <div class="user-data-item">
                    <span>{{userInfo.fans_count}}</span>
                    <span>粉丝</span>
                </div>
            </div>
        </div>
        <!-- 操作面板 -->
        <van-cell-group class="action-card">
            <van-cell icon="edit" title="编辑资料" is-link to="/userEdit" />
            <van-cell icon="chat-o" title="小智同学" is-link to="/chat" />
            <van-cell icon="warning-o" title="退出登录" is-link @click="logout" />
        </van-cell-group>
    </div>
</template>

<script>
import { getUserInfo } from '@/api'
import { removeToken } from '@/utils/token'
import router from '@/router'
import { Dialog } from 'vant'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    ...mapMutations(['SET_USERPHOTO']),
    // 退出登录
    logout () {
      Dialog.confirm({
        title: '标题',
        message: '这就走了？不爱我了吗？'
      })
        .then(() => {
          // on confirm
          removeToken()
          router.replace('/login')
        }).catch(() => {
        })
    }
  },
  async created () {
    const res = await getUserInfo()
    this.userInfo = res.data.data
    // 保存用户头像倒vuex状态管理
    // this.$store.commit('SET_USERPHOTO', this.userInfo.photo)
    this.SET_USERPHOTO(this.userInfo.photo)
  }
}
</script>

<style scoped lang="less">
    .user-container{
        .user-card{
            background-color: #007bff;
            color: white;
            padding-top: 20px;
            .van-cell{
                background-color: #007bff;
                color: white;
                &::after{
                    display: none;
                }
                .avatar{
                    width: 60px;
                    height: 60px;
                    background-color: #fff;
                    border-radius: 50%;
                    margin-right: 10px;
                }
                .username{
                    font-size: 14px;
                    font-weight: bold;
                }
            }
        }
        .user-data{
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            font-size: 14px;
            padding: 10px 0;
            .user-data-item{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 33.33%;
            }
        }
    }
/deep/.van-nav-bar__arrow{
    color: white;
}
</style>
