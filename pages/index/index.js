//index.js
//获取应用实例
const app = getApp()
var FmService = require('../../services/fm');

Page({
	data: {
		mainView: 1, // 显示的视图
		motto: 'Hello World',
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		banners: [], // 精选页面轮播图数据
		indicatorActiveColor: '#d0021b', // 轮播图选中时的颜色
		indicatorDots: true, // 轮播图的指示点
		autoplay: true, // 自动播放
		interval: 5000, // 自动切换时间间隔
		duration: 1000, // 滑动动画时长

		choicenessList: [] 
	},
	//事件处理函数
	bindViewTap: function () {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},
	onLoad: function () {
		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			})
		} else if (this.data.canIUse) {
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = res => {
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				})
			}
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: res => {
					app.globalData.userInfo = res.userInfo
					this.setData({
						userInfo: res.userInfo,
						hasUserInfo: true
					})
				}
			})
		}
		FmService.getRecommendBannerList(this.initRecommendBanner);
		FmService.getRecommendFmList(this.initRecommendFmList);
	},
	getUserInfo: function (e) {
		console.log(e)
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
	},
	tabItemTap: function (e) { // 点击切换导航
		console.log(e)
		this.setData({
			mainView: e.currentTarget.dataset.view
		})
	},
	initRecommendBanner: function (data) {
		var self = this;
		self.setData({
			banners: data.data
		})
		console.log(data.data)
	}
	,
	initRecommendFmList: function (data) {
		var self = this;
		self.setData({
			choicenessList: data.data
		})
		console.log(data.data)
	}
})
