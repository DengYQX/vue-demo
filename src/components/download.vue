<template>
	<div class="download clearfix">
		<div class="down-info fl">
			<div class="img fl"></div>
			<div class="info fl">
				<p>卡盟平台
					<br>普惠金融，精彩生活</p>
				</div>
			</div>
			<div class="down-btn fr"
			@click="downLoad()">
			点击下载
		</div>
	</div>
</template>

<script>
 //获取地址栏地址   
 var accessUrl = window.location.href;    
 //获取标题
 var docTitle = document.title;
 export default {
 	data() {
 		return {
 			
 		}
 	}, mounted() {
 		var vm = this;

 	}, methods: {
 		downLoad() {
 			var vm =this;
 			if (vm.browser()) {
 				vm.iosFn();
 			}else{
 				vm.androidFn();
 			}
 		},
 		browser: function(){
 			var userAgentInfo = navigator.userAgent;
 			var Agents = new Array("iPhone","iPad", "iPod");
 			var flag = false;
 			for (var v = 0; v < Agents.length; v++) {
 				if (userAgentInfo.indexOf(Agents[v]) > 0) {
 					flag = true;
 					break;
 				}
 			}
 			return flag;
 		},
 		androidFn: function() {
 			window.location.href = "myapp://tronker.com/openwith?h5AccessUrl="+accessUrl+"&title="+docTitle;
 			window.setTimeout(function(){
 				window.location.href = "https://www.tronker.com/work/tronker/qrcode.html?form=tronker"; /***下载app的地址***/
 			},2000);
 		},
 		iosFn: function() {
 			window.location.href = "iOSTronkerApp://?h5AccessUrl="+accessUrl+"&title="+docTitle;
 			window.setTimeout(function(){
 				window.location.href = "https://www.tronker.com/work/tronker/qrcode.html?form=tronker"; /***下载app的地址***/
 			},2000)
 		}
 	}
 }
</script>
