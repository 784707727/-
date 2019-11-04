// pages/shouye/shouye.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
        content:"",
        showView:false,
        id:"",
        uname:"",
        yq:"",
    list: ["/images/khsw.jpeg", "/images/yhlj.jpeg", "/images/slj.jpeg", "/images/glj.jpeg",],
    img:""
  },
  //搜索内容
  onSearch(e){
    //this.setData({showView:true})
    var id;
    var a = e.detail;
    //修改content的值
    this.setData({
      content:a
    });
    if(!a){
      wx.showToast({
        title: '内容不能为空',
      })
      return}
      
    //console.log(this.data.content);
    db.collection("product")
      .where({name:this.data.content})
      .get()
      .then(res=>{
        if(res.data.length==0){
          this.setData({showView:false,content:""});
          wx.showToast({title:"没有此内容"})
          return}
        this.setData({
          showView: res.data.length > 0 ? true : false,
          id:res.data[0].sortId,
          img: this.data.list[res.data[0].sortId-1]
          
          })
        //console.log(this.data.id) 
        db.collection("sort")
          .where({ _id: `${this.data.id}` })
          .get()
          .then(res => {
            //console.log(res);
            this.setData({
              uname: res.data[0].name,
              yq:res.data[0].yq
            })
          })
          .catch(err => { console.log(err) })
        })
      .catch(err=>{console.log(err)})
     
  },
  //点击取消清空文本框中的文字
  onCancel(){
    this.setData({
      content:"",
      showView:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})