(function (exports) {
	// 获取精选页面banner
	exports.getRecommendBannerList = function(callback) {
		wx.request({
			url: 'http://i.qingting.fm/capi/neo-recommend/banner',
			header: {
				'Content-Type': 'application/json'
			},
			success: function(res) {
				console.log(res)
				callback(res.data)
			}
		})
	}

	// 获取精选页面Fm内容
	exports.getRecommendFmList = function(callback) {
		var category = [3617, 3629, 521, 3636, 545, 527, 529, 3251, 523]
		category.forEach(function (cate) {
			cate += '_'
		})
		category = category.join('_');
		wx.request({
			url: 'http://recpage.c.qingting.fm/v2/hotpage/category/' + category,
			header: {
				'Content-Type': 'application/json'
			},
			success: function(res) {
				console.log(res)
				callback(res.data)
			}
		})
	}
}(module.exports))