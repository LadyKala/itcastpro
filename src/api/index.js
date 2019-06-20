import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么?获取token,传递
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

// 实现登录
export const login = (obj) => {
  // axios.post是一个promise对象
  // .then 返回的还是一个对象
  return axios.post('login', obj)
  // 成功的一个回调
    .then((result) => {
      // console.log(result)
      // then的回调函数中的返回值最终会返回到这个对象的then方法中
      return result.data
    })
}

// 实现用户获取
export const getUserList = (obj) => {
  return axios.get('users', {
    params: obj
  })
    .then((result) => {
      return result.data
    })
}

// 实现编辑用户提交
export const editUser = (obj) => {
  return axios.put(`users/${obj.id}`, obj)
    .then((result) => {
      return result.data
    })
}

// 实现删除单个用户
export const delUser = (id) => {
  return axios.delete(`users/${id}`)
    .then((result) => {
      // console.log(id)
      return result.data
    })
}
// 分配角色获取
export const showRoleDialog = (obj) => {
  return axios.put(`users/${obj.id}/role`, obj.rid)
    .then((result) => {
      console.log(result)
    })
}
// 提交分配角色
export const updateRole = (id, rid) => {
  return axios.put(`users/${id}/role`, { rid: rid })
    .then((result) => {
      return result.data
    })
}
