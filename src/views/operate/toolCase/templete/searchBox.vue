<template>
	<div class="brick-filter-container">
		<el-form ref="searchForm" :model="searchForm" class="tool-box" label-width="120px">
			<el-row :gutter="10">
				<el-col :span="8">
					<el-form-item label="人群ID/名称">
						<el-input v-model="searchForm.idOrName" size="medium" placeholder="输入名称或人群ID"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="人群分组">
						<el-select v-model="tag" multiple  placeholder="不限" size="medium">
							<el-option :label="item" :value="item" v-for="(item,index) in personList" :key="index"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="类别">
						<el-select v-model="source" multiple placeholder="不限" size="medium">
							<el-option :label="item.label" :value="item.value" v-for="item in sources" :key="item.value"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="状态">
						<el-cascader :options="types" v-model="status" size="medium"></el-cascader>
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="创建时间">
						<el-date-picker
							size="medium"
							v-model="time"
							type="daterange"
							clearable
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							style="width: 212px;"
							value-format="yyyy-MM-dd"
						></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="覆盖数量">
						<el-select v-model="searchForm.coverNumType" placeholder="不限" size="medium">
							<el-option label="10万-100万" value="1"></el-option>
							<el-option label="100万-500万" value="2"></el-option>
							<el-option label="500万以上" value="3"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div class="brick-filter-container-right">
			<p>
				<el-button type="primary" style="width:100px;padding: 10px;" @click="search">查询</el-button>
			</p>
			<el-button type="text" style="width:100px" @click="clearForm">清空全部</el-button>
		</div>
	</div>
</template>
<script>
import {getPerGroup} from '@/api/admin.js'
export default {
	data: function () {
		return {
			value: '',
			types: [{
				value: '1',
				label: '可用',
				children: [{
					value: '-1',
					label: '全部'
				},
				{
					value: '2',
					label: '已生效'
				},
				{
					value: '14',
					label: '推送中'
				},
				{
					value: '10',
					label: '推送完成'
				}
				]
			},
			{
				value: '2',
				label: '不可用',
				children: [{
					value: '-2',
					label: '全部'
				},
				{
					value: '13',
					label: '等待计算'
				},
				{
					value: '8',
					label: '计算中'
				},
				{
					value: '9',
					label: '计算失败'
				}
				]
			}],
			sources:[
				{value:'CUSTOM_AUDIENCE_TYPE_UPLOAD',label:'上传'},
				{value:'CUSTOM_AUDIENCE_TYPE_EXTEND',label:'扩展'}, 
				{value:'CUSTOM_AUDIENCE_TYPE_OPERATE',label: '运算'}, 
				{value:'CUSTOM_AUDIENCE_TYPE_RULE',label: '规则'}, 
				// {value:'CUSTOM_AUDIENCE_TYPE_DATA_SOURCE',label:'文件数据源上传'}, 
				// {value:'CUSTOM_AUDIENCE_TYPE_THIRD_PARTY',label:'第三方数据规则'}, 
				// {value:'CUSTOM_AUDIENCE_TYPE_BRAND',label:'品牌DMP规则包'} ,
				// {value:'CUSTOM_AUDIENCE_TYPE_FRIEND',label:'好友扩展'}, 
				// {value:'CUSTOM_AUDIENCE_TYPE_THEME',label:'运营主题'} ,
				// {value:'CUSTOM_AUDIENCE_TYPE_FINANCE',label:'金融数据'}, 
				// {value:'CUSTOM_AUDIENCE_TYPE_PACK_RULE',label:'pack_rule运算'}, 
				// {value:'CUSTOM_AUDIENCE_TYPE_ONE_KEY',label:'一键拓展'},
				// {value:'CUSTOM_AUDIENCE_TYPE_DOU_PLUS',label:'抖+粉丝合并包'} 
			],
			source:[],
			searchForm: {
				advertiser_id:this.$store.state.titlemess.advId,
			},
			time: [],
			tag:[],
			status:[]
		}
	},
	props:['personList',"advertiser_id"],
	mounted(){
		
	},
	methods:{
		clearForm(){
			this.source=[],
			this.searchForm= {
				advertiser_id:this.$store.state.titlemess.advId,
			},
			this.time= [],
			this.tag=[],
			this.status=[]
		},
		search(){
			if(this.time){
				this.searchForm.startDate=this.time[0];
				this.searchForm.endDate=this.time[1];
			}
			if(this.tag){
				this.searchForm.tag=JSON.parse(JSON.stringify(this.tag)).join(",")
			}
			if(this.status){
				this.searchForm.status=this.status[1]
			}
			if(this.source){
				this.searchForm.source=JSON.parse(JSON.stringify(this.source)).join(",")
			}
			console.log('this.searchForm',this.searchForm)
			this.$emit('search',this.searchForm)
		}
	}
}
</script>

<style>
.brick-filter-container {
	padding: 20px 0 16px;
	position: relative;
	display: flex;
	border-bottom: 1px solid #eaeaea;
	margin-bottom: 40px;
	max-height: 106px;
	overflow: hidden;
}
.brick-filter-container .tool-box {
	box-sizing: border-box;
	width: 1024px;
	padding-right: 20px;
	overflow: hidden;
}
.brick-filter-container .brick-filter-container-right {
	flex: 1;
	border-left: 1px solid #eaeaea;
	line-height: 32px;
	box-sizing: border-box;
	padding-left: 32px;
}
.brick-filter-container .el-range-editor--medium .el-range-input{
	font-size: 13px
}
.brick-filter-container .el-input__inner{
border-radius: 1px
}
.brick-filter-container .el-select__tags{
	flex-wrap: nowrap;
	overflow: hidden;
}
</style>
