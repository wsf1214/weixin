var app=getApp();
Page({
  data:{
      list:""
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
  onLoad:function(options){
    var that=this;
  	var index=options.index;
  	wx.request({
      url: 'http://127.0.0.1:8080/json/kind.json',
      success: function(res){
        var data=res.data[index];
        //console.log(data);
        that.setData({
          list:data
        })
      } 
    })
  }
  
  
})