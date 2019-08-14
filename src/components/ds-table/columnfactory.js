import advgroup from './config/advgroup'
import creat from './config/creat'
import operator from './config/operator'
import plan from './config/plan'
export default class factory {
    cols = null;
    constructor(type) {
        switch (type) {
            case "advgroup":
                this.cols = new advgroup();
                break;
            case "creat":
                this.cols = new creat();
                break;
            case "operator":
                this.cols = new operator();
                break;
            case "plan":
                this.cols = new plan();
                break;
        }
    }
}