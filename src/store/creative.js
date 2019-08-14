const state = {
  creatStyle: 1,
  hasReflash: false,
  progCreativeArray: [
    [],
    [],
    [],
    [],
    [],
    []
  ],
  selfCreativeArray: [
    [],
    [],
    [],
    [],
    [],
    []
  ],
  creativeArray:[]
}
const mutations = {
  setHasReflash(state, val) {
    // sessionStorage.setItem("selfCreativeArray", JSON.stringify(val));
    state.hasReflash = val;
  },
  setSelfCreativeArray(state, val) {
    // sessionStorage.setItem("selfCreativeArray", JSON.stringify(val));
    state.selfCreativeArray = val;
  },
  setProgCreativeArray(state, val) {
    // sessionStorage.setItem("selfCreativeArray", JSON.stringify(val));
    state.progCreativeArray = val;
  },
  setCreatStyle(state, val) {
    state.creatStyle = val;
  },
  getCreativeWord(state, val){
	state.creativeArray=val
  }
}
// for (var item in state) {
//   sessionStorage.getItem(item) ? state[item] = sessionStorage.getItem(item) : false;
// }

export default {
  state,
  mutations
};