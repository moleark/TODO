
import * as React from "react";
import { CUqBase } from '../CBase';
import { VMain } from './VMain';
import { PageItems, Query, Context } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VCreateWorkItem } from "./VCreateWorkItem";
import { VWorkItemDetail } from "./VWorkItemDetail";
import { WorkItem } from "model/workitem";

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
    showCreateWorkItem = (model: any) => {
        let param: WorkItem = {
            parent: model,
            item: undefined,
            child: undefined,
        }
        this.openVPage(VCreateWorkItem, param);
    }

    showEiditWorkItem = async (model: any) => {
        this.openVPage(VCreateWorkItem, model);
    }

    pickGrade = async (context: Context, name: string, value: number): Promise<any> => {
        return await this.cApp.cWorkGrade.call();
    }

    pickEmployee = async (workitem:any): Promise<any> => {
    
        let mode:any = await this.cApp.cEmployee.call();
        this.uqs.todo.AddWorkResponsible.submit({workItem:workitem.id, responsible:  mode.webuser.id,employee: mode.employee.id});
        workitem.employee = mode.employee;
        await this.searchWorkItemByKey("");
        
    }

    saveWorkItem = async (id: number, param: any, parent: any) => {
        let { description, content, grade, deadline } = param;
        let parrm = { isValid: 1, description: description, content: content, deadline: deadline, grade: grade.id, author: this.user.id };
        let result = await this.uqs.todo.WorkItem.save(id, parrm);
        if (parent) {
            await this.uqs.todo.WorkRelation.add({ parent: parent.id, arr1: [{ child: result.id }] });
            this.closePage();
        }
        await this.loadList();
    }

    delWorkItem = async (model: any) => {
        let { id, description, content, grade, deadline, author } = model;
        await this.uqs.todo.WorkItem.save(id, { isValid: 0, description: description, content: content, grade: grade, author: author, deadline: deadline });
    }

    //添加任务End

    //任务明细 Start
    showWorkItemDetail = async (model: any) => {
        let { id } = model;
        let item = await this.uqs.todo.SearchWorkDetail.query({_id:id});
        let reslutchild = await this.uqs.todo.SearchWorkItem.query({ _parent: id });
        let child = reslutchild.ret.length > 0 ? reslutchild.ret : undefined;
        let param: WorkItem = {
            parent: undefined,
            item: item.ret[0],
            child: child,
        }
        this.openVPage(VWorkItemDetail, param);
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