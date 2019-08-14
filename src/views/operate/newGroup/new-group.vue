<template>
	<div class="layOut layout-body">
		<left-bar></left-bar>
		<div class="ad-con-right">
			<div class="moduler detail-campaign-panel">
				<el-tabs v-model="activeName">
					<el-tab-pane label="创建新广告组" name="first">
						<p style="font-size: 22px;margin:20px 0;color: #333;">Hi, 请选择推广目的</p>
						<div class="campaign-create-list ad-d-flex ad-d-flex-start">
							<div v-for="(item,index) in cards" :key="index">
								<div
									class="campaign-card ad-d-flex ad-d-flex-column"
									:class="active==index?'active':''"
									v-if="active==index && campaingId"
								>
									<div :class="active==index?'campaign-card-active':''"></div>
									<div class="campaign-card-img">
										<img :src="item.img">
									</div>
									<div class="campaign-card-title">{{item.name}}</div>
									<div class="campaign-card-tip">{{item.des}}</div>
								</div>
								<div
									class="campaign-card ad-d-flex ad-d-flex-column"
									@click="selectTab(item,index)"
									:class="active==index?'active':''"
									v-else-if="!campaingId"
								>
									<div :class="active==index?'campaign-card-active':''"></div>
									<div class="campaign-card-img">
										<img :src="item.img">
									</div>
									<div class="campaign-card-title">{{item.name}}</div>
									<div class="campaign-card-tip">{{item.des}}</div>
								</div>
							</div>
						</div>
						<div class="campaign-create-form moduler" v-show="form.landing_type">
							<el-form ref="form" :model="form" label-width="100" :rules="rules">
								<div class="row-item">
									<div class="required-item" style="top: 15px;left: 102px;"></div>
									<v-radio-group label="广告组预算" v-model="form.budget_mode" attr="budgetMode">
										<template slot="label">
											<div class="hint-item" style="margin-left:20px;position:absolute;top:5px;left:-100px;">
												<el-popover
													placement="top-start"
													width="380"
													trigger="hover"
													content="广告组的推广预算是您预期的该广告组一天可消耗的最高预算，当该广告组日消耗达到您所设置的预算后，将暂停广告投放，并停止收费，系统后台会提示预算不足，广告组的日预算最低1000元。"
												>
													<i class="el-icon-question" slot="reference"></i>
												</el-popover>
											</div>
										</template>
									</v-radio-group>
								</div>

								<div class="row-item" v-show="form.budget_mode=='BUDGET_MODE_DAY'">
									<div class="hint-item"></div>
									<div class="label-item label-size-middle">
										<div class="text-item">日预算</div>
										<div class="required-item" style="top:12px"></div>
									</div>
									<div class="input-item">
										<el-form-item prop="budget" :rules="form.budget_mode=='BUDGET_MODE_DAY'?rules.budget:[]">
											<el-input v-model.number="form.budget" size="medium" >
												<template slot="append">元</template>
											</el-input>
										</el-form-item>
									</div>
								</div>

								<div class="row-item">
									<div class="hint-item"></div>
									<div class="label-item label-size-middle">
										<div class="text-item">广告组名称</div>
										<div class="required-item" style="top:12px"></div>
									</div>
									<div class="input-item">
										<el-form-item prop="campaign_name">
											<el-input v-model="form.campaign_name" size="medium"></el-input>
										</el-form-item>
									</div>
								</div>
							</el-form>
						</div>
						<div class="save-campaign-panel">
							<div class="ad-d-flex ad-d-flex-between">
								<div class="save-campaign-action">
									<el-button type="primary" size="medium" @click="next('form')">{{campaingId?'保存并关闭':'下一步'}}</el-button>
								</div>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="选择已有广告组" name="second">
						<div class="campaign-have">
							<el-input placeholder="请输入广告组id或名称" v-model="selectForm.idOrName" class="input-with-select">
								<el-button slot="append" icon="el-icon-search" @click="getGroup(1)"></el-button>
							</el-input>
							<div class="campaign-have-list">
								<ul>
									<li v-for="item in groupList.content" :key="item.id" @click="toplan(item)">
										{{item.name}}
										<span class="landing-type">{{item.landing_type=='LINK'?'落地页':'APP'}}</span>
									</li>
								</ul>
							</div>
							<el-pagination
								class="fr"
								@current-change="changePage"
								background
								layout="prev, pager, next"
								:total="groupList.totalElements"
							></el-pagination>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>
