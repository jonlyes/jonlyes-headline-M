<template>
  <div>
    <van-nav-bar title="新闻头条-登录"/>
    <van-form @submit="onSubmit">
      <van-field
         v-model="user.mobile"
         name="mobile"
         label="手机号码"
         required
         placeholder="请输入手机号码"
         :rules="[{ required: true, message: '请填写正确手机号码' ,pattern:/^1[3-9]\d{9}$/}]"
       />
       <!-- 密码必须是2406810 -->
      <van-field
         v-model="user.code"
         type="password"
         name="code"
         label="密码"
         required
         placeholder="请输入密码"
         :rules="[{ required: true, message: '请填写正确密码',pattern:/^\d{6}$/ }]"
       />
      <div style="margin: 16px;">
        <van-button
         round
         block
         :loading="isLoading"
         loading-text="登录ing..."
         :disabled="isLoading"
         type="info"
         native-type="submit"
         >登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI } from '@/api/index'// 登录接口
import { Notify } from 'vant'// 消息通知函数
import { setToken } from '@/utils/token'// 设置token函数
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isLoading: false
    }
  },
  methods: {
    async onSubmit (values) {
      this.isLoading = true
      try {
        const res = await loginAPI(values)
        Notify({ type: 'success', message: '登录成功!!!' })
        setToken(res.data.data.token)// 存储token
        this.$router.replace({ // 直接替换掉路径，不会产生历史记录，不需要回退到登录页
          path: '/layout/home'
        })
      } catch (error) {
        Notify({ type: 'danger', message: '账号或密码错误' })
      }
      this.isLoading = false
    }
  }
}
</script>

<style scoped lang="less">

</style>
