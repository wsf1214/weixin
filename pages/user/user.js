var app=getApp();
Page({
  data:{
      name:"测试",
      isLogin:false,
      userID:""
  },
  onShow:function(){
  	var that=this;
      wx.getStorage({
        key: 'isLogin',
        success: function(res){
        	var data=res.data;
          //console.log(res.data);
          if(data=="ok"){
          	that.setData({
          		isLogin:true
          	})
          }
        },
        fail:function(){
          	that.setData({
          		isLogin:false
          	})
        }
      })
      wx.getStorage({
        key: 'userID',
        success: function(res){
        	var data=res.data;
          //console.log(res.data);
          if(data){
          	that.setData({
          		userID:data
          	})
          }
        }
      })
  },
    

 	goOrder:function(){
 		wx.navigateTo({
      	url: "../order/order"
    })
 	},
  goLogin:function(){
  	wx.navigateTo({
	      	url: "../login/login"
	    })

  },
  goRegister:function(){
  	wx.navigateTo({
	      	url: "../register/register"
	    })
  },
  exitLogin:function(){ 	
  	var that=this;
		wx.showModal({
		 title: '提示',
		 content: '确认退出？',
		 success: function(res) {
		  if (res.confirm) {
		   wx.removeStorage({
				  key: 'isLogin'
				})
		   that.setData({
		   	isLogin:false
		   })
		   wx.removeStorage({
				  key: 'userID'
				})
		   that.setData({
		   	userID:""
		   })
		  }
		 }
		})

  }  
})