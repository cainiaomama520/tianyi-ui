import axios from '@/utils/request'
// 修改密码
export const changePassword = (password, newPassword) => {
  return axios
    .post(
      `/sys/user/password?password=` + password + '&newPassword=' + newPassword
    )
    .then(res => res)
}
// 管理者运营首页
export const getAdminIndex = params => {
  return axios.get(`/biz/advertiser/stat`, {
    params: params
  })
}
// ecahrt图/biz/advertiser/stat-chart
export const getAdminEchart = params => {
	return axios.get(`/biz/advertiser/stat-chart`, {
	  params: params
	})
  }
// 创建代理商
export const saveAgent = param => {
  return axios.post(`/biz/agent/save`, param).then(res => res)
}
// 更新代理商
export const updateAgent = param => {
  return axios.post(`/biz/agent/update`, param).then(res => res)
}

// 代理商列表
export const getAgentList = params => {
  return axios.get(`/biz/agent/list`, {
    params: params
  })
}
// 运营商
export const getUserList = params => {
  return axios.get(`/sys/user/list`, {
    params: params
  })
}
// 运营商新增
export const saveUser = param => {
  return axios.post(`/sys/user/save`, param).then(res => res)
}
// 修改运营商
export const udateUser = param => {
  return axios.post(`/sys/user/update`, param).then(res => res)
}
// 广告主管理
export const advManager = params => {
  return axios.get(`/biz/advertiser/list`, {
    params: params
  })
}
// 广告主的代理商GET /biz/agent/select
export const agentSelect = params => {
  return axios.get(`/biz/agent/select`, {
    params: params
  })
}

// 广告主分配
export const advSelect = params => {
  return axios.get(`/biz/advertiser/select`, {
    params: params
  })
}
// 保存广告主
export const saveAdv = param => {
  return axios.post(`/biz/advertiser/assign-adver`, param).then(res => res)
}
// 删除广告主
export const deleteAdv = param => {
  return axios.post(`/biz/advertiser/remove-adver`, param).then(res => res)
}
// 冻结或激活用户/sys/user/update
export const chengeUserStatus = param => {
  return axios.post(`/sys/user/status/` + param).then(res => res)
}
// 活动广告组
export const getGroupList = params => {
  return axios.get(`/biz/campaign/list`, {
    params: params
  })
}
// 数据统计
export const dataTotal = params => {
  return axios.get(`/biz/advertiser/report`, {
    params: params
  })
}
// 数据统计总消耗
export const totalCost = params => {
  return axios.get(`/biz/advertiser/totalCost`, {
    params: params
  })
}
// 广告主首页
export const getIndexTop = params => {
  return axios.get(`/biz/advertiser/home/account-balance/` + params)
}
export const getIndexEchart = (id, startDate, endDate) => {
  return axios.get(
    `/biz/advertiser/home/chart/` +
    id +
    '?startDate=' +
    startDate +
    '&endDate=' +
    endDate
  )
}
export const getIndexList = (id, startDate, endDate) => {
	return axios.get(
	  `/biz/advertiser/home/list/` +
	  id +
	  '?startDate=' +
	  startDate +
	  '&endDate=' +
	  endDate
	)
  }
