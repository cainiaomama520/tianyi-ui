<template>
	<div class="layOut page-scroll">
		<tool-bar></tool-bar>
		<div class="right-table">
			<el-breadcrumb separator="/" style="height:30px">
				<el-breadcrumb-item>
					<i class="el-icon-document"></i>
				</el-breadcrumb-item>
				<el-breadcrumb-item>人群详情</el-breadcrumb-item>
			</el-breadcrumb>
			<el-tabs v-model="activeName">
				<el-tab-pane label="概要信息" name="first">
					<el-card class="box-card">
						<div class="detail-item">
							<div class="item">
								<div class="title fl">人群ID</div>
								<div class="cont fl">{{detail.custom_audience_id}}</div>
							</div>
							<div class="item">
								<div class="title fl">来源</div>
								<div class="cont fl">{{advName}}({{advId}})</div>
							</div>
							<div class="item">
								<div class="title fl">上传人数</div>
								<div class="cont fl">{{detail.upload_num}}</div>
							</div>
							<div class="item">
								<div class="title fl">覆盖人数</div>
								<div class="cont fl">
									<p>{{detail.cover_num}}（全部）</p>
									<!-- <p>77055（今日头条）</p>
									<p>4540（西瓜视频）</p>
									<p>8391（火山小视频）</p>
									<p>893252（抖音短视频）</p> -->
								</div>
							</div>
							<div class="item">
								<div class="title fl">人群分组</div>
								<div class="cont fl">{{detail.tag}}</div>
							</div>
							<!-- <div class="item">
								<div class="title fl">一级分类</div>
								<div class="cont fl"></div>
							</div>
							<div class="item">
								<div class="title fl">二级分类</div>
								<div class="cont fl"></div>
							</div> -->
							<!-- <div class="item">
								<div class="title fl">创建时间</div>
								<div class="cont fl">{{detail.create_time}}</div>
							</div> -->
							<div class="item">
								<div class="title fl">当前状态</div>
								<div class="cont fl">{{detail.status}}</div>
							</div>
							<!-- <div class="item">
								<div class="title fl">运算详情</div>
								<div class="cont fl">
									<p>种子人群: service-上传-1</p>
									<p>扩展倍数: 179.99 扩展量: 1000000</p>
								</div>
							</div> -->
						</div>
					</el-card>
				</el-tab-pane>
				<!-- <el-tab-pane label="扩展信息" name="second"> -->
					<!-- <el-card class="box-card">
						<div class="detail-item detail-extend">
							<div class="item">
								<div class="title fl">扩展设备</div>
								<div class="cont fl">
									<ul>
										<li>不限</li>
										<li>IOS</li>
										<li>Android</li>
									</ul>
								</div>
							</div>
							<div class="item">
								<div class="title fl">扩展流量平台选择</div>
								<div class="cont fl">
									<ul>
										<li class="active">不限</li>
										<li>今日头条</li>
										<li>西瓜视频</li>
										<li>火山小视频</li>
										<li>抖音短视频</li>
									</ul>
									<p>已选择全部平台，可扩展上线为5000万人，将按照人群相似度最大值进行组合扩展</p>
								</div>
							</div>
							<div class="item">
								<div class="title fl">扩展数量</div>
								<div class="cont fl" style="width: 450px;">
									<el-slider
										v-model="detail.number"
										:show-input-controls="false"
										input-size="mini"
										disabled
										show-input
									></el-slider>
									<span style="position: absolute;left: 600px;top: 0px;">万人</span>
								</div>
							</div>
							<div class="item">
								<div class="title fl">扩展包中的种子人群</div>
								<div class="cont fl">
									<ul>
										<li>保留</li>
										<li>删除</li>
									</ul>
								</div>
							</div>
						</div>
					</el-card> -->
				<!-- </el-tab-pane> -->
			</el-tabs>
		</div>
	</div>
</template>
<script>
import {filterStatus} from '@/utils/common.js'
import { dmpDetail } from '@/api/admin.js'
export default {
	data: function () {
		return {
			activeName: 'first',
			detail: {},
			param: {
				adverId: this.$store.state.titlemess.advId,
				audienceId: this.$route.query.id
			},
			advName: this.$store.state.titlemess.advName,
		advId:this.$store.state.titlemess.advId,
		}
	},
	components: {
		toolBar: resolve => require(["../toolCase/templete/toolBar.vue"], resolve),		
	},
	mounted () {
		this.getDetail()
		// console.log(fu.formatDate,fu.formatDate.format)
	},
	methods: {
		getDetail () {
			dmpDetail(this.param).then(res => {
				this.detail=res.data;
				this.detail.status=filterStatus(res.data.status)
				this.detail.create_time=this.timeFormat(res.data.create_time)
			})
		},
		timeFormat(timestamp){
		//timestamp是整数，否则要parseInt转换,不会出现少个0的情况
			var time = new Date(timestamp*1000);
			var year = time.getFullYear();
			var month = time.getMonth()+1;
			var date = time.getDate();
			var hours = time.getHours();
			var minutes = time.getMinutes();
			var seconds = time.getSeconds();
			return year+'-'+this.add0(month)+'-'+this.add0(date)+' '+this.add0(hours)+':'+this.add0(minutes)+':'+this.add0(seconds);
		},
		add0(m){return m<10?'0'+m:m }
	}
}
</script>
<style>
.detail-item {
	font-size: 12px;
}
.detail-item .item {
	overflow: hidden;
	line-height: 40px;
	position: relative;
}
.detail-item span {
	float: left;
	display: block;
}
.detail-item .title {
	display: block;
	width: 100px;
	text-align: right;
}
.detail-item .cont {
	margin-left: 20px;
	color: #999;
}
.detail-extend {
	min-height: 600px;
}
.detail-extend ul li {
	min-width: 79px;
	padding: 0 10px;
	height: 28px;
	background: #fff;
	border: 1px solid #eaeaea;
	margin-left: -1px;
	font-size: 12px;
	color: #444;
	text-align: center;
	line-height: 28px;
	position: relative;
	cursor: pointer;
	z-index: 1;
	float: left;
}
.detail-extend ul li.active {
	z-index: 2;
	background: #f4f7ff;
	border: 1px solid #598fe6;
	color: #598fe6;
}
.detail-extend .title {
	width: 120px;
}
</style>


