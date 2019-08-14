export default {
	deliveryRange:[
		{
			id: 'DEFAULT',
			text: '默认'
		  }
	],
	deliveryMenu:[
		{
			id: 'DEFAULT',
			text: '转化量'
		  }
	],
  gender: [
    {
      id: 'NONE',
      text: '不限'
    },
    {
      id:'GENDER_MALE',
      text: '男'
    },
    {
      id: 'GENDER_FEMALE',
      text: '女'
    }
  ],
  area: [
    {
      id:'NONE',
      text: '不限'
    },
    {
      id: 'CITY',
      text: '按省市'
    }
  ],
  people: [
    {
      id: 'NONE',
      text: '不限'
    },
    {
      id: 'RETARGETING_INCLUDE',
      text: '定向排除人群'
    }
  ],
  interesting: [
    {
      id: 1,
      text: '不限'
    },
    {
      id: 2,
      text: '系统推荐'
    },
    {
      id: 3,
      text: '自定义'
    }
  ],
  appBehavior: [
    {
      id: 'NONE',
      text: '不限'
    }
  ],
  filter: [
    {
      id: 0,
      text: '不过滤'
    },
    {
      id: 1,
      text: '过滤'
    }
  ],
  phoneBrand: [
    {
      id: 0,
      text: '不限'
    },
    {
      id: 1,
      text: '按品牌'
    }
  ],
  putInTime: [
    {
      id: 1,
      text: '从今天起长期投放'
    },
    {
      id: 2,
      text: '设置开始和结束日期'
    }
  ],
  convertedUsers:[
	{
		id: 1,
		text: '广告计划'
	  },
	  {
		id: 2,
		text: '广告组'
	  },
	  {
		id: 3,
		text: '广告账户'
	  },
	  {
		id: 4,
		text: '不过滤'
	  }
  ],
  trackingMode:[
	{
		id: 1,
		text: '普通应用下载'
	  },
	//   {
	// 	id: 2,
	// 	text: '应用下载SDK'
	//   },
	  {
		id: 3,
		text: '应用下载API'
	  },
  ],
  putInType:[
	{
		id: 'FLOW_CONTROL_MODE_FAST',
		text: '优先跑量'
	  },
	  {
		id: 'FLOW_CONTROL_MODE_BALANCE',
		text: '均衡投放'
	  },
	  {
		id: 'FLOW_CONTROL_MODE_SMOOTH',
		text: '优先低成本'
	  }
  ],
  budgetMode:[
	{
		id: 'BUDGET_MODE_INFINITE',
		text: '不限'
	  },
	  {
		id:'BUDGET_MODE_DAY',
		text: '指定预算'
	  },
  ],
  covertType:[
	// {
	// 	id: '1',
	// 	text: '移动建站'
	//   },
	  {
		id:5,
		text: '落地页API'
	  },
  ],
  common:[
	{
		id: 'NONE',
		text: '不限'
	  }
  ],
  landingType:[
	{
		id: 'APP',
		text: '下载链接'
	},
	{
		id: 'LINK',
		text: '落地页'
	}
  ]
}