// 广告主基本信息
export const getbaseInfo = id => {
  return axios.get(`/biz/advertiser/simple-info/` + id)
}
// 广告主左侧菜单/biz/ads/navi/{id}
export const getLeftBar = id => {
  // return axios.get(`/toutiao/navigateInfo?adverid=` + id);
  return axios.get(`/biz/ads/navi/` + id)
}
// 获取广告组列表
export const getadvGroup = param => {
  return axios.get(`/biz/ads/campaign-list`, {
    params: param
  })
}
// 获取广告计划列表
export const getadvPlan = param => {
  return axios.get(`/biz/ads/ad-list`, {
    params: param
  })
}
// 获取广告创意列表
export const getadvCreat = param => {
  return axios.get(`/biz/ads/creative-list`, {
    params: param
  })
}
// 获取广告组，计划，创意列表
export const getadvAllList = param => {
  return axios.get(`/toutiao/market`, {
    params: param
  })
  // return axios.get(`/toutiao/stats/v3` , { params: param });
}
// 更新光广告主状态
export const changecampaignStatus = param => {
  return axios.post(`/biz/campaign/status`, param).then(res => res)
}
// 广告计划状态开关
export const chengeAdvStatus = param => {
  return axios.post(`/biz/ad/updateStatus`, param).then(res => res)
}
// 更新广告计划出价
export const chengePlanPrice = param => {
  return axios.post(`/biz/ad/updateBidPrice`, param).then(res => res)
}
//更新广告计划预算 /biz/ad/updateBudget
export const updatePlanPrice = param => {
  return axios.post(`/biz/ad/updateBudget`, param).then(res => res)
}
// 更新广告创意/biz/creative/updateStatus
export const changecreativeStatus = param => {
  return axios.post(`/biz/creative/updateStatus`, param).then(res => res)
}
// 新增规则
export const addRules = param => {
  return axios.post(`/biz/rule/save`, param).then(res => res)
}
// 查询广告计划关联的规则
export const seeRules = id => {
  return axios.get(`/biz/rule/query?adid=` + id)
}
// 查询批量规则
export const batchRules = param => {
  return axios.get(`/biz/rule/query-batch`, {
    params: param
  })
}
// 发送预警
export const sendTalk = userId => {
  return axios.post(`/biz/dingtalk/send?userId=` + userId).then(res => res)
}
// 删除单条预警/biz/rule/delete/
export const deleteRule = id => {
  return axios.post(`/biz/rule/delete/` + id).then(res => res)
}

// 转化跟踪 列表
export const convertList = param => {
  return axios.get(`/biz/tool/convert/list`, {
    params: param
  })
}
// 新增 跟踪
export const creatConvert = param => {
  return axios.post(`/biz/tool/convert/create`, param).then(res => res)
}
// 获取包名/biz/tool/convert/package-info
export const getPackage = param => {
  return axios.get(`/biz/tool/convert/package-info`, {
    params: param
  })
}
// 查看详情convertId
export const getConvertInfo = param => {
  return axios.get(`/biz/tool/convert/info`, {
    params: param
  })
}
// 变更名称/biz/tool/convert/change-name
export const changeConvertName = param => {
  return axios.post(`/biz/tool/convert/change-name`, param).then(res => res)
}
// 变更状态/biz/tool/convert/change-status
export const changeConvertStatus = param => {
  return axios.post(`/biz/tool/convert/change-status`, param).then(res => res)
}
// 人群分组tag
export const getPerGroup = param => {
  return axios.get(`/biz/dmp/tags`, {
    params: param
  })
}
//DMP人群包列表
export const dmplist = param => {
  return axios.get(`/biz/dmp/list`, {
    params: param
  })
}
// 删除人群包
export const deleteDmp = param => {
  return axios.post(`/biz/dmp/delete`, param).then(res => res)
}
// 获取广告计划-广告组
export const getAdverPlan_group = str => {
  return axios.get(`/biz/ad/findAdCampByAdvid` + str).then(res => res)
}
// 获取creativeTypeList
export const getCreativeTypeList = () => {
  return axios.get(`/biz/dict/ad-cat-list`).then(res => res)
}
// 获取词包
export const getCBWords = id => {
  return axios.get(`/biz/tool/creative-words?adverid=` + id).then(res => res)
}
// 获取词包长度，ID
export const getCBWordsLength = str => {
  return axios.get(`/biz/creative-word/length` + str).then(res => res)
}

// 创建广告创意
export const creatCreative = params => {
  return axios.post(`/biz/creative/create`, params).then(res => res)
}
// 获取广告创意
export const getCreatCreative = str => {
  return axios.get(`/biz/creative/read` + str).then(res => res)
}
// 修改广告创意
export const changeCreatCreative = params => {
  return axios.post(`/biz/creative/update`, params).then(res => res)
}
// 获取创意点击链接
export const getCreativeClickUrl = params => {
  return axios.get(`/biz/tool/convert/info2` + params).then(res => res)
}

