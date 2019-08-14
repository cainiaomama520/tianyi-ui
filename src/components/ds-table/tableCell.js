import Vue from 'vue'
Vue.component('tableCell', {
  data() {
    return {
      popoverShow:false
    }
  },
  props: {
    renderd: {
      type: Function,
      required: false
    },
    item: {
      type: Object,
      required: true
    },
    col: {
      type: String,
      required: true
    },
    index:{
      type:Number,
      required:false,
      default:0
    }
  },
  methods: {
    emit(callName, data) {
      this.$emit('emit', callName, data)
    }
  },
  render: function(h) {
    if (this.renderd) {
      return this.renderd(h, this.item, this.col)
    } else {
      return <span>{filterName(this.col, this.item[this.col])}</span>
    }
  }
})

export function filterName(name, value) {
  if (name.indexOf('rate') != -1 || name.indexOf('ctr') != -1) {
    return value + '%'
  } else {
    return value
  }
}
