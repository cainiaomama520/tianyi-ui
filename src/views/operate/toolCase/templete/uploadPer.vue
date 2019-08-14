<template>
	<!-- 弹窗选择转化目标 -->
	<el-dialog
	:show-close="false"
		title="上传人群包"
		:visible.sync="editFormVisible"
		:close-on-click-modal="false"
		width="700px"
	>
		<el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="120px" class="unploadPer">
			<div class="row-item" style="margin-bottom:10px">
				<div class="required-item"></div>
				<el-form-item label="匹配类型" prop="deviceType">
					<div class="byted-radio-group btn-group" style="width:500px">
						<el-radio-group v-model="ruleForm.deviceType">
							<el-radio-button :key="index" :label="item.value" v-for="(item,index) in type">
								{{item.label}}
								<el-popover
									placement="top-start"
									width="380"
									trigger="hover"
									:content="item.tip"
								>
									<i class="el-icon-question" slot="reference"></i>
								</el-popover>
							</el-radio-button>
						</el-radio-group>
					</div>
				</el-form-item>
			</div>
			<div class="row-item">
				<div class="required-item"></div>
				<el-form-item label="人群包名称" prop="name"> 					
					<div class="byted-radio-group btn-group" style="width:470px"> 
						<el-input v-model="ruleForm.name" placeholder="请输入人群包名称" maxlength="25"></el-input>
					</div>
				</el-form-item>
			</div>
			<div class="row-item">
				<div class="required-item"></div>
				<el-form-item label="人群分组" prop="tag">					
					<div class="byted-radio-group btn-group" >
						<el-select v-model="ruleForm.tag" filterable allow-create placeholder="请输入或选择人群分组" style="width:470px" >
							<el-option v-for="item in personList" :key="item" :label="item" :value="item"></el-option>
						</el-select>
					</div>
				</el-form-item>
			</div>
			<div class="row-item">
				<div class="required-item"></div>
				<el-form-item label="上传文件">
					<div class="byted-radio-group btn-group">
						<div class="upload-demo">
							<div tabindex="0" class="el-upload el-upload--text">
								<i class="el-icon-upload"></i>
								<div class="el-upload__text">点击上传</div>
						<input type="file" class="fileLoad" accept=".zip,.txt" name="fileup" id="uploadEventFile" v-on:change="fileChange($event)"  />
							</div>
						</div>
						<p v-show="name">{{name}}</p>
					</div>
					<p style="color:red;color: red;padding-left: 22px;font-size: 12px;" v-show="error">请上传文件</p>
				</el-form-item>
			</div>
			<div class="row-item">
				<el-form-item label="说明">
					<div class="byted-radio-group btn-group">
						<p :key="index" v-for="(item,index) in list" class="descript">{{item}}</p>
					</div>
				</el-form-item>
			</div>
			<div  class="row-item" style="margin-left: 460px;">
				<el-button @click.native="resetForm('ruleForm')">取消</el-button>
				<el-button type="primary" @click.native="saveMenu('ruleForm')">上传</el-button>
			</div>
		</el-form>
	</el-dialog>
</template>
<script>
import { getPerGroup,creatDmp } from '@/api/admin.js'
import { error } from 'util';
export default {
	data () {
		return {
			list:['1. 安卓和IOS设备号，imei小写后MD5加密，IDFA大写后MD5加密，16/32位MD5均可','2. 上传文件内，每行一个号码，号码数量不多于3千万','3. 文件类型为单个或多个txt文件经过zip格式压缩得到，压缩后大小不超过1G','4. 上传完成后需要一定的校验时间，才能生效投放广告'],
			ruleForm: {
				tag: null,
				name:'',
				adverid:this.$store.state.titlemess.advId,
				deviceType:'0',
				file:''
			},
			type:[
				{
					label:'IMEI原值',
					value:'0',
					tip:'15位字母数，如123456789abcdef'
				},
				{
					label:'IDFA原值',
					value:'1',
					tip:'8位–4位–4位–4位–12位, 数字字母组合, 如: 1A2B3C4E-567-89DE-0011-DF1FC4E6484A'
				},
				{
					label:'UID原值',
					value:'2',
					tip:'数字组合, 如: 12345678'
				},
				// {
				// 	label:'MAC地址',
				// 	value:'4',
				// 	tip:'2位：2位：2位：2位：2位：2位，由A-F,a-f，数字组成，如2c:5b:b8:16:d3:c5'
				// },
				{
					label:'IMEI-MD5',
					value:'4',
					tip:'16或32位数字字母组合，如: ae7eecfd2c93396a89ba3b5efc482d7b'
				},
				{
					label:'IDFA-MD5',
					value:'5',
					tip:'16或32位数字字母组合，如: ae7eecfd2c93396a89ba3b5efc482d7b'
				},
				{
					label:'手机号-SHA256',
					value:'6',
					tip:'64位, 由a-f, A-F, 数字组成，如: ade0323ee23423423dfa134e32422eeecfd2c9390e82ed7e8332349128432'
				}
			],
			rules:{
				name: [
					{ required: true, message: '人群包名称不能为空', trigger: 'blur' },
					{ min: 1, max: 25, message: '人群包名称不能超过25个字符', trigger: 'blur' }
				],
				tag: [
					{ required: true, message: '人群分组不能为空', trigger: 'change' }
				]
				
			},
			advertiser_id:this.$store.state.titlemess.advId,
			flie:{},
			error:false,
			name:''
		};
	},
	props:['editFormVisible','personList'],
	mounted(){},
	methods: {
		saveMenu (formName) {
			this.$refs[formName].validate((valid) => {
			if (valid) {
				if(!this.file){
					this.error=true;
					return false
				}
				let formData = new FormData();
					formData.append('file',this.file);
					formData.append('tag',this.ruleForm.tag)
					formData.append('name',this.ruleForm.name)
					formData.append('adverid',this.ruleForm.adverid)
					formData.append('deviceType',this.ruleForm.deviceType)
					creatDmp(formData).then(res=>{
						if(res.code==0){
							this.$message({
								message: '上传成功',
								type: 'success'
							});
							this.$emit('upload',true)
							this.resetForm(formName)
						}
					})
			} else {
				console.log('error submit!!');
				return false;
			}
			});
		},
		resetForm(formName) {
			// 重置表单
			this.name=''
			this.$emit('cancel',false)
			this.$refs[formName].resetFields();
		},
		fileChange: function (el) {
			this.file=el.target.files[0]
			this.error=false;
			this.name=this.file.name
		}
	}
};
</script>
<style>
.unploadPer .descript{
	padding: 0px;
    color: rgb(153, 153, 153);
    font-size: 12px;
    line-height: 28px;
    display: block;
    overflow: hidden;
	text-align: left;
}
.unploadPer .el-upload{
	width: 140px;
	height: 120px;
	border: 1px dashed #d9d9d9;
    border-radius: 6px;
}
.unploadPer .el-upload .el-icon-upload {
    font-size: 40px;
	margin: 10px 0 0px;
	position: relative;
}
.unploadPer .el-radio-button{
	margin-bottom: 10px
}
.unploadPer .el-radio-button:nth-child(5){
	border-left: 1px solid #dcdfe6;
}
.unploadPer .row-item{
	margin-bottom: 20px
}
.unploadPer .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
	color: #fff;
}
.unploadPer .el-form-item__error{
	margin-left: 20px
}
.unploadPer .fileLoad{
	display: block;
    position: absolute;
    height: 119px;
    top: 0;
    width: 142px;
    opacity: 0;
}
</style>

