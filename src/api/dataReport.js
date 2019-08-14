import axios from '@/utils/request'
// 数据报告
import { model } from '@/utils/dataReport'
import moment from 'moment'
const summarizeTypes = [{ label: '合计', value: 0 }, { label: '分日', value: 2 }];
const landing_types = [{ label: '不限', value: 0 }, { label: '落地页', value: 1 }, { label: '文章推广', value: 2 }];
const pricings = [{ label: '不限', value: 0 }, { label: 'CPM', value: 1 }, { label: 'CPC', value: 2 },
{ label: 'OCPC', value: 3 }, { label: 'CPA', value: 4 },
{ label: 'OCPM', value: 5 }, { label: 'CPV', value: 6 }];
const inventory_types = [{ label: '不限', value: 0 }, { label: '今日头条', value: 1 }, { label: '头条系详情页', value: 2 },
{ label: '抖音', value: 3 }, { label: '西瓜视频', value: 4 },
{ label: '火山小视频', value: 5 }, { label: '穿山甲', value: 6 }];
const image_modes = [{ label: '不限', value: 0 }, { label: '小图', value: 1 }, { label: '大图', value: 2 },
{ label: '组图', value: 3 }, { label: '横版视频', value: 4 },
{ label: '竖版视频', value: 5 }, { label: '轮播', value: 6 }];
const creative_material_modes = [{ label: '不限', value: 0 }, { label: '自定义创意', value: 1 }, { label: '程序化创意', value: 2 }];
export const selects = {
	summarizeTypes: summarizeTypes,
	landing_types: landing_types,
	pricings: pricings,
	inventory_types: inventory_types,
	image_modes: image_modes,
	creative_material_modes: creative_material_modes
}
export const timeOptions = {
	shortcuts: [{
		text: '今天',
		onClick (picker) {
			const end = moment();
			const start = moment();
			picker.$emit('pick', [start, end]);
		}
	}, {
		text: '昨天',
		onClick (picker) {
			const end = moment().subtract(1, 'days');
			const start = moment().subtract(1, 'days');

			picker.$emit('pick', [start, end]);
		}
	}, {
		text: '过去7天',
		onClick (picker) {
			const end = moment().subtract(1, 'days');
			const start = moment().subtract(7, 'days');
			picker.$emit('pick', [start, end]);
		}
	}, {
		text: '本月',
		onClick (picker) {
			const end = moment();
			const start = moment().startOf("month");
			picker.$emit('pick', [start, end]);
		}
	}, {
		text: '上个月',
		onClick (picker) {
			const end = moment().subtract('month', 1).endOf("month");;
			const start = moment().subtract('month', 1).startOf("month");
			picker.$emit('pick', [start, end]);
		}
	}]
};
export const initModel = function (type, index) {
	for (let i = 0; i < model.length; i++) {
		if (model[i].type == type) {
			return model[i].values

		}
	}
};
export const getAdgroupData = params => {/*获取广告组表*/
	return axios.get(`/biz/report/campaign-report`, {
		params: params
	});
};
export const getAdgroupList = params => {/*获取广告组*/
	return axios.get(`/biz/campaign/findByAdvid`, {
		params: params
	});
};
export const getPlanList = params => {/*获取广告计划*/
	return axios.get(`/biz/ad/findByAdvid`, {
		params: params
	});
};
export const getPlanData = params => {/*获取广告计划表*/
	return axios.get(`/biz/report/ad-report`, {
		params: params
	});
};


export const getIdeasData = params => {/*获取创意表*/
	return axios.get(`/biz/report/creative-report`, {
		params: params
	});
};
// 报表下载组

export const  adgroupdown= params => {/*获取创意表*/
	return axios.get(`/biz/export/adgroup`, {
		params: params
	});
};
// 报表下载计划
export const  adplan= params => {/*获取创意表*/
	return axios.get(`/biz/export/ad`, {
		params: params
	});
};
// 创意报表下载
export const  creative= params => {/*获取创意表*/
	return axios.get(`/biz/export/creative`, {
		params: params
	});
};