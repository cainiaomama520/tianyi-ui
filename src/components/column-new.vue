<template>
	<div>
		<el-row>
			<el-col :span="8">
				<div class="byted-select-panel-moduler-header">
					<span class="byted-select-panel-moduler-header-title">选定人群</span>
				</div>
				<div class="byted-select-panel-moduler-container">
					 <el-tabs v-model="activeName">
						<el-tab-pane label="定向" name="contant">
							<div v-for="item in list" :key="item.custom_audience_id" class="byted-select-panel-item-list">
								<el-checkbox-group
									v-model="checkedIncludes"
									@change="handleChecked(item)"
								>
									<el-checkbox :label="item.custom_audience_id" :disabled="item.disabled">{{item.name}}</el-checkbox>
								</el-checkbox-group>
							</div>
						</el-tab-pane>
						<el-tab-pane label="排除" name="exclude">
							<div v-for="item in listExport" :key="item.custom_audience_id" class="byted-select-panel-item-list">
								<el-checkbox-group
									v-model="checkedExport"
									@change="handleCheckedExpport(item)"
								>
									<el-checkbox :label="item.custom_audience_id" :disabled="item.disabled">{{item.name}}</el-checkbox>
								</el-checkbox-group>
							</div>
						</el-tab-pane>
					</el-tabs>
					
				</div>
			</el-col>

			<el-col :span="7" v-if="checkedIncludes.length>0||checkedExport.length>0" style="margin-left:30px">
				<div class="byted-select-panel-moduler-header">
					<span class="byted-select-panel-moduler-header-title">已选</span>
					<span class="byted-select-panel-moduler-header-clear" @click="clearAll">清空全部</span>
				</div>
				<div class="byted-select-panel-moduler-container">
					 <el-tabs v-model="activeName">
						<el-tab-pane label="定向" name="contant">
							<div v-for="item in list" :key="item.custom_audience_id" class="byted-select-panel-item-list">
								<el-checkbox-group
									v-model="checkedIncludes"
									@change="handleChecked(item)"
								>
									<el-checkbox :label="item.custom_audience_id" :disabled="item.disabled">{{item.name}}</el-checkbox>
								</el-checkbox-group>
							</div>
						</el-tab-pane>
						<el-tab-pane label="排除" name="exclude">
							<div v-for="item in listExport" :key="item.custom_audience_id" class="byted-select-panel-item-list">
								<el-checkbox-group
									v-model="checkedExport"
									@change="handleCheckedExpport(item)"
								>
									<el-checkbox :label="item.custom_audience_id" :disabled="item.disabled">{{item.name}}</el-checkbox>
								</el-checkbox-group>
							</div>
						</el-tab-pane>
					</el-tabs>
				</div>
			</el-col>
		</el-row>
		<div></div>
	</div>
</template>
<script>
import {convertDmpList} from '@/api/admin.js'
export default {
	props: {
		advId: {
			type: Number,
			require: false,
			default: () => []
		},
		checkedIncludesP: {
			type: Array,
			require: false,
			default: () => []
		},
		checkedExportP:{
			type: Array,
			require: false,
			default: () => []
		}
	},
	data: function () {
		return {
			activeName:'contant',
			checkedIncludes:this.checkedIncludesP,
			checkedExport:this.checkedExportP,
			list:[],
			listExport:[],
			hasSelectInclude:[],
			hasSelectExport:[]
		}
	},
	mounted(){
		this.getalist();
		
		console.log(121,this.checkedIncludes,this.checkedExport)
	},
	methods: {
		handleChecked(item){
			this.commonCheckFun(this.listExport,item,this.checkedIncludes)
		},
		handleCheckedExpport(item){
			this.commonCheckFun(this.list,item,this.checkedExport)
		},
		commonCheckFun(arr,item,selectArr){
			arr.filter(listItem => {
				if(item.custom_audience_id==listItem.custom_audience_id &&selectArr.includes(item.custom_audience_id) ){
					listItem.disabled=true;
				}else if(item.custom_audience_id==listItem.custom_audience_id &&!selectArr.includes(item.custom_audience_id) ){
					listItem.disabled=false;
				}
			});
		},
		isContain(arr1,arr2){ 
			for (var i = arr2.length - 1; i >= 0; i--) {  
				if(arr1.includes(arr2[i].custom_audience_id)){
					 arr2[i].disabled=true;  
				}  
			}  
			return true;  
		},
		handleCheckedCitiesChange (arr, val) {
			let arr1 = []
			this.list.map(item => {
				arr.filter(value => {
					if (item.value == value) {
						arr1.push(item)
					}
				})
			})
			this.hasSelect = arr1;
		},
		clearAll () {
			this.checkedIncludes=[];
			this.checkedExport=[];
			this.list.map(val=>{return val.disabled=false});
			this.listExport.map(val=>{return val.disabled=false})
		},
		getalist(){
			convertDmpList({adverId:this.advId}).then(res=>{
				this.list= JSON.parse(JSON.stringify(res.data));
				this.listExport= JSON.parse(JSON.stringify(res.data));
				this.isContain(this.checkedIncludes,this.listExport)
				this.isContain(this.checkedExport,this.list)
			})
		},
		remove (item) {
			var index = this.hasSelect.indexOf(item)
			if (index !== -1) {
				this.hasSelect.splice(index, 1);
			}
			this.checkedCities.splice(this.checkedCities.findIndex(v => v === item.value), 1)
		},
	},
	
	watch: {
		checkedIncludes(val){
			console.log(val,'回传val')
			this.$emit("update:checkedIncludesP",this.checkedIncludes);
			this.$emit("changeInclude",this.checkedIncludes)
		},
		checkedExport(){
			this.$emit("update:checkedExportP",this.checkedExport);
			this.$emit("changeExclude",this.checkedExport)
		},
	}
}
</script>

