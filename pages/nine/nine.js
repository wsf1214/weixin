var app = getApp();
Page({
	data: {
		animationData: {},
		index:"0",
		more:"false",
		moreImg:"../../image/more.png",
		moreText:"更多",
		allNine:"",
		nineList:""
	},
	onLoad:function(){
    var that=this;
    wx.request({
      url: 'http://127.0.0.1:8080/json/nine.json',
      success: function(res){
        //console.log(res.data);
        var data=res.data;
        that.setData({
        	allNine:data,
        	nineList:data[0]
        })
      }
    })
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
	changeList:function(e){
		var that=this;
		var index=e.currentTarget.dataset.index;
		var data=that.data.allNine;
		that.setData({
			index:index,
			nineList:data[index]
		})
	},
	toggle:function(){
		var that=this;
		var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
   })
    this.animation = animation;
		if(that.data.more=="false"){
			animation.height("260rpx").step();
			that.setData({
				more:"true",
				moreText:"收起",
				moreImg:"../../image/pickup.png"
			})
		}
		else{
			animation.height("130rpx").step();
			that.setData({
				more:"false",
				moreText:"更多",
				moreImg:"../../image/more.png"
			})
		}
    
    this.setData({
      animationData:animation.export()
    })
	}
})