// 人群包详情
export const dmpDetail = param => {
  return axios.get(`/biz/dmp/audienceRead`, {
    params: param
  })
}
// 上传人群报/biz/dmp/upload-ta-pkg
export const creatDmp = param => {
  return axios.post(`/biz/dmp/upload-ta-pkg`, param).then(res => res)
}
// 推送人群包
export const sendDmp = param => {
  return axios.post(`/biz/dmp/push`, param).then(res => res)
}
// 人群包扩展
export const lookalikeDmp = param => {
  return axios.post(`/biz/dmp/lookalike`, param).then(res => res)
}
// 推送至本账户
export const pushDmp = param => {
  return axios.post(`/biz/dmp/publish`, param).then(res => res)
}
// 修改人群包名称/biz/dmp/change-name
export const changeDmpName = param => {
  return axios.post(`/biz/dmp/change-name`, param).then(res => res)
}
// 创建广告组/biz/campaign/create
export const creatGroup = param => {
  return axios.post(`/biz/campaign/create`, param).then(res => res)
}
// 已有广告主
export const selectHasGroup = param => {
  return axios.get(`/biz/campaign/findByAdvid`, {
    params: param
  })
}
// 修改广告组
export const updateGroup = param => {
  return axios.post(`/biz/campaign/update`, param).then(res => res)
}
// 广告组详情/biz/campaign/read
export const campaignRead = param => {
  return axios.get(`/biz/campaign/read`, {
    params: param
  })
}
// 获取建站列表/biz/tool/websites
export const getWebsites = param => {
  return axios.get(`/biz/tool/websites`, {
    params: param
  })
}
// 获取省市/biz/dict/city
export const getCity = param => {
  return axios.get(`/biz/dict/city`, {
    params: param
  })
}
// 可用转化列表/biz/tool/convert/serving-list
export const servingList = param => {
  return axios.get(`/biz/tool/convert/serving-list`, {
    params: param
  })
}
// 获取人群包/biz/dmp/serving-list
export const convertDmpList = param => {
  return axios.get(`/biz/dmp/serving-list`, {
    params: param
  })
}
// 创建广告计划
export const creatNewPlan = param => {
  return axios.post(`/biz/ad/create`, param).then(res => res)
}
// 广告计划详情
export const planDetail = param => {
  return axios.get(`/biz/ad/read`, {
    params: param
  })
}
// 更新广告计划/biz/ad/update
export const updatePlan = param => {
  return axios.post(`/biz/ad/update`, param).then(res => res)
}
// 复制计划
export const copyPlan = param => {
  return axios.post(`/biz/ad/copy`, param).then(res => res)
}
// 获取广告组
export const landingtype = param => {
  return axios
    .get(`/biz/campaign/list-by-landingtype`, {
      params: param
    })
    .then(res => res)
}
// 修改广告组名称/biz/campaign/change-name
export const changeCampaignName = param => {
  delete param.index
  return axios.post(`/biz/campaign/change-name`, param).then(res => res)
}
// 修改广告计划名字
export const changePlanName = param => {
  delete param.index
  return axios.post(`/biz/ad/change-name`, param).then(res => res)
}
// 广告计划下得创意/biz/creative/simple-info-by-adid
export const planCreative = param => {
  return axios.get(`/biz/creative/simple-info-by-adid`, {
      params: param
    })
    .then(res => res)
}
// 上传广告主导入excle
export const uploadExcleAdv = param => {
	return axios.post(`/biz/adver-login/upload-excel`, param).then(res => res)
  }
//   新增账号和密码/biz/adver-login/save
export const addAdvLogin = param => {
	return axios.post(`/biz/adver-login/save`, param).then(res => res)
  }
