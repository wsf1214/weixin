var app = getApp();
Page({
	data: {
		goods: "",
		isLogin: false
	},

	onLoad: function() {
		var that = this;
		wx.getStorage({
			key: 'goods',
			success: function(res) {
				var data = res.data;
				var goods = data.goods;
				that.setData({
					goods: goods
				})
				//console.log(goods);
				wx.setNavigationBarTitle({
					title: goods.name
				})
			}
		})
	},
	addCart: function() {
		var that = this;
		var goods = that.data.goods;
		goods.num=1;
		//console.log(goods);
		var value = wx.getStorageSync('isLogin');
		//console.log(typeof value)
		if(value) {
			that.setData({
				isLogin: true
			})
			var cartArr=[];
			var cartList=wx.getStorageSync('cartList');
		
			console.log(cartList.length);
			if(cartList&&cartList.length!=0){
				cartArr=cartList;
				var len=cartArr.length;
				for(var i=0;i<len;i++){
					if(goods.img==cartArr[i].img){
						cartArr[i].num++;
						break;
					}
					else if(goods.img!=cartArr[i].img&&i==len-1){
						cartArr.push(goods);
						break;
					}
				}
				wx.setStorage({
				  key: 'cartList',
				  data: cartArr				 
				})
			}
			else{
				//console.log(1);
				cartArr.push(goods);
				wx.setStorage({
				  key: 'cartList',
				  data: cartArr				 
				})
			}
			//console.log(cartArr)

			wx.showToast({
				title: "加入购物车成功",
				duration: 0
			})
		} else {
			that.setData({
				isLogin: false
			})
			//console.log(1)
			wx.navigateTo({
				url: '../login/login'
			})
		}

	}

})