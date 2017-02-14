var app=getApp();
Page({
  data:{
    userID:"",
    pass1:"",
    pass2:""
  },
  inputUserID:function(e){
  	var that=this;
  	that.setData({
  		userID:e.detail.value
  	})
  },
  inputPass1:function(e){
  	var that=this;
  	that.setData({
  		pass1:e.detail.value
  	})
  },
  inputPass2:function(e){
  	var that=this;
  	that.setData({
  		pass2:e.detail.value
  	})
  },
  register:function(){
  	var that=this;
  	var userID=that.data.userID;
  	var pass1=that.data.pass1;
  	var pass2=that.data.pass2;
  	//console.log(userID,pass1,pass2);
  	if(userID.trim().length==0){
			wx.showToast({
				title:"用户名不能为空",
				duration:0
			})
  	}
  	else{
  		if(pass1.trim().length==0){
  			wx.showToast({
					title:"密码不能为空",
					duration:0
				})
  		}else{
  			if(pass2!=pass1){
  				wx.showToast({
						title:"两次输入密码不一致",
						duration:0
					})
  			}
  			else{
  				wx.request({
					url: 'https://datainfo.duapp.com/shopdata/userinfo.php',
					data: {
						status:"register",
						userID:userID,
						password:pass1
					},
					success: function(res){
					  var data=res.data;
					  if(data=="0"){
					  	wx.showToast({
								title:"用户名已存在",
								duration:0
							})
					  }
					  else if(data=="2"){
					  	wx.showToast({
								title:"数据库报错",
								duration:0
							})
					  }
					  else{
					  	wx.showToast({
								title:"注册成功,即将转到登录界面",
								duration:0
							})
					  	setTimeout(function(){
					  		wx.navigateTo({
									url: '../login/login'
								})
					  	},1000)
					  }
					}
				  })
  			}
  		}
  	}
  },
  goLogin:function(){
  	wx.redirectTo({
      url: '../login/login'
      
    })
  }
  
})