import BaseTableColumn from "./base.js"
import values from './datas/advgroupcols'
export default class advgroup extends BaseTableColumn {
    constructor() {
        console.log('构造函数初始化')
        super("advgroup", values, false)
    }
}