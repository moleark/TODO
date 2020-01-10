import { CUqBase } from '../CBase';
import { PageItems, Query } from 'tonva';
import { observable } from 'mobx';
import { VPickWorkGrade } from "./VPickWorkGrade";


// 图片
class PageWorkGrade extends PageItems<any> {
    private searchWorkGradeQuery: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 14;
        this.searchWorkGradeQuery = searchQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchWorkGradeQuery.page(param, pageStart, pageSize);
        return ret;
    }
    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

export class CWorkGrade extends CUqBase {
    @observable items: any[];
    @observable pageWorkGrade: PageWorkGrade;

    protected async internalStart() {
        await this.searchWorkGradeByKey("");
        this.openVPage(VPickWorkGrade);
    }

    searchWorkGradeByKey = async (key: string) => {
        this.pageWorkGrade = new PageWorkGrade(this.uqs.todo.SearchWorkGrade);
        this.pageWorkGrade.first({ key: key });
    }

    returnWorkGrade = (model: any) => {
        this.returnCall(model);
    }

}