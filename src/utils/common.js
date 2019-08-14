export let gender=[{id:'',label:'不限'},{id:0,label:'男'},{id:1,label:'女'}]
export let areaType=[{id:'',label:'不限'},{id:0,label:'按省市'}]
export let ageArr=[{id:'',label:'不限'},{id:18,label:'<18'},{id:1,label:'18-23'},
{id:2,label:'24-30'},{id:3,label:'31-40'},{id:4,label:'31-40'},
{id:5,label:'41-49'},{id:6,label:'50+'}]
export let crowdPack=[{id:'',label:'不限'},{id:1,label:'定向或排除人群'}]
export let interest=[{id:'',label:'不限'},{id:1,label:'系统推荐'},{id:1,label:'自定义'}]
export let platform=[{id:'',label:'不限'},{id:1,label:'iOS'},{id:2,label:'Android'}]
export let network=[{id:'',label:'不限'},{id:1,label:'WIFI'},{id:2,label:'2G'},{id:3,label:'3G'},{id:4,label:'4G'}]
export let operator=[{id:'',label:'不限'},{id:1,label:'移动'},{id:2,label:'联通'},{id:3,label:'电信'}]
export let newuser=[{id:'',label:'不限'},{id:6,label:'一个月以内'},{id:1,label:'一个月到三个月'},{id:2,label:'三个月以上'}]
export let phoneBrand=[{id:'',label:'不限'},{id:1,label:'按品牌'}]
export const  filterStatus=(val)=> {
	switch (val) {
		case '-1':
			return '可用 全部';
			break;
		case '2':
			return '可用 已生效';
			break; 
		case '14':
			return '可用 推送中';
			break;
		case '10':
			return '可用 推送完成';
			break;
		case '-2':
			return '不可用 全部';
			break;
		case '13':
			return '不可用 等待计算';
			break;
		case '8':
			return '计算中';
			break;
		default:
			return '不可用 计算失败'
	}
}
