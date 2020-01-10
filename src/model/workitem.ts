
import { observable } from 'mobx';

export class CurrentWorkItem {

    @observable currentList: any[] = [];

    add(current: any, post: any) {
        let index = this.currentList.indexOf(current);
        if (index === -1) {
            this.currentList.push(current);
        } else {
            this.remove(current);
        }
    }

    remove(customerid: any) {
        let index = this.currentList.findIndex(v => v === customerid);
        if (index >= 0) this.currentList.splice(index, 1);
    }

    clearAll() {
        this.currentList.splice(0, this.currentList.length);
    }

    getIds(): string {
        let result: string = "";
        this.currentList.forEach(element => {
            result += element + '-';
        });
        if (result.length > 0) {
            result = result.substring(0, result.length - 1)
        }
        return result;
    }

}