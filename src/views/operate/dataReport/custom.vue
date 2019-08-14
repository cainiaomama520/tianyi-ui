<template>
<el-dialog
  :title="title" custom-class="custom" :visible.sync="showCustom" width="30%" :show-close="false">
 <div class="list_box">
 <i class="fa fa-close closeIcon" @click="submitData(false)"></i>
 <el-row>
 	<el-col :span="15">
 	<el-input placeholder="请输入内容" v-model="searchKey" clearable><el-button @click="search" slot="append" icon="el-icon-search"></el-button></el-input>
	</el-col>
 </el-row>
<el-row class="transfer_box">
	<el-col :span="12">
		<ul class="left">
		<li class="title">{{title}}</li>
		<li  v-for="item in lists" @click="selected(item)" :key="item.id">{{item.name}}</li>
		</ul>
	</el-col>
	<el-col :span="12">
		<ul>
		<li class="title">已选择<span class="delete-all" @click="selectData=[]">全部删除</span></li>
		<li  @click="remove(item)" v-for="item in selectData" :key="item.id">{{item.name}}<i class="fa fa-remove"></i></li>
		</ul>
	</el-col>
</el-row>
</div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="submitData(false)">取 消</el-button>
    <el-button type="primary" @click="submitData(true)">确 定</el-button>
  </span>
</el-dialog>
</template>
<script>
	export default{
		data(){
			return {
				selectData:[],
				searchKey:''
			}
		},
		props:{
			showCustom:{default:false,type:Boolean},
			lists:{default:[],type:Array|Object},
			title:{default:"",type:String}
		},
		methods:{
			handleClose(){

			},
			search(){

			},
			selected(item){
				if(!this.inArray(item,this.selectData)){
					this.selectData.push(item);
				}
				
			},
			remove(item){
				for(let i=0; i<this.selectData.length; i++){
					if(this.selectData[i].id==item.id&&this.selectData[i].name==item.name){
						this.selectData.splice(i,1);
						return;
					}
				}
			},
			submitData(type){
				if(type){
					this.$emit('changeAdgroups',true,this.getIdList(this.selectData));
				}else{
					this.$emit('changeAdgroups',false);
				}
			},
			getIdList:function(arr){
				let arr1=[];
				for(var i=0; i<arr.length; i++){
						arr1.push(arr[i].id);
				}
				return arr1;
			},
			inArray(item,arr){
				for(let i=0; i<arr.length; i++){
					if(arr[i].id==item.id&&arr[i].name==item.name){
						return true;
					}
				}
				return false;
			}
		}
	}
</script>
<style scoped>
	.transfer_box{
		margin: 10px 0;
		border: 1px solid #e8e8e8;
		border-radius: 5px;
	}
	.transfer_box .title{
	padding: 5px 15px;
    background: #f3f3f3;
    border-bottom: 1px solid #e8e8e8;
	}
	.transfer_box ul.left{
		border-right: 1px solid #e8e8e8;
	}
	.transfer_box ul li{
		padding: 5px 30px 5px 15px;
		overflow: hidden;
        white-space: nowrap;
       text-overflow: ellipsis;
       cursor: pointer;
       position: relative;
	}
	.transfer_box ul li:hover{
		background: #fafafa;
	}
	.transfer_box ul li i{
		position: absolute;
    right: 25px;
    cursor: pointer;
    line-height: 21px;
    color: #222;
	}
	.delete-all{
		float: right;
		cursor: pointer;
    color: #406599;
	}
	.closeIcon{
		position: absolute;
		top: 20px;
		right: 20px;
		cursor: pointer;
	}
</style>