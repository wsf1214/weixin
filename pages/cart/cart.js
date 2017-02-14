var app = getApp();
Page({
	data: {
		haveCart: false,
		cartList: "",
		allPrice: "",
		orderList:""
	},
	goHome: function() {
		//console.log(1)
		wx.switchTab({
			url: '../home/home'
		})
	},
	onShow: function() {
		console.log(this)
		var that = this;
		var cartList = wx.getStorageSync('cartList');
		//console.log(cartList);
		if(cartList) {
			that.setData({
				cartList: cartList
			})
		}
		var userID = wx.getStorageSync('userID');
		//console.log(userID);
		if(userID) {
			var cartList = wx.getStorageSync('cartList')
				//console.log(cartList)
			if(cartList) {
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
	test: function() {
		var cartList = this.data.cartList;
		var len = cartList.length;
		var allPrice = 0;
		for(var i = 0; i < len; i++) {
			var price = (cartList[i].price * cartList[i].num);
			allPrice += price * 1;
		}
		this.setData({
			allPrice: allPrice.toFixed(2)
		})
	},
	reduce: function(e) {
		var cartList = this.data.cartList;
		//console.log(cartList)
		var goods = e.target.dataset.goods;
		var index = e.target.dataset.index;
		//console.log(index);
		if(goods.num == 1) {
			wx.showToast({
				title: "数量至少为1",
				duration: 0
			})
		} else {
			cartList[index].num--;
			this.setData({
				cartList: cartList
			})
		}
		wx.setStorage({
			key: 'cartList',
			data: cartList
		})
		this.test();
	},
	add: function(e) {
		var cartList = this.data.cartList;
		//console.log(cartList)
		var goods = e.target.dataset.goods;
		var index = e.target.dataset.index;
		//console.log(index);
		cartList[index].num++;
		this.setData({
			cartList: cartList
		})
		wx.setStorage({
			key: 'cartList',
			data: cartList
		})
		this.test();
	},
	dete: function(e) {
		var that = this;
		var cartList = this.data.cartList;
		console.log(cartList)
		var goods = e.target.dataset.goods;
		var index = e.target.dataset.index;
		console.log(index);
		wx.showModal({
			title: '提示',
			content: '确认删除？',
			success: function(res) {
				if(res.confirm) {
					
					cartList.splice(index, 1);
					that.setData({
						cartList: cartList
					})
					wx.setStorage({
						key: 'cartList',
						data: cartList
					})
					
					that.test();
					if(cartList.length == 0) {
						wx.removeStorage({
							key: 'cartList'
						})
						wx.showToast({
							title: "操作成功，正在跳转",
							duration: 0
						})
						setTimeout(function() {
							wx.switchTab({
								url: '../home/home'
							})
						}, 1500)
					}
				}
			}
		})

	},
	toPay: function() {
		var that = this;
		console.log(that.data.cartList);
		wx.showModal({
			title: '提示',
			content: '确认结算？',
			success: function(res) {
				if(res.confirm) {
					var orderList=wx.getStorageSync('orderList');
					var cartList=that.data.cartList;
					var orderArr=[];
					if(orderList&&orderList.length!=0){
						orderArr=orderList;
						var len1=cartList.length;
						var len2=orderArr.length;
						for(var i=0;i<len1;i++){
							for(var j=0;j<len2;j++){
								if(cartList[i].img==orderArr[j].img){
									orderArr[j].num=orderArr[j].num*1+cartList[i].num*1;
									break;
								}
								else if(cartList[i].img!=orderArr[j].img&&j==len2-1){
									orderArr.push(cartList[i]);
									break;
								}
							}
						}
						that.setData({
							orderList:orderArr
						})
					}
					else{
						orderArr=cartList;
						that.setData({
							orderList:orderArr
						})						
					}
					
					wx.setStorage({
						key: 'orderList',
						data: that.data.orderList
					})
					that.setData({
						cartList: ""
					})
					that.test();
					wx.removeStorageSync('cartList');
					wx.showToast({
						title: "操作成功，正在跳转",
						duration: 0
					})
					setTimeout(function() {
						wx.switchTab({
							url: '../home/home'
						})
					}, 1500)
				}
			}
		})
	}
})