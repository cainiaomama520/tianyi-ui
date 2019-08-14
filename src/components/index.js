import Vue from 'vue'
const components = {
  checkGroup: resolve => require(['./form/check-group.vue'], resolve),
  radioGroup: resolve => require(['./form/radio-group.vue'], resolve),
  changeName: resolve => require(['./changeName.vue'], resolve)
}
Object.keys(components).forEach(key => {
  let name = key.replace(/(\w)/, v => v.toUpperCase())
  Vue.component(`v${name}`, components[key])
})
