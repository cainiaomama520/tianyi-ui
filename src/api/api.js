// import axios from 'axios';
import axios from '@/utils/request'
export const requestLogin = (username, password) => {
  return axios.post(`/sys/login?username=` + username + '&password=' + password).then(res => res);
};
// 退出/sys/logout
export const logout = (params) => {
  return axios.post(`/sys/logout`, params).then(res => res);
}
// export const getInfo = params => {
//   return axios.get(`/sys/auth`, {
//     params: params
//   });
// };
export const getInfo = params => {
  return axios.get(`/sys/user/info`, {
    params: params
  });
};
// 目录
export const nav = params => {
  return axios.get(`/sys/menu/nav`, {
    params: params
  });
};

