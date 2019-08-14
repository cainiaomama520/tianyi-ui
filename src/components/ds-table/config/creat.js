import BaseTableColumn from "./base.js"
import values from './datas/creatcol'
export default class creat extends BaseTableColumn {
    constructor() {
        super("creat", values, false)
    }
}