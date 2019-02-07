import { stringify } from "qs"
import request from "./request"

const dev = process.env.NODE_ENV === "development"
const host = "http://192.168.43.9:3000" // 手机热点地址
// const host = "http://192.168.0.106:3000" //家里wifi地址

// 请求地址是当前访问地址
const currentHost = () => {
  if (dev || /^[\d]|localhost/.test(window.location.host)) {
    return host
  }
  return window.location.hostname
}

console.log('环境变量', currentHost());
// 自定义前缀，对应后端微服务
const apiUrlfun = val => {
  if (val) {
    return `${currentHost()}/api/${val}`
  }
  return `${currentHost()}/api`
}

export { stringify, apiUrlfun, request, host }
