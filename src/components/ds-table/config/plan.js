import BaseTableColumn from "./base.js"
import values from './datas/plancol'
export default class plan extends BaseTableColumn {
    constructor() {
        super("plan", values, false)
    }
}