<template>
  <div class="user-edit-container">
    <!-- Header区域 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
        <van-cell title="头像" is-link center>
            <template #default>
                <van-image round class="avatar" :src="userData.photo" @click="imageFn" />
                <!-- file选择框 -->
                <input
                type="file"
                ref="iptFile"
                v-show="false"
                accept="image/*"
                @change="onFileChange" />
            </template>
        </van-cell>
        <van-cell title="名称" :value="userData.name" is-link @click="editNameFn" />
        <van-cell title="生日" :value="userData.birthday" is-link @click="birthdayFn" />
    </van-cell-group>
    <!-- 修改名称弹出层 -->
    <van-dialog
    v-model="show"
    title="修改名称"
    show-cancel-button
    :before-close="closeFn"
    v-focus>
      <input type="text" v-model="newName" placeholder="请输入名称">
    </van-dialog>
    <!-- 日期选择器 -->
    <van-popup v-model="datetimePickerShow" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="dataCancelFn"
      @confirm="dataConfirmFn"
    />
    </van-popup>
  </div>
</template>

<script>
import { getUserData, editUserPhoto, editorUserData } from '@/api'
import { formDate } from '@/utils/date'
import { Notify } from 'vant'
export default {
  name: 'UserEdit',
  data () {
    return {
      userData: {}, // 用户的信息
      show: false, // 是否显示修改名称弹出层
      newName: '', // 修改的心名称
      minDate: new Date(1920, 1, 1), // 最小范围
      maxDate: new Date(), // 最大氛围，默认获取系统日期
      currentDate: new Date(2021, 0, 17), // 当前时间
      datetimePickerShow: false // 是否显示日期选择器
    }
  },
  methods: {
    async onFileChange (e) {
      if (e.target.files.length === 0) return
      const newFd = new FormData()
      newFd.append('photo', e.target.files[0])
      const res = await editUserPhoto({ fd: newFd })
      this.userData.photo = res.data.data.photo
    },
    imageFn () {
      // 移花接木：点击头像触发file的事件
      this.$refs.iptFile.click()
    },
    editNameFn () {
      this.show = true
      this.newName = this.userData.name
    },
    async closeFn (action, done) {
      if (action === 'confirm') {
        // 正则校验，用户名只能是1-7位中英文数字
        const reg = /^[A-Za-z0-9\u4e00-\u9fa5]{1,7}$/
        if (reg.test(this.newName) === true) {
          // 符合正则校验
          await editorUserData({ name: this.newName })
          this.userData.name = this.newName
          done()
        } else {
          // 不符合正则校验
          Notify({
            type: 'warning',
            message: '用户名只能是1-7位中英文数字'
          })
          done(false)
        }
      } else {
        // 取消按钮
        done()
      }
    },
    birthdayFn () {
      // 弹出日期选择器
      this.datetimePickerShow = true
      this.currentDate = new Date(this.userData.birthday)
    },
    dataCancelFn () {
      // 日期选择器的取消事件
      this.datetimePickerShow = false
    },
    async dataConfirmFn (value) {
      const newBirthday = formDate(value)
      await editorUserData({ birthday: newBirthday })
      this.userData.birthday = newBirthday
      this.datetimePickerShow = false
    }
  },
  async created () {
    const res = await getUserData()
    this.userData = res.data.data
  }
}
</script>

<style lang="less" scoped>
    .user-edit-container{
        padding-top: 46px;
        .avatar{
            width: 50px;
            height: 50px;
        }
    }
    /deep/ .van-icon-arrow-left{
    color: #fff;
    font-size: 16px;
    }
    ::v-deep .van-dialog__content{
      text-align: center;
      input{
        padding: 15px 0;
        border: none;
        outline: none;
        text-align: center;
      }
    }
</style>
