var app=getApp();
Page({
  data:{
      
  },
  goList:function(e){
  	var index=e.currentTarget.dataset.list;
  	wx.navigateTo({
	      	url: "../list/list?index="+index
	  })
  }
})