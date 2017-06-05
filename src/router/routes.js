export default [{
		name: 'login', //登录
		path: '/login',
		component: require('../page/auth/login.vue'),
		meta: {
			title: '登录'
		},
		children: [{
			name: 'findpwd', //登录 > 找回密码
			path: '/login-findpwd',
			component: require('../page/auth/sub/findpwd.vue'),
			meta: {
				title: '找回密码'
			},
			children: [{
				name: 'set-login-pwd', //登录 > 找回密码 > 设置密码
				path: '/login-findpwd-setpwd',
				component: require('../page/auth/sub/findpwd-setpwd.vue'),
				meta: {
					title: '设置密码'
				}
			}]
		}]
	},
	{
		name: 'register', //注册
		path: '/register',
		component: require('../page/auth/register.vue'),
		meta: {
			title: '注册'
		}
	},
	{
		name: 'profile', //我的
		path: '/profile',
		meta: {
			auth: 1,
			title: '我的'
		},
		component: require('../page/profile/profile.vue'),
		children: [{
				name: 'userInfo', //我的 > 我的资料
				path: '/profile-userInfo',
				component: require('../page/profile/me/userInfo.vue'),
				meta: {
					title: '我的资料'
				},
				children: [{
						name: 'usualaddress', //我的 > 我的资料
						path: '/usualaddress',
						component: require('../page/profile/me/usual-address.vue'),
						meta: {
							title: '常用地址'
						},
						children: [{
							name: 'usualaddressadd', //我的 > 我的资料
							path: '/usualaddressadd/:id',
							component: require('../page/profile/me/add-address.vue'),
							meta: {
								title: '新增地址'
							}
						}]
					},
					{
						name: 'linkmanadd', //我的 > 我的资料
						path: '/linkmanadd',
						component: require('../page/profile/me/linkman-add.vue'),
						meta: {
							title: '常用地址'
						}
					},
					{
						name: 'realnameinfo', //我的 > 真实姓名
						path: '/realnameinfo',
						component: require('../page/profile/me/realnameinfo.vue'),
						meta: {
							title: '真实姓名'
						}
					}
				]
			},
			{
				name: 'wallet', //我的 > 我的钱包
				path: '/profile-wallet',
				component: require('../page/profile/sub/wallet.vue'),
				meta: {
					title: '我的钱包'
				},
				children: [{
					name: 'recharge', //我的 > 我的钱包 > 充值
					path: '/profile-wallet-recharge',
					component: require('../page/profile/sub/wallet-recharge.vue'),
					meta: {
						title: '钱包充值'
					}
				}, {
					name: 'withdraw', //我的 > 我的钱包 > 取现
					path: '/profile-wallet-withdraw',
					component: require('../page/profile/sub/wallet-withdraw.vue'),
					meta: {
						title: '钱包取现'
					}
				}]
			},
			{
				name: 'news', //我的 > 我的消息
				path: '/profile-news',
				component: require('../page/profile/me/news.vue'),
				meta: {
					title: '我的消息'
				},
				children: [{
					name: 'news-info', //我的 > 我的消息
					path: '/news-info',
					component: require('../page/profile/me/news-info.vue'),
					meta: {
						title: '消息详情'
					}
				}]
			},
			{
				name: 'setup', //我的 > 我的设置
				path: '/profile-setup',
				component: require('../page/profile/set/setup.vue'),
				meta: {
					title: '我的设置'
				},
				children: [{
					name: 'setpwd', //我的 > 我的设置 > 密码设置
					path: '/profile-setup-setpwd',
					component: require('../page/profile/set/setup-pwd.vue'),
					meta: {
						title: '密码设置'
					},
					children: [{
							name: 'resetloginpwd', //我的 > 我的设置 > 密码设置 > 重置登录密码
							path: '/profile-setup-resetloginpwd',
							component: require('../page/profile/set/reset-loginpwd.vue'),
							meta: {
								title: '重置登录密码'
							}
						},
						{
							name: 'resetpaypwd', //我的 > 我的设置 > 密码设置 > 重置支付密码
							path: '/profile-setup-resetpaypwd',
							component: require('../page/profile/set/reset-paypwd.vue'),
							meta: {
								title: '重置支付密码'
							}
						}
					]
				}, {
					name: 'feedback', //我的 > 我的设置 > 意见反馈
					path: '/profile-setup-feedback',
					component: require('../page/profile/set/setup-feedback.vue'),
					meta: {
						title: '意见反馈'
					}
				}]
			},
			{
				name: 'cards', //我的 > 我的银行卡
				path: '/profile-cards',
				component: require('../page/profile/sub/cards.vue'),
				meta: {
					title: '我的银行卡'
				}
			},
			{
				name: 'add-card', //我的 > 我的银行卡 > 添加
				path: '/profile-cards-add',
				component: require('../page/profile/sub/cards-add.vue'),
				meta: {
					title: '绑定银行卡'
				}
			},
			{
				name: 'tickets', //我的 > 我的卡券
				path: '/profile-tickets',
				component: require('../page/profile/sub/tickets.vue'),
				meta: {
					title: '我的卡券'
				},
				children: [{
						name: 'debit', //我的 > 我的卡券 > 预付卡
						path: '/profile-tickets-debit',
						component: require('../page/profile/sub/tickets-debit.vue'),
						meta: {
							title: '预付卡'
						},
						children: [{
								name: 'debit-recharge', //我的 > 我的卡券 > 预付卡充值
								path: '/profile-tickets-debit-recharge',
								component: require('../page/profile/sub/tickets-debit-recharge.vue'),
								meta: {
									title: '预付卡充值'
								}
							},
							{
								name: 'debit-usernotice', //我的 > 我的卡券 > 预付卡充值 >使用须知
								path: '/profile-tickets-usernotice',
								component: require('../page/profile/sub/tickets-debit-usernotice.vue'),
								meta: {
									title: '使用须知'
								}
							}
						]
					},
					{
						name: 'electron', //我的 > 我的卡券 > 电子卷
						path: '/profile-tickets-electron',
						component: require('../page/profile/sub/tickets-electron.vue'),
						meta: {
							title: '电子卷'
						},
						children: [{
							name: 'electron-usernotice', //我的 > 我的卡券 > 电子券详情 >使用须知\门店地址
							path: '/profile-tickets-electron-usernotice',
							component: require('../page/profile/sub/tickets-electron-usernotice.vue'),
							meta: {
								title: '使用须知'
							}
						}]
					}
				]
			}
		]
	},
	{
		name: 'index', //首页
		path: '/',
		component: require('../page/index/index.vue'),
		meta: {
			title: '首页'
		}
	},
	{
		name: 'payment', //首页 > 付款
		path: '/payment',
		component: require('../page/index/sub/payment.vue'),
		meta: {
			title: '付款'
		}
	},
	{
		name: 'paydone', //首页 > 付款成功
		path: '/paydone',
		component: require('../page/index/sub2/paydone.vue'),
		meta: {
			title: '付款成功'
		}
	},
	{
		name: 'gathering', //首页 > 收款
		path: '/gathering',
		component: require('../page/index/sub/gathering.vue'),
		meta: {
			title: '收款'
		}
	},
	{
		name: 'TradingRecord', //首页 > 交易记录
		path: '/TradingRecord',
		component: require('../page/index/sub/TradingRecord.vue'),
		meta: {
			title: '交易记录'
		}
	},
	{
		name: 'tradInfo', //首页 > 交易详情
		path: '/tradInfo/:id',
		component: require('../page/index/sub2/tradInfo.vue'),
		meta: {
			title: '交易详情'
		}
	},
	{
		name: 'PrepaidCard', //首页 > 预付卡
		path: '/PrepaidCard',
		component: require('../page/index/sub/PrepaidCard.vue'),
		meta: {
			title: '预付卡'
		}
	},
	{
		name: 'ElectronicCard', //首页 > 电子券
		path: '/ElectronicCard',
		component: require('../page/index/sub/ElectronicCard.vue'),
		meta: {
			title: '电子券'
		}
	},
	{
		name: 'cardDetail', //首页 > 卡卷详情
		path: '/cardDetail/:id',
		component: require('../page/index/sub2/cardDetail.vue'),
		meta: {
			title: '卡卷详情'
		}
	},
	{
		name: 'consumption', //消费首页
		path: '/consumption/:type',
		component: require('../page/consumption/index.vue'),
		meta: {
			title: '消费首页'
		}
	},
	{
		name: 'search', //消费搜索
		path: '/search',
		component: require('../page/consumption/sub/search.vue'),
		meta: {
			title: '消费搜索'
		}
	},
	{
		name: 'consumptioninfo', //消费详情
		path: '/consumptioninfo/:id',
		component: require('../page/consumption/sub/info.vue'),
		meta: {
			title: '消费详情'
		}
	},
	{
		name: 'dzjlist', //电子券-更多
		path: '/dzjlist/:merchantid',
		component: require('../page/consumption/sub/dzj-list.vue'),
		meta: {
			title: '电子券'
		}
	},
	{
		name: 'dzjinfo', //电子券-详情
		path: '/dzjinfo/:id/:merchantid',
		component: require('../page/consumption/sub/dzj-info.vue'),
		meta: {
			title: '电子券-详情'
		}
	},
	{
		name: 'dzjorder', //电子券-支付订单页面
		path: '/dzjorder',
		component: require('../page/consumption/sub/order.vue'),
		meta: {
			title: '支付订单'
		}
	},
	{
		name: 'yfklist', //预付卡-更多
		path: '/yfklist/:merchantid',
		component: require('../page/consumption/sub/yfk-list.vue'),
		meta: {
			title: '预付卡'
		}
	},
	{
		name: 'yfkinfo', //预付卡-详情
		path: '/yfkinfo/:id/:merchantid',
		component: require('../page/consumption/sub/yfk-info.vue'),
		meta: {
			title: '预付卡-详情'
		}
	}
]