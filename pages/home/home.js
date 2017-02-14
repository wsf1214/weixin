var app=getApp();
Page({
  data:{
      homeList:""
  },
  goDetail:function(e){
  	//console.log(e.currentTarget.dataset);
		var goods=e.currentTarget.dataset;
	  	wx.navigateTo({
			url: "../detail/detail"
			
		})
		wx.setStorage({
			key: 'goods',
			data: goods
		})
  },
  onLoad:function(){
    var that=this;
    wx.request({
      url: 'http://127.0.0.1:8080/json/homeList.json',
      success: function(res){
        //console.log(res.data)
        that.setData({
            homeList:res.data
        })
      }
    })
  }
  
})