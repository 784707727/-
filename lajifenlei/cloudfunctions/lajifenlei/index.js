// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
//1:引入request-promise 库
const rp = require("request-promise");
// 云函数入口函数
exports.main = async (event, context) => {
  //创建变量url垃圾分类的地址
  // 发送ajax请求并且返回结果
  var url = `http://api.tianapi.com/txapi/lajifenlei/?key=0437716f601d422eea6dcb8afc660bf5&word=苹果核`;
  //console.log(event.value);
  return rp(url).then(res => { return res })
  .catch(err => { return err })
}