import request from '@/utils/request'
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

// 新闻 - 对文章不喜欢
export const disLikeActionItem = ({ target }) => request({
  url: '/v1_0/article/dislikes',
  method: 'POST',
  data: {
    target
  }
})

// 新闻 - 举报文章
export const reportArticleItem = ({ target, type }) => request({
  url: '/v1_0/article/reports',
  method: 'POST',
  data: {
    target,
    type,
    remark: '我就是不喜欢'
  }
})

// 新闻 - 获取文章详情
export const getArticleDetail = ({ art_id }) => request({
  url: `/v1_0/articles/${art_id}`,
  method: 'GET'
})

// 新闻 - 对文章点赞
export const giveArticleLike = ({ target }) => request({
  url: '/v1_0/article/likings',
  method: 'POST',
  data: {
    target
  }
})

// 新闻 - 取消对文章点赞
export const cancelArticleLike = ({ target }) => request({
  url: `/v1_0/article/likings/${target}`,
  method: 'DELETE'
})

// 频道 - 获取所有的频道列表
export const getAllChannelList = () => request({
  url: '/v1_0/channels',
  method: 'GET'
})

// 频道 - 获取用户的频道列表（没有登录的用户会返回后台的默认列表）
export const getUserChannelList = () => request({
  url: '/v1_0/user/channels',
  method: 'GET'
})

// 频道 - 重置式更新用户频道
export const upUserChannelList = ({ channels }) => request({
  url: '/v1_0/user/channels',
  method: 'PUT',
  data: {
    channels
  }
})

// 频道 - 删除用户的频道
export const delUserChannel = ({ id }) => request({
  url: `/v1_0/user/channels/${id}`,
  method: 'DELETE'
})

// 搜索 - 获取搜索结果
export const getSearchResults = ({ page = 1, per_page = 10, q }) => request({
  url: '/v1_0/search',
  method: 'GET',
  params: {
    page,
    per_page,
    q
  }
})

// 搜索 - 获取联想建议（自动补全）
export const getLenovoSuggested = ({ q }) => request({
  url: '/v1_0/suggestion',
  method: 'GET',
  params: {
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

// 用户 - 关注用户
export const focusUser = ({ target }) => request({
  url: '/v1_0/user/followings',
  method: 'POST',
  data: {
    target
  }
})

// 用户 - 取消关注用户
export const cancelFocus = ({ target }) => request({
  url: `/v1_0/user/followings/${target}`,
  method: 'DELETE'
})

// 用户 - 获取用户资料
export const getUserData = () => request({
  url: '/v1_0/user/profile'
})

// 用户 - 编辑用户资料
export const editorUserData = (obj) => request({
  url: '/v1_0/user/profile',
  method: 'PATCH',
  data: obj
})

// 用户 -获取用户自己的信息
export const getUserInfo = () => request({
  url: '/v1_0/user'
})

// 用户 - 获取用户的关注列表
export const userFocusList = () => request({
  url: 'v1_0/user/followings',
  method: 'GET'
})

// 用户 - 编辑用户头像
export const editUserPhoto = ({ fd }) => request({
  url: '/v1_0/user/photo',
  method: 'PATCH',
  data: fd
})

// 评论 - 获取文章评论和回复
export const getComment = ({ type = 'a', source, offset = null, limit = 10 }) => request({
  url: '/v1_0/comments',
  method: 'GET',
  params: {
    type,
    source,
    offset,
    limit
  }
})

// 评论 - 给评论点赞
export const CommentLike = ({ target }) => request({
  url: '/v1_0/comment/likings',
  method: 'POST',
  data: {
    target
  }
})

// 评论 - 取消评论点赞
export const cancelCommentLike = ({ target }) => request({
  url: `/v1_0/comment/likings/${target}`,
  method: 'DELETE'
})

// 评论 - 给文章或者评论进行评论
export const articleComments = ({ content, art_id, target = art_id }) => request({
  url: '/v1_0/comments',
  method: 'POST',
  data: {
    target,
    content,
    art_id
  }
})
