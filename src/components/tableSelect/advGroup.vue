<template>
	<div class="table-filter">
		<el-form ref="form" :model="form" label-width="80px">
			<el-row :gutter="10">
				<el-col :span="5">
					<el-form-item label="投放目的">
						<el-select v-model="form.landingType" placeholder="请选择" size="small" @change="changePopurse">
							<el-option
							v-for="item in purposeArray"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="5">
					<el-form-item label="状态">
						<el-select v-model="form.status" placeholder="请选择" size="small" @change="changeStatus">
							<el-option
							v-for="item in statusArray"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="5" v-if="type=='creat'">
					<el-form-item label="样式">
						<el-select v-model="form.format" placeholder="请选择" size="small" @change="changeFormat">
							<el-option
							v-for="item in formatArray"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="5">
					<el-input :placeholder="placeholder" v-model="form.idOrName"  size="small" style="margin-top:4px">
						<el-button slot="append" icon="el-icon-search" @click="searchName"></el-button>
					</el-input>
				</el-col>
				<el-col :span="type=='creat'?4:9">
				<el-button type="primary"  style="padding: 7px 10px 6px;margin-top:5px" class="fr" @click="clearAll">清除所有筛选</el-button>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>
<script>
export default {
	data(){
		return{
			form:{
				landingType:null,
				status:null,
				idOrName:'',
				format:null
			},
			purposeArray:[
				{label:'不限',value:null},
				{label:'APP应用',value:'APP'},
				{label:'落地页',value:'LINK'}
			],
			statusArray:[
				{label:'不限',value:null},
				{label:'启用',value:'CAMPAIGN_STATUS_ENABLE'},
				{label:'暂停',value:'CAMPAIGN_STATUS_DISABLE'},
				// {label:'删除',value:'CAMPAIGN_STATUS_DELETE'},
				// {label:'不限(包含已删除)',value:'CAMPAIGN_STATUS_ALL'}
			],
			planStatusArray:[
				{label:'不限',value:null},
				{label:'投放中',value:'AD_STATUS_DELIVERY_OK'},
				{label:'部分投放中',value:'AD_STATUS_SOME_DELIVERY_OK'},
				{label:'计划新建',value:'AD_STATUS_CREATE'},
				{label:'审核不通过',value:'AD_STATUS_AUDIT_DENY'},
				{label:'新建审核中',value:'AD_STATUS_AUDIT'},
				{label:'修改审核中',value:'AD_STATUS_REAUDIT'},
				{label:'已暂停',value:'AD_STATUS_DISABLE'},
				{label:'已被广告组暂停',value:'AD_STATUS_CAMPAIGN_DISABLE'},
				{label:'未达到投放时间',value:'AD_STATUS_NOT_START'},
				{label:'广告计划超出预算',value:'AD_STATUS_BUDGET_EXCEED'},
				{label:'广告组超出预算',value:'AD_STATUS_CAMPAIGN_EXCEED'},
				{label:'账户余额不足',value:'AD_STATUS_BALANCE_EXCEED'},
				{label:'不在投放时段',value:'AD_STATUS_NO_SCHEDULE'},
				{label:'已完成',value:'AD_STATUS_DONE'},
				// {label:'已删除',value:'AD_STATUS_DELETE'},
				// {label:'不限(包含已删除)',value:'AD_STATUS_ALL'}
			],
			creatStatusArray:[
				{label:'不限',value:''},
				{label:'投放中',value:'CREATIVE_STATUS_DELIVERY_OK'},
				{label:'审核不通过',value:'CREATIVE_STATUS_AUDIT_DENY'},
				{label:'新建审核中',value:'CREATIVE_STATUS_AUDIT'},
				{label:'修改审核中',value:'CREATIVE_STATUS_REAUDIT'},
				{label:'已暂停',value:'CREATIVE_STATUS_DISABLE'},
				{label:'已被广告组暂停',value:'CREATIVE_STATUS_CAMPAIGN_DISABLE'},
				{label:'未达到投放时间',value:'CREATIVE_STATUS_NOT_START'},
				// {label:'广告计划超出预算',value:'AD_STATUS_BUDGET_EXCEED'},
				{label:'广告组超出预算',value:'CREATIVE_STATUS_CAMPAIGN_EXCEED'},
				{label:'账户余额不足',value:'CREATIVE_STATUS_BALANCE_EXCEED'},
				{label:'不在投放时段',value:'CREATIVE_STATUS_NO_SCHEDULE'},
				{label:'已完成',value:'CREATIVE_STATUS_DONE'},
				// {label:'已删除',value:'CREATIVE_STATUS_DELETE'},
				// {label:'不限(包含已删除)',value:'CREATIVE_STATUS_ALL'}
			],
			planPlaceholder:'请输入ID或关键词',
			placeholder:'请输入广告组ID或关键词',
			creatPlaceholder:'请输入创意ID',
			formatArray:[
				{value:null,label:'不限'},
				{value:'CREATIVE_IMAGE_MODE_SMALL',label:'小图'},
				{value:'CREATIVE_IMAGE_MODE_LARGE',label:'大图'},
				{value:'CREATIVE_IMAGE_MODE_GROUP',label:'组图'},
				{value:'CREATIVE_IMAGE_MODE_VIDEO',label:'横版视频'},
				{value:'CREATIVE_IMAGE_MODE_VIDEO_VERTICAL',label:'竖版视频'},
				{value:'CREATIVE_IMAGE_MODE_LARGE_VERTICAL',label:'大图竖图'}
			]
		}
	},
	props:['type'],
	mounted(){
		if(this.type=='plan'){
			this.placeholder=this.planPlaceholder;
			this.statusArray=this.planStatusArray
		}else if(this.type=='creat'){
			this.placeholder=this.creatPlaceholder;
			this.statusArray=this.creatStatusArray;
		}
	},
	methods:{
		changePopurse(val){
			this.$emit('changePopurse',val)
		},
		changeStatus(val){
			console.log(val)
			this.$emit('changeStatus',val)
		},
		searchName(){
			this.$emit('searchName',this.form.idOrName)
		},
		changeFormat(){
			this.$emit('changeFormat',this.form.format)
		},
		clearAll(){
			Object.assign(this.$data,this.$options.data())
			this.$emit('clearAll','')
		}
	}
	
}
</script>

