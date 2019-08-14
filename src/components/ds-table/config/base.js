import renders from "./renders"
export default class BaseTableColumn {
    type = null;
    showSummary = false;
    values = [];
    /**
     * 
     * @param {String} type 初始化哪个表格的数据
     */
    constructor(type, data, showSummary) {
        if (localStorage.getItem(`datatable_${type}`)) {
            this.values = JSON.parse(localStorage.getItem(`datatable_${type}`));
        } else {
            localStorage.setItem(`datatable_${type}`, JSON.stringify(data));
            this.values = data;
        }
        this.type = type;
        this.showSummary = showSummary;
    }
    /**
     * 获取当前分组下的所有列
     */
    cols() {
        let cols = []
        this.values.forEach(item => {
            cols = cols.concat(item.list)
        })
        if (cols) {
            cols = cols.filter(item => {
                return item.show
            })
            cols.map(a => {
                a.formatter = renders[this.type][a.id]
            })
            return cols
        }
    }
    /**
     * 获取当前分组下的所有折叠的列
     */
    expandCols() {
        return this.cols.filter(a => {
            return a.expand;
        });
    }
    /**
     * 获取当前分组下的所有不折叠的列
     */
    normalCols() {
        return this.cols.filter(a => a.expand === false);
    }
    /**
     * 获取分组数据
     */
    groups() {
        return this.values;
    }
    /**
     * 保存分组数据
     * @param {Array} data 
     */
    save(data) {
        localStorage.setItem(`datatable_${this.type}`, JSON.stringify(data));
        this.values = data;
    }
}