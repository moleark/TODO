
import * as React from "react";
import { CUqBase } from '../CBase';
import { VMain } from './VMain';
import { PageItems, Query, Context } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VCreateWorkItem } from "./VCreateWorkItem";
import { VWorkItemDetail } from "./VWorkItemDetail";

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

    @observable pageWorkItem: PageWorkItem;
    protected async internalStart() {
    }

    searchWorkItemByKey = async (key: string) => {
        this.pageWorkItem = new PageWorkItem(this.uqs.todo.SearchWork);
        this.pageWorkItem.first({ key: key });
    }

    //添加任务Start
    showCreateWorkItem = () => {
        this.openVPage(VCreateWorkItem);
    }

    showEiditWorkItem = async (model: any) => {
        let { id } = model;
        let current = await this.uqs.todo.WorkItem.load(id);
        this.openVPage(VCreateWorkItem, current);
    }

    pickGrade = async (context: Context, name: string, value: number): Promise<any> => {
        return await this.cApp.cWorkGrade.call();
    }

    saveWorkItem = async (id: number, param: any) => {
        let { description, content, grade, deadline } = param;
        let parrm = { description: description, content: content, deadline: deadline, grade: grade.id, author: this.user.id };
        await this.uqs.todo.WorkItem.save(id, parrm);
        await this.loadList();
    }
    //添加任务End

    //任务明细 Start
    showWorkItemDetail = async (model: any) => {
        let { id } = model;
        let current = await this.uqs.todo.WorkItem.load(id);
        this.openVPage(VWorkItemDetail, current);
    }

    //任务明细 End

    render = observer(() => {
        return this.renderView(VMain)
    })

    loadList = async () => {
        await this.searchWorkItemByKey("");
    }

    tab = () => {
        return <this.render />;
    }

}