<style>
@import '../../assets/css/view/index.css';
.f-bg {
	background: #fff;
}

.slide {
	background-color: #000;
	color: #fff;
}
</style>
<template>
	<section class="page f-bg clearfix">
		<div class="page-swip"
		     style="height: 12.7rem;text-align: center;">
			<mt-swipe :auto="4500">
				<mt-swipe-item class="slide"
				               v-for="d in homeimgelist">
					<a :href="d.href">
						<img :src="bannerPath+d.imagename"
						     width="100%" />
					</a>
				</mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="menu-list clearfix">
			<ul>
				<li>
					<div class="menu-info"
					     @click="scanQRCode()">
						<div class="menu-icon"></div>
						<p>扫一扫</p>
					</div>
				</li>
				<li>
					<router-link to="/gathering">
						<div class="menu-info">
							<div class="menu-icon"></div>
							<p>收款</p>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/TradingRecord">
						<div class="menu-info">
							<div class="menu-icon"></div>
							<p>交易记录</p>
						</div>
					</router-link>
				</li>
				<li>
					<router-link :to="{name:'consumption',params:{type:1}}">
						<div class="menu-info">
							<div class="menu-icon"></div>
							<p>预付卡</p>
						</div>
					</router-link>
				</li>
				<li>
					<router-link :to="{name:'consumption',params:{type:2}}">
						<div class="menu-info">
							<div class="menu-icon"></div>
							<p>电子券</p>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/CardVolume">
						<div class="menu-info">
							<div class="menu-icon"></div>
							<p>卡券</p>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="hot-shop">
			<p>热门商户<i></i></p>
			<div class="product-list clearfix">
				<ul>
					<li v-for="d in homehotmerchant">
						<router-link :to="{name:'consumptioninfo',params:{id:d.merchantid}}">
							<img :src="merchPath+d.imagename"
							     width="100%" />
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<!--点击下载-->
		<download></download>
		<!--end-->
		<!--底部导航-->
		<foot :active="1"></foot>
		<!--end-->
	</section>
</template>
<script>
// import WechatJSSDK from 'wechat-jssdk/lib/client';
import download from '../../components/download.vue';
import footer from '../../components/footer.vue';
var wechatObj;
export default {
	data() {
		return {
			homeimgelist: {},
			homehotmerchant: {},
			formData: {
				GID: ''
			},
			merchPath: config.merchPath,//商户图片前缀
			bannerPath: config.bannerPath,//网站广告图前缀
			wxconfig: {
				debug: true, //开启 debug 模式
				appId: '',
				timestamp: '',
				nonceStr: '',
				signature: '',
				jsApiList: [
					'scanQRCode',
					'getLocation'
				],
				location: ''
			}
		}
	},
	mounted() {
		var vm = this;
		var code = _com.getQueryString('code') || '';
		if (code) _com.setCookie('code', code);
		console.log(code);
		if (code === '') {
			// vm.getAuthUrl();
		}
		vm.setWxConfig();
		vm.getLocation();
		vm.gethomeimagelist();
		vm.gethotmerchant();
	},
	methods: {
		setWxConfig() {
			var vm = this;
			var weixin = {
				GID: usages.api.weixin.getJsSign,
				rand: Math.random(),
				url: window.location.href.split('#')[0]
			};
			vm.$http.post(usages.domain, weixin).then((res) => {
				var data = res.body.result;
				console.log(res);
				if (data && data.appid) {
					// _com.setSession('wxconfig', JSON.stringify(data));
					vm.wxconfig.appId = data.appid;
					vm.wxconfig.timestamp = parseInt(data.timestamp);
					vm.wxconfig.nonceStr = data.nonceStr;
					vm.wxconfig.signature = data.signature;
					window.wx.ready((res) => {
						vm.getLocation();
					});
				}
			});
		},
		getAuthUrl() { //获取微信认证
			var vm = this;
			var weixin = {
				GID: usages.api.weixin.getAuthUrl,
				rand: Math.random(),
				redirect_uri: 'http://hf.tunnel.qydev.com/hf-km_web/main.jsp'
			}

			vm.$http.post(usages.domain, weixin).then((res) => {
				window.location.href = res.body.result.url;
			});
		},
		getLocation() {
			var vm = this;
			window.wx.getLocation({
				success: function (res) {
					alert(JSON.stringify(res));

					alert("获取地理位置成功！");
				},
				cancel: function (res) {
					alert('用户拒绝授权获取地理位置');
				}
			});
		},
		getAddress(point) {
			var map = new BMap.Map("allmap");
			var point = new BMap.Point(116.331398, 39.897445);
			var gc = new BMap.Geocoder();
			gc.getLocation(point, function (rs) {
				var addComp = rs.addressComponents;
				// alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
				console.log(addComp.city);
			});
		},
		scanQRCode() {
			var vm = this;
			window.wx.ready((res) => {
				window.wx.scanQRCode({
					needResult: 1,
					desc: 'scanQRCode desc',
					success: function (res) {
						alert(JSON.stringify(res));
					}
				});
			});
		},

		gethomeimagelist() { //获取首页广告图
			var vm = this;
			vm.formData.GID = usages.api.index.homepageimage;
			vm.formData.rand=Math.random();
			vm.$http.post(usages.domain, vm.formData).then(function (res) {

				console.log(res.body);
				var dataList = res.body;
				if (dataList.issuccess) {
					this.homeimgelist = dataList.result.imagelist; //.forEach(a=>a.imagename='url('+a.imagename+')');
				} else {
					vm.errMsg(dataList.rtnmessage);
				}
			});
		},
		gethotmerchant() { //获取热门商户

			var vm = this;
			vm.formData.GID = usages.api.index.homehotmerchant;
			vm.formData.rand=Math.random();
			vm.$http.post(usages.domain, vm.formData).then(function (res) {
				console.log(res.body);
				var dataList = res.body;
				if (dataList.issuccess) {
					this.homehotmerchant = dataList.result.hotmerchantlist;
				} else {
					vm.errMsg(dataList.rtnmessage);
				}
			});
		},
		errMsg(msg) {
			MintUI.MessageBox('', msg);
		}
	},
	components: {
		download: download,
		foot: footer
	}
}
</script>