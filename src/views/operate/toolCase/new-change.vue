<template>
	<div class="change-box">
		<div class="entry-box">
			<p class="entry-htitle">选择您希望的转化跟踪方式</p>
			<el-row :gutter="20">
				<el-col :span="12">
					<div class="entry-group">
						<img class="img_size" src="/static/images/img1.svg">
						<div class="entry-title">落地页</div>
						<span class="entry-desc">通过向您的网站添加代码，跟踪购买、表单提交或其他操作。</span>
						<div class="entry-oper">
							<p class="success-btn entry-btn" @click="creatChange('落地页API','AD_CONVERT_SOURCE_TYPE_H5_API')">落地页API</p>
						</div>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="entry-group">
						<img class="img_size" src="/static/images/img2.svg" style="margin-bottom:7px;">
						<div class="entry-title">应用下载API</div>
						<span class="entry-desc">通过API回传收集应用的转化数据，优化应用广告转化率。</span>
						<div class="entry-oper">
							<p class="success-btn entry-btn" @click="creatChange('应用下载API','AD_CONVERT_SOURCE_TYPE_APP_DOWNLOAD')">应用下载API</p>
						</div>
					</div>
				</el-col>
				<!-- <el-col :span="8">
					<div class="entry-group">
						<img class="img_size" src="/static/images/img2.svg">
						<div class="entry-title">应用下载SDK</div>
						<span class="entry-desc">通过嵌入SDK收集应用的转化数据，支持应用内事件优化。</span>
						<div class="entry-oper">
							<p class="success-btn entry-btn" >应用下载SDK</p>
						</div>
					</div>
				</el-col>-->
			</el-row>
		</div>
	</div>
</template>
<script>
export default {
	data () {
		return {

		}
	},
	components: {
		toolBar: resolve => require(["../toolCase/templete/toolBar.vue"], resolve),
	},
	methods: {
		creatChange (val,type) {
			this.$router.push({ path: '/operate/toolCase/creat-change', query: { name: val,type:type } })
		}
	}
}
</script>

<style>
.change-box {
	margin-left: 212px;
	padding: 75px 40px;
}
.change-box .entry-htitle {
	padding-bottom: 14px;
	padding-left: 16px;
	text-align: center;
	font-size: 16px;
}
.entry-box {
	width: 660px;
	margin: 130px auto 0;
}
.entry-group {
	padding-top: 26px;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	padding-right: 11px;
	padding-left: 11px;
	padding-bottom: 15px;
	border: solid 1px #e8e8e8;
	border-radius: 5px;
	width: 285px;
	max-width: 285px;
}
.entry-list-part .myimg {
	padding-bottom: 7px;
}
.entry-group .entry-title {
	text-align: center;
	margin: 0 auto;
	padding: 27px 0 15px;
	font-weight: 700;
	font-size: 18px;
	width: 250px;
}
.entry-oper {
	margin-top: 10px;
	padding-bottom: 20px;
}
.success-btn {
	text-decoration: none;
	display: block;
	width: 100%;
	height: 35px;
	line-height: 33px;
	text-align: center;
	color: #fff;
	background: #48cb95;
	border-radius: 5px;
	cursor: pointer;
	border: 1px solid transparent;
}
</style>