// 检测广告主id是否存在/biz/adver-login/check
export const checkAdverId = param => {
	return axios.get(`/biz/adver-login/check`, {
		params: param
	  }).then(res => res)
}
// 修改广告主日预算
export const updateTodayBudget = param => {
	return axios.post(`/biz/advertiser/update-budget`, param).then(res => res)
}
// 广告主规则\
export const  adverRuleSave= param => {
	return axios.post(`/biz/adver-rule/save`, param).then(res => res)
}
// 查询广告主/biz/adver-rule/query-batch
export const lookAdverRules = param => {
	return axios.get(`/biz/adver-rule/query-batch`, {
		params: param
	  }).then(res => res)
}
// 查看单个规则
export const seeAdverRules = id => {
	return axios.get(`/biz/adver-rule/query?adverId=` + id)
}
// 删除广告主规则
export const deleteAdverRule = id => {
	return axios.post(`/biz/adver-rule/delete/` + id).then(res => res)
  }
// 广告主下载报表/biz/export/advertiser
export const downloadAdvExport =param => {
	return axios.get(`/biz/export/advertiser`,{params: param})
}
// 广告首页数据/biz/advertiser/stat-summery
export const indexHeaderData =param => {
	return axios.get(`/biz/advertiser/stat-summery`,{params: param})
}
// 辅助工具
// 列表
export const autoactionList =param => {
	return axios.get(`/biz/autoaction/list`,{params: param})
}
// 广告主
export const myAdver =param => {
	return axios.get(`/biz/advertiser/my-adver`,{params: param})
}
// 添加规则
export const autoactionSave = param => {
	return axios.post(`/biz/autoaction/save`, param).then(res => res)
}
// 删除规则
export const autoactionDelete = id => {
	return axios.post(`/biz/autoaction/delete/`+ id).then(res => res)
}
// 查看详情
export const autoactionInfo =param => {
	return axios.get(`/biz/autoaction/info/`+param)
}
// 修改状态
export const autoactionStatus = param => {
	return axios.post(`/biz/autoaction/status`, param).then(res => res)
}
// /biz/adver-finacial/list
export const finacialList =param => {
	return axios.get(`/biz/adver-finacial/list`,{params: param})
}
// 头条批量导入
export const adverFinacial = param => {
	return axios.post(`/biz/adver-finacial/upload-excel`, param).then(res => res)
}
// 新增批量处理
export const saveFinacial = param => {
	return axios.post(`/biz/adver-finacial/save`, param).then(res => res)
}
// 查看头条财务信息
export const  multiGet=param => {
	return axios.get(`/biz/adver-finacial/multi-get`,{params: param})
}
// 头条导出报表/biz/export/adver-fund
export const downloadAdverFund =param => {
	return axios.get(`/biz/export/adver-fund`,{params: param})
}
// 报表订阅列表
export const reportList =param => {
	return axios.get(`/biz/report-subscriber/list`,{params: param})
}
// 上传报表订阅
export const saveReport = param => {
	return axios.post(`/biz/report-subscriber/save`, param).then(res => res)
}
// 订阅详情/biz/report-subscriber/info/{id}
export const reportDetail =id => {
	return axios.get(`/biz/report-subscriber/info/`+id)
}
// 删除订阅
export const deleteReport = id => {
	return axios.post(`/biz/report-subscriber/delete/`+id).then(res => res)
}
// 信息流下拉框
export const tmpNativeDropdown = param => {
	return axios.get(`/biz/tmpNative/dropdown`,{params: param}).then(res => res)
}
// 信息流列表
export const tmpNativeList = param => {
	return axios.get(`/biz/tmpNative/list-page`,{params: param}).then(res => res)
}
// 成本收入下拉
export const tmpGtIncomeDropdown = param => {
	return axios.get(`/biz/tmpGtIncome/dropdown`,{params: param}).then(res => res)
}
// 成本收入list
export const tmpGtIncomeList = param => {
	return axios.get(`/biz/tmpGtIncome/list-page`,{params: param}).then(res => res)
}
// 成本支出下拉
export const tmpGtCostdropDown = param => {
	return axios.get(`/biz/tmpGtCost/dropdown`,{params: param}).then(res => res)
}
// 成本支出list
export const tmpGtCostList = param => {
	return axios.get(`/biz/tmpGtCost/list-page`,{params: param}).then(res => res)
}