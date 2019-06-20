import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 1.获取token
  var token = localStorage.getItem('itcastpro_token')
  if (token) {
    // 2.在发送请求的时候传递token
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 获取所有权限列表数据
export const getAllRightList = (type) => {
  return axios({
    type: 'get',
    url: `rights/${type}`
  })
}
// 获取所有角色列表数据
export const getAllRoleList = () => {
  return axios.get('roles')
    .then((result) => {
      return result.data
    })
}
// 获取所有权限删除的id
export const removeRightByUserId = (roleId, rightId) => {
  return axios.delete(`roles/${roleId}/rights/${rightId}`)
}
// 获取添加角色数据
export const addFormVisible = (obj) => {
  return axios.post('roles', obj)
    .then((result) => {
      return result
    })
}
// 授权角色
export const grantRoleSubmit = (roleId, rids) => {
  return axios.post(`roles/${roleId}/rights`, { rids: rids })
}
