import * as React from 'react';
import { CUqBase } from '../CBase';
import { PageItems, Query } from 'tonva';
import { observable } from 'mobx';
import { VMain } from './VMain';
import { observer } from 'mobx-react';

// 员工
class PageEmployee extends PageItems<any> {
    private searchEmployeeQuery: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 14;
        this.searchEmployeeQuery = searchQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchEmployeeQuery.page(param, pageStart, pageSize);
        return ret;
    }
    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

export class CEmployee extends CUqBase {
    @observable items: any[];
    @observable pageEmployee: PageEmployee;

    protected async internalStart() {
        await this.searchEmployeeByKey("");
        this.openVPage(VMain);
    }

    searchEmployeeByKey = async (key: string) => {
        this.pageEmployee = new PageEmployee(this.uqs.hr.SearchEmployee);
        this.pageEmployee.first({ key: key });
    }

    returnEmployee = (model: any) => {
        this.returnCall(model);
    }
    //任务明细 End


    render = observer(() => {
        return this.renderView(VMain)
    })

    loadList = async () => {
        await this.searchEmployeeByKey("");
    }

    tab = () => {
        return <this.render />;
    }

}