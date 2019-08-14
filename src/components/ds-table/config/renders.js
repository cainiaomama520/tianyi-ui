let filterStatus = function (val) {
    switch (val) {
        case 'AD_STATUS_DELIVERY_OK':
            return '投放中'
            break
        case 'AD_STATUS_DATA_ERROR':
            return '数据错误'
            break
        case 'AD_STATUS_DISABLE':
            return '计划暂停'
            break
        case 'AD_STATUS_AUDIT':
            return '新建审核中'
            break
        case 'AD_STATUS_REAUDIT':
            return '修改审核中'
            break
        case 'AD_STATUS_DONE':
            return '已完成（投放达到结束时间）'
            break
        case 'AD_STATUS_CREATE':
            return '计划新建'
            break
        case 'AD_STATUS_AUDIT_DENY':
            return '审核不通过'
            break
        case 'AD_STATUS_BALANCE_EXCEED':
            return '账户余额不足'
            break
        case 'AD_STATUS_BUDGET_EXCEED':
            return '超出预算'
            break
        case 'AD_STATUS_NOT_START':
            return '未到达投放时间'
            break
        case 'AD_STATUS_NO_SCHEDULE':
            return '不在投放时段'
            break
        case 'AD_STATUS_CAMPAIGN_DISABLE':
            return '已被广告组暂停'
            break
        case 'AD_STATUS_CAMPAIGN_EXCEED':
            return '广告组超出预算'
            break
        case 'AD_STATUS_DELETE':
            return '已删除'
            break
        case 'AD_STATUS_FROZEN':
            return '已冻结'
            break
        case 'AD_STATUS_SOME_DELIVERY_OK':
            return '部分投放中'
            break
        case 'CREATIVE_STATUS_DELIVERY_OK':
            return '投放中'
            break
        case 'CREATIVE_STATUS_NOT_START':
            return '未到达投放时间'
            break
        case 'CREATIVE_STATUS_NO_SCHEDULE':
            return '不在投放时段'
            break
        case 'CREATIVE_STATUS_DISABLE':
            return '创意暂停'
            break
        case 'CREATIVE_STATUS_CAMPAIGN_DISABLE':
            return '已被广告组暂停'
            break
        case 'CREATIVE_STATUS_CAMPAIGN_EXCEED':
            return '广告组超出预算'
            break
        case 'CREATIVE_STATUS_AUDIT':
            return '新建审核中'
            break
        case 'CREATIVE_STATUS_REAUDIT':
            return '修改审核中'
            break
        case 'CREATIVE_STATUS_DELETE':
            return '已删除'
            break
        case 'CREATIVE_STATUS_DONE':
            return '已完成（投放达到结束时间）'
            break
        case 'CREATIVE_STATUS_AD_DISABLE':
            return '广告计划暂停'
            break
        case 'CREATIVE_STATUS_AUDIT_DENY':
            return '审核不通过'
            break
        case 'CREATIVE_STATUS_BALANCE_EXCEED':
            return '账户余额不足'
            break
        case 'CREATIVE_STATUS_BUDGET_EXCEED':
            return '超出预算'
            break
        case 'CREATIVE_STATUS_DATA_ERROR':
            return '数据错误（数据错误时返回，极少出现）'
            break
        case 'CREATIVE_STATUS_PRE_ONLINE':
            return '预上线'
            break
        case 'CREATIVE_STATUS_AD_AUDIT':
            return '广告计划新建审核中'
            break
        case 'CREATIVE_STATUS_AD_REAUDIT':
            return '广告计划修改审核中'
            break
        case 'CREATIVE_STATUS_AD_AUDIT_DENY':
            return '广告计划审核不通过'
            break
        case 'CREATIVE_STATUS_ALL':
            return '所有包含已删除'
            break
        case 'CREATIVE_STATUS_NOT_DELETE':
            return '所有不包含已删除（状态过滤默认值）'
            break
        default:
            return '-'
    }
}
export default class renders {
    static operator = {
        name: function (h, item, col) {
            return (
                <div
                    class="link"
                    onClick={() => {
                        this.$store.commit('changeMes', item)
                        this.$store.commit('changeActiveSelect', '2')
                        let obj = {
                            adverid: item.adverid,
                            agentName: item.agentName,
                            name: item.name
                        }
                        let routeUrl = this.$router.resolve({
                            path: '/operate/spreadMng/advert',
                            query: { data: JSON.stringify(obj) }
                        })
                        window.open(routeUrl.href, '_blank')
                    }}
                >
                    {item[col]}
                </div>
            )
        },
        ctr: function (h, item, col) {
            return <span>{item['ctr']}%</span>
        }
    }
    static advgroup = {
        status: function (h, item, col) {
            return (
                <el-switch
                    name={item['status']}
                    v-model={item[col]}
                    inactive-value="CAMPAIGN_STATUS_DISABLE"
                    active-value="CAMPAIGN_STATUS_ENABLE"
                />
            )
        },
        name: function (h, item, col) {
            return (
                <div class="commonName">
                    <span
                        class="link"
                        onClick={() => {
                            this.$store.commit('getCampaignId', item['id'])
                            this.$store.commit('changeActive', 'plan')
                        }}
                    >
                        {item[col]}
                    </span>
                    <el-popover
                        v-model={this.popoverShow}
                        placement="bottom"
                        trigger="click"
                    >
                        <v-change-name
                            index={this.index}
                            on-emit={({ callName, data }) => {
                                let self = this
                                data.campaignId = item['id']
                                data.callback = function () {
                                    self.popoverShow = false
                                }
                                this.emit(callName, data)
                            }}
                            v-model={item[col]}
                        />
                        <span class="fr" slot="reference">
                            <i class="el-icon-edit" />
                        </span>
                    </el-popover>
                </div>
            )
        },
        operate: function (h, item, col) {
            return (
                <div>
                    <span
                        class="link"
                        onClick={() => {
                            this.$store.commit('changeActiveSelect', '3')
                            this.$router.push({ path: '/operate/dataReport/adgroup' })
                        }}
                    >
                        数据</span>
                    <span
                        style="margin-left:5px"
                        class="link"
                        onClick={() => {
                            let routeData = this.$router.resolve({
                                path: '/operate/newGroup/new-group',
                                query: { campaingId: item['id'] }
                            })
                            window.open(routeData.href, '_blank')
                        }}
                    >
                        修改</span>
                </div>
            )
        },
        landing_type: function (h, item, col) {
            return (
                <div>
                    {item['landing_type'] == 'LINK' ? '落地页' : '应用下载'}
                </div>
            )
        },
        ctr: function (h, item, col) {
            return <div>{item['ctr']}%</div>
        },
        convert_rate: function (h, item, col) {
            return (
                <div>
                    <span>{item[col]}%</span>
                </div>
            )
        }
    }
    static plan = {
        opt_status: function (h, item, col) {
            return (
                <el-switch
                    name={item['status']}
                    v-model={item[col]}
                    inactive-value="AD_STATUS_DISABLE"
                    activeValue="AD_STATUS_ENABLE"
                />
            )
        },
        name: function (h, item, col) {
            return (
                <div class="commonName">
                    <span class="link" onClick={() => {
                        this.$store.commit("changeCreat", false);
                        this.$store.commit("changeActive", "creative");
                        this.$store.commit("getCreativeId", item['id']);
                        this.$store.commit("getCampaignId", "");
                    }}>
                        {item[col]}
                    </span>

                    <el-popover
                        v-model={this.popoverShow}
                        placement="bottom"
                        trigger="click"
                    >
                        <v-change-name
                            index={this.index}
                            on-emit={({ callName, data }) => {
                                let self = this
                                data.adId = item['id']
                                data.callback = function () {
                                    self.popoverShow = false
                                }
                                this.emit(callName, data)
                            }}
                            v-model={item[col]}
                        />
                        <span class="fr" slot="reference">
                            <i class="el-icon-edit" />
                        </span>
                    </el-popover>
                </div>
            )
        },
        operate: function (h, item, col) {
            return (
                <div>
                    <span
                        style="margin-right:5px"
                        class="link"
                        onClick={() => {
                            let routeData = this.$router.resolve({
                                path: '/operate/newPlan/new-plan',
                                query: {
                                    adId: item['id'],
                                    landing_type: item['landing_type'],
                                    campaign_name: item['campaignName']
                                }
                            })
                            window.open(routeData.href, '_blank')
                        }}
                    >修改</span>
                    <span
                        class="link"
                        onClick={() => {
                            this.$store.commit('changeActiveSelect', '3')
                            this.$router.push({ path: '/operate/dataReport/adPlan' })
                        }}
                    >数据</span>
                    {(item['status'] == 'AD_STATUS_DELETE' || item['status'] == 'AD_STATUS_AUDIT_DENY') ? <el-tooltip class="item" effect="dark" content="该状态下不支持复制" placement="top">
                        <el-button style="font-size:12px;color:#606266;padding:2px;cursor: no-drop;" type="text">复制</el-button>
                    </el-tooltip> : <span
                        class="link"
                        onClick={() => {
                            this.emit('showCopyDialog', item)
                        }}
                    >复制</span>}
                    <br />
                    <span
                        class="link"
                        onClick={() => {
                            this.emit('showCopyCreatDialog', item)
                        }}
                    >查看详情</span>
                    <copy-plan vModel="showCopy" />
                    <show-creat vModel="showCreat" />
                </div>
            )
        },
        status: function (h, item, col) {
            return <span>{filterStatus(item[col])}</span>
        },
        ruleStatus: function (h, item, col) {
            return (
                <div>
                    <el-popover
                        v-show={item[col] !== 0}
                        placement="top-start"
                        title="预警"
                        width="200"
                        trigger="hover"
                    >
                        {item['rules'].map(rule => {
                            return (
                                <div style="font-size:12px">
                                    {rule.desc}
                                    <span style="color:red;margin-left:4px">
                                        {rule.alert ? '报警' : ''}
                                    </span>
                                </div>
                            )
                        })}
                        <span slot="reference">
                            {item[col] == 0
                                ? '~'
                                : item[col] == 1
                                    ? '报警'
                                    : item[col] == 2
                                        ? '正常'
                                        : '关闭'}
                        </span>
                    </el-popover>
                    <span v-show={item[col] == 0}>~</span>
                    <i
                        v-show={item[col] !== 0}
                        class="el-icon-edit"
                        aria-hidden="true"
                    />
                </div>
            )
        },
        campaignName: function (h, item, col) {
            return (
                <div
                    class="link"
                    onClick={() => {
                        this.$store.commit("getCampaignId", item['campaignId']);
                    }}
                >
                    {item[col]}
                </div>
            )
        },
        cpa_bid: function (h, item, col) {
            return (
                <div>
                    <span>
                        目标转化:
                        <br />
                        {item[col]}
                        <br />
                        oCPM{item['show'] == '1'}
                    </span>
                    <i class="el-icon-edit" />
                </div>
            )
        },
        startTime: function (h, item, col) {
            return (
                <div>
                    {item[col]}~{item['endTime']}
                </div>
            )
        },
        budget: function (h, item, col) {
            return (
                <div>
                    {item[col]}
                    <br />
                    按日预算
                    <i class="el-icon-edit" />
                </div>
            )
        },
        show: function (h, item, col) {
            return <div>{item['show']}</div>
        },
        convert_rate: function (h, item, col) {
            return (
                <div>
                    <span>{item[col]}%</span>
                </div>
            )
        }
    }
    static creat = {
        opt_status: function (h, item, col) {
            return (
                <el-switch
                    name={item['opt_status']}
                    v-model={item[col]}
                    inactive-value="CREATIVE_STATUS_DISABLE"
                    activeValue="CREATIVE_STATUS_ENABLE"
                />
            )
        },
        title: function (h, item, col) {
            return (
                <div>
                    <span>{item[col]}</span>
                    {
                        (item['creativeInfo'] && item['creativeInfo']['images'] && item['creativeInfo']['images'].length == 1 && item['creativeInfo']['imageMode'] == 'image') ? <img
                            style="width:180px;height:auto"
                            src={item['creativeInfo']['images'][0]['imageUrl']}
                        /> : (item['creativeInfo'] && item['creativeInfo']['video'] && item['creativeInfo']['imageMode']) ? (<div>
                            <img
                                style="width:180px;height:auto"
                                src={item['creativeInfo']['video']['imageUrl']} /><a style="top: 50%;margin-top: -14px;" v-show={item['creativeInfo']['imageMode'] == 'video' && item['creativeInfo']['video']['imageUrl']}
                                    href={'https://cc.toutiao.com/v/video_player?code=' + item['creativeInfo']['video']['videoId']}
                                    target="_blank" class="play-btn">
                                <img style="display: block;width: 100%;" src="/static/images/play.png" /></a></div>) :
                                (item['creativeProgramming'] && item['creativeProgramming'][0] && item['creativeProgramming'][0]['images']) ? <img
                                    style="width:180px;height:auto"
                                    src={item['creativeProgramming'][0]['images'][0]['imageUrl']}
                                /> : (item['creativeInfo'] && item['creativeInfo']['images'] && item['creativeInfo']['images'].length > 1 && item['creativeInfo']['imageMode'] == 'image') ? <div>
                                    {item['creativeInfo']['images'].map((img, index) => {
                                        return <img style="width:54px;height:auto" src={img['imageUrl']} />
                                    }
                                    )}
                                </div> : ''
                    }
                </div>
            )
        },
        operator: function (h, item, col) {
            return (
                <span
                    style="margin-right:5px"
                    class="link"
                    onClick={() => {
                        let routeData = this.$router.resolve({
                            path: '/operate/newCreat/new-creat',
                            query: {
                                adId: item['adId'],
                                landing_type: item['landing_type'],
                                planName: item['adName'],
                                APPType: item['app_type']
                            }
                        })
                        window.open(routeData.href, '_blank')
                    }}
                >
                    修改
                 </span>
            )
        },
        status: function (h, item, col) {
            return (
                <div>
                    <span>{filterStatus(item[col])}</span>
                </div>
            )
        },
        adName: function (h, item, col) {
            return (
                <div
                    class="link"
                    onClick={() => {
                        // this.$store.commit('changeActive', 'plan')
                        this.$store.commit('getCreativeId', item['adId'])
                    }}
                >
                    {item[col]}
                </div>
            )
        },
        campaignName: function (h, item, col) {
            return (
                <div
                    class="link"
                    onClick={() => {
                        this.$store.commit('changeActive', 'plan')
                        this.$store.commit("getCampaignId", item['campaignId']);
                    }}
                >
                    {item[col]}
                </div>
            )
        },
        convert_rate: function (h, item, col) {
            return (
                <div>
                    <span>{item[col]}%</span>
                </div>
            )
        }
    }
}