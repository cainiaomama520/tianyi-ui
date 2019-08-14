<template>
	<div class="creat-box">
		<p class="title">{{name}}</p>
		<el-form ref="form" :model="form" label-width="120px" class="form hidden" :rules="rules">
			<el-form-item label="转化名称" prop="name">
				<el-input v-model="form.name" :disabled="disabled" maxlength=25></el-input>
			</el-form-item>
			<div v-if="form.convert_source_type=='AD_CONVERT_SOURCE_TYPE_APP_DOWNLOAD'">
				
				<!-- <el-form-item label="应用类型">
					<el-select v-model="form.app_type" :disabled="disabled">
						<el-option label="Android" value="APP_ANDROID"></el-option>
						<el-option label="IOS" value="APP_IOS"></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item label="下载链接" prop="download_url"  :rules="form.convert_source_type=='AD_CONVERT_SOURCE_TYPE_APP_DOWNLOAD'?rules.download_url:[]">
					<span class="error-zi">*</span>
					<el-input
						v-model="form.download_url"
						placeholder="https://"
						@blur="Package"
						:disabled="disabled"
					></el-input>
				</el-form-item>
				<el-form-item label="应用包名称">
					<el-input
						v-model="form.package_name"
						placeholder="请输入包名"
						:disabled="disabled"
						style="margin-right:30px;width:500px"
					></el-input>
					<span style="color: #48cb95;">{{app_name}}</span>
				</el-form-item>
				<el-form-item label="转化目标">
					<el-select v-model="form.convert_type" placeholder="请选择转化目标" :disabled="disabled">
						<el-option label="激活" value="AD_CONVERT_TYPE_ACTIVE"></el-option>
						<el-option label="激活且注册" value="AD_CONVERT_TYPE_ACTIVE_REGISTER"></el-option>
						<el-option label="激活且付费" value="AD_CONVERT_TYPE_PAY"></el-option>
					</el-select>
				</el-form-item>
			</div>
			<div v-else>
				<el-form-item label="下载链接" prop="external_url" :rules="form.convert_source_type!='AD_CONVERT_SOURCE_TYPE_APP_DOWNLOAD'?rules.external_url:[]">
					<span class="error-zi">*</span>
					<el-input
						v-model="form.external_url"
						placeholder="https://"
						:disabled="disabled"
						maxlength="99999"
					></el-input>
				</el-form-item>
				<el-form-item label="转化目标">
					<el-select v-model="form.convert_type" placeholder="请选择转化目标" :disabled="disabled">
						<el-option label="有效获客" value="AD_CONVERT_TYPE_CUSTOMER_EFFECTIVE"></el-option>
					</el-select>
				</el-form-item>
			</div>
			<el-form-item label="转化方案">
				<el-input v-model="form.case" disabled></el-input>
			</el-form-item>

			<el-form-item
				label="监测地址"
				prop="action_track_url"
			>
			<span class="error-zi">*</span>
				<el-input v-model="form.action_track_url" maxlength="99999" :disabled="disabled" placeholder="请输入监测地址"></el-input>
			</el-form-item>
			<div v-if="form.convert_source_type=='AD_CONVERT_SOURCE_TYPE_APP_DOWNLOAD'&&convertId">
				<el-form-item label="激活回传地址">
					<el-input
						v-model="form.convert_activate_callback_url"
						:disabled="disabled"
						placeholder="请输入激活回传地址"
					></el-input>
				</el-form-item>
				<el-form-item label="加密密钥">
					<el-input v-model="form.convert_secret_key" placeholder="请输入加密密钥" :disabled="disabled"></el-input>
				</el-form-item>
			</div>
			<div v-else-if="form.convert_source_type!='AD_CONVERT_SOURCE_TYPE_APP_DOWNLOAD'">
				
				<el-form-item label="回传地址" v-if="convertId">
					<el-input v-model="form.convert_track_params" placeholder="请输入回传地址" :disabled="disabled"></el-input>
				</el-form-item>
			</div>
			<el-form-item size="large" v-if="!convertId">
				<el-button type="primary" @click="onSubmit('form')">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
import { creatConvert, getPackage, getConvertInfo } from '@/api/admin'
export default {
	data () {
		var validateUrl = (rule, value, callback) => {
			if (value == '') {
				callback(new Error('请输入链接'));
			} else {
				let reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
				if (!reg.test(value)) {
					callback(new Error('请输入正确的链接'));
				}else{
					callback()
				}
			}
		};
		return {
			convertId: this.$route.query.convertId,
			disabled: false,
			form: {
				case: 'API',
				advertiser_id: this.$store.state.titlemess.advId,
				convert_source_type: this.$route.query.type,
				convert_type:this.$route.query.type=='AD_CONVERT_SOURCE_TYPE_APP_DOWNLOAD'?'AD_CONVERT_TYPE_ACTIVE':'AD_CONVERT_TYPE_CUSTOMER_EFFECTIVE',
				external_url:null,
				action_track_url:null,
				download_url:null
				// app_type: 'APP_IOS'
			},
			name: this.$route.query.name,
			app_name: '',
			rules: {
				name: [
					{ required: true, message: '请输入转化名称', trigger: 'blur' },
					{ min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
				],
				download_url: [
					{ validator: validateUrl, trigger: 'blur' }
				],
				action_track_url: [
					{ validator: validateUrl, trigger: 'blur' }
				],
				external_url:[
					{ validator: validateUrl, trigger: 'blur' }
				]
			}
		}
	},
	mounted () {
		if (this.convertId) {
			this.getDetail()
		}
	},
	methods: {
		getDetail () {
			getConvertInfo({ convertId: this.convertId }).then(res => {
				this.form = res.data;
				this.disabled = true;
				this.form.case = "API"
			})
		},
		Package () {
			// if (!this.form.app_type && this.form.convert_source_type=='AD_CONVERT_SOURCE_TYPE_APP_DOWNLOAD') {
			// 	this.$message({
			// 		message: '请选择应用类型',
			// 		type: 'warning'
			// 	});
			// 	return false;
			// }
			if(!this.form.download_url){
				this.$message({
					message: '请选择填写地址',
					type: 'warning'
				});
				return false;
			}
			getPackage({ downloadUrl: this.form.download_url }).then(res => {
				this.form.package_name = res.data.bundle;
				this.app_name = res.data.app_name
			})
		},
		onSubmit (formName) {
			
			this.$refs[formName].validate((valid) => {
				if (valid) {
					creatConvert(this.form).then(res => {
						if(res.code==0){
							this.$message({
								message: '新建成功',
								type: 'success'
							});
							this.$router.push({path:'/operate/toolCase/tool-case'})
						}
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		}
	}
}
</script>
<style>
.creat-box {
	margin-left: 212px;
	padding: 15px 40px;
}
.creat-box .form {
	width: 750px;
}
.creat-box .title {
	font-size: 18px;
	padding-bottom: 20px;
}
.error-zi{
	position: absolute;
	left: -77px;
    color: #f56c6c;
}
.creat-box .el-select{
	width: 629px;
}
</style>