<script>
import { creatGroup, selectHasGroup, campaignRead, updateGroup } from '@/api/admin.js'
import { setTimeout } from 'timers';
export default {
	data: function () {
		var checknumber = (rule, value, callback) => {
			console.log(value)
			// debugger
			if (!value) {
				return callback(new Error('请输入日预算'));
			}
			var reg = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/ 
			if (!reg.test(value)) {
				return callback(new Error('数据格式不正确'));
			} else {
				if (value < 1000) {
					return callback(new Error('您的预算设置，不能低于1000元'));
				} else if (value > 9999999.99) {
					return callback(new Error('您的预算设置，不能高于9999999.99元'));
				} else {
					callback(); 
				}
			}
		}
		return {
			activeName: 'first',
			form: {
				advertiser_id: this.$store.state.titlemess.advId,
				campaign_name: '',
				budget_mode: 'BUDGET_MODE_INFINITE',
				budget:null
			},
			active: 2,
			cards: [
				{
					img: '/static/images/campaign-external.svg',
					name: '落地页',
					des: '提升落地页的展示、点击、转化'
				},
				{
					img: '/static/images/campaign-app.svg',
					name: 'App应用',
					des: '提升APP应用的下载、安装、激活'
				}
			],
			rules: {
				campaign_name: [
					{ required: true, message: '请输入广告组名称', trigger: 'blur' },
					{ max: 100, message: '长度在应少于100字符', trigger: 'blur' }
				],
				budget: [
					{ validator: checknumber, trigger: 'blur' }
				]
			},
			groupList: {},
			selectForm: {
				page: 1,
				size: 10
			},
			campaingId: this.$route.query.campaingId
		}
	},
	components: {
		leftBar: resolve => require(["@/components/leftBar.vue"], resolve),
	},
	mounted () {
		this.getGroup();
		if (this.campaingId) {
			this.getDetail()
		} 

	},
	methods: {
		getDetail () {
			campaignRead({ adverid: this.form.advertiser_id, campaingId: this.campaingId }).then(res => {
				let data = res.data;
				this.form.budget_mode = data.budget_mode;
				this.form.landing_type = data.landing_type;
				this.form.campaign_name = data.name;
				this.form.budget = data.budget;
				if (data.landing_type == "APP") {
					this.active = 1;
				} else {
					this.active = 0;
				}
			})
		},
		selectTab (item, index) {
			let time = new Date();
			let month = this.filterDate(time.getMonth() + 1)
			let day = this.filterDate(time.getDate())
			this.active = index;
			if (index == 0) {
				this.form.landing_type = "LINK"
			} else {
				this.form.landing_type = "APP"
			}
			this.form.campaign_name = item.name + '_' + month + '_' + day + '_' + this.filterDate(time.getHours()) + ':' + this.filterDate(time.getMinutes())
		},
		filterDate (time) {
			if (time < 10) {
				return '0' + time
			} else {
				return time
			}
		},
		getGroup (page) {
			if (page) {
				this.selectForm.page = 1
			}
			this.selectForm.advertiser_id = this.form.advertiser_id
			selectHasGroup(this.selectForm).then(res => {
				this.groupList = res.data
			})
		},
		next (formName) {
			// 新建广告组
			if (!this.form.landing_type) {
				this.$message.warning('请选择广告目的');
				return false
			}
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.campaingId) {
						this.form.campaign_id = this.campaingId;
						updateGroup(this.form).then(res => {
							if (res.code == 0) {
								this.$message({
									message: '修改成功，3秒后关闭',
									type: 'success'
								});
								setTimeout(() => {
									window.close();
								}, 3000)
							}
						})
					} else {
						creatGroup(this.form).then(res => {
							if (res.code == 0) {
								this.$message({
									message: '新建成功',
									type: 'success'
								});
								this.$router.push({ path: '/operate/newPlan/new-plan', query: {campaign_name:res.data.name,id:res.data.id,landing_type:res.data.landing_type} })
							}
						})
					}
				} else {
					return false;
				}
			});
		},
		changePage (val) {
			// 点击分页
			this.selectForm.page = val
			this.getGroup()
		},
		toplan (item) {
			this.$router.push({ path: '/operate/newPlan/new-plan', query: {campaign_name:item.name,id:item.id,landing_type:item.landing_type} })
		}
	}
}
</script>
<style>
.campaign-create-form .el-form-item__label {
	width: 118px;
	padding-right: 22px;
}
.campaign-create-form .el-form-item__content {
	float: left;
}
.campaign-create-form .hint-item {
	left: -133px !important;
}
</style>



