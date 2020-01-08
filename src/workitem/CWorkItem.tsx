
import * as React from "react";
import { CUqBase } from '../CBase';
import { VMain } from './VMain';
import { PageItems, Query } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

// 图片
class PageWorkItem extends PageItems<any> {
    private searchWorkItemQuery: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 14;
        this.searchWorkItemQuery = searchQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchWorkItemQuery.page(param, pageStart, pageSize);
        return ret;
    }
    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}


export class CWorkItem extends CUqBase {
    @observable items: any[];
    @observable pageWorkItem: PageWorkItem;

    protected async internalStart() {

    }

    searchWorkItemByKey = async (key: string) => {
        this.pageWorkItem = new PageWorkItem(this.uqs.todo.SearchWorkItem);
        this.pageWorkItem.first({ key: key });
    }

    loadList = async () => {
        await this.searchWorkItemByKey("");
    }

    render = observer(() => {
        return this.renderView(VMain)
    })

    tab = () => {
        return <this.render />;
    }

}