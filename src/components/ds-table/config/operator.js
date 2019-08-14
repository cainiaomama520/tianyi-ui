import BaseTableColumn from "./base.js"
import values from './datas/operationcols'
export default class operator extends BaseTableColumn {
    constructor() {
        console.log("构造函数初始化")
        super("operator", values, false)
    }
}