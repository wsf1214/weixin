var app=getApp();
Page({
  data:{
     userID:"",
     pass:""
  },
  inputUserID:function(e){
  	var that=this;
  	that.setData({
  		userID:e.detail.value
  	})
  },
  inputPass:function(e){
  	var that=this;
  	that.setData({
  		pass:e.detail.value
  	})
  },
  login:function(){
  	var that=this;
  	var userID=that.data.userID;
  	var pass=that.data.pass;
  	//console.log(userID,pass);
  	if(userID.trim().length==0){
  		wx.showToast({
				title:"用户名不能为空",
				duration:0
			})
  	}
  	else{
  		if(pass.trim().length==0){
  			wx.showToast({
					title:"密码不能为空",
					duration:0
				})
  		}else{
  			wx.request({
					url: 'https://datainfo.duapp.com/shopdata/userinfo.php',
					data: {
						status:"login",
						userID:userID,
						password:pass
					},
					success: function(res){
						var data=res.data;
						//console.log(data);
						if(data=="0"){
							wx.showToast({
								title:"用户名不存在",
								duration:0
							})
						}
						else if(data=="2"){
							wx.showToast({
								title:"用户名密码不符",
								duration:0
							})
						}
						else{
							wx.showToast({
								title:"登录成功,即将跳转",
								duration:0
							})
							wx.setStorage({
							  key: 'isLogin',
							  data: "ok"
							})
							wx.setStorage({
							  key: 'userID',
							  data: userID
							})
							setTimeout(function(){
								wx.navigateBack()
							},1000)
						}
					}
  			})
  		}
  		}
  },
	goRegister:function(){
		wx.redirectTo({
      url:'../register/register'
    })
	}
	



  
})