var app = getApp();
Page({
	data: {
		haveCart: false,
		orderList: "",
		allPrice:""
	},	
	goHome: function() {
		//console.log(1)
		wx.switchTab({
			url: '../home/home'
		})
	},
	onShow: function() {
		var that = this;
		var orderList = wx.getStorageSync('orderList');
		//console.log(orderList);
		if(orderList) {
			that.setData({
				orderList: orderList
			})
		}
		var userID = wx.getStorageSync('userID');
		//console.log(userID);
		if(userID) {
			var orderList = wx.getStorageSync('orderList')
				//console.log(orderList)
			if(orderList) {
				that.setData({
					haveCart: true
				})
			} else {
				that.setData({
					haveCart: false
					//haveCart:true
				})
			}
		} else {
			that.setData({
				//haveCart:true
				haveCart: false
			})
		}
		that.test()
	},
	test:function(){
		var orderList=this.data.orderList;
		var len=orderList.length;
		var allPrice=0;
		for(var i=0;i<len;i++){
			var price=(orderList[i].price*orderList[i].num);
			allPrice+=price*1;
		}
		this.setData({
			allPrice:allPrice.toFixed(2)
		})
	}
})