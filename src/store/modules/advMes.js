import moment from 'moment'
const titlemess = {
    state: {
        advName: '',
        advId: '',
        opName: '',
		company: '',
		isGroup:true,
		isCreat:true,
		activeName:'group',
		campaign_id:'',
		creative_id:'',
		time:[],
		activeSelect:'',
		adId:''
    },
    mutations: {
        changeMes (state, str) {
            state.advName = str.name
            state.advId = str.adverid
            state.company = str.agentName||str.company
		},
		changeStatus(state, str){
			state.isGroup=str;
		},
		changeCreat(state, str){
			state.isCreat=str
		},
		changeActive(state, str){
			state.activeName=str
		},
		getCampaignId(state, str){
			state.campaign_id=str
		},
		getCreativeId(state, str){
			state.creative_id=str
		},
		changeDate(state, str){
			state.time=str
		},
		changeActiveSelect(state, str){
			state.activeSelect=str;
		},
		getadId(state, str){
			state.adId=str;
		}
	},
	getters:{
		isGroup:state => state.isGroup
	},
    action: {

    }
}
export default titlemess