import request from '@/utils/request'
import { getToken } from '@/utils/token'
// 封装所有的请求

// 登录 — 登录接口
export const loginAPI = ({ mobile, code }) => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})

// 新闻-获取文章新闻推荐
export const getArticleNewsRecommendation = ({ channel_id, timestamp }) => request({
  url: '/v1_0/articles',
  method: 'GET',
  params: {
    channel_id,
    timestamp
  }
})

// 频道 - 获取所有的频道列表
export const getAllChannelList = () => request({
  url: '/v1_0/channels',
  method: 'GET'
})

// 频道 - 获取用户的频道列表（没有登录的用户会返回后台的默认列表）
export const getUserChanneList = () => request({
  url: '/v1_0/user/channels',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken() || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU'}`
  }
})

// 搜索 - 获取搜索结果
export const getSearchResults = (q, page = null, per_page = null) => request({
  url: '/v1_0/search',
  method: 'GET',
  data: {
    q,
    page,
    per_page
  }
})

// 搜索 - 获取联想建议（自动补全）
export const getLenovoSuggested = (q) => request({
  url: ' /v1_0/suggestion',
  method: 'GET',
  data: {
    q
  }
})

// 用户 - 编辑用户个人资料
export const editUserProfile = (q) => request({
  url: ' /v1_0/suggestion',
  method: 'PATCH',
  data: {
    q
  }
})
