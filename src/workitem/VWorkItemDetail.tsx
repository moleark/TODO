import * as React from 'react';
import { VPage, Page, LMR, Prop, ComponentProp, PropGrid, EasyDate, tv, List } from 'tonva';
import { observer } from 'mobx-react';
import { CWorkItem } from './CWorkItem';
import { setting } from 'configuration';
import { observable } from 'mobx';
import { WorkItem } from 'model/workitem';

export class VWorkItemDetail extends VPage<CWorkItem> {
    @observable isShowContent: boolean = false;
    private item: any
    private child: any
    async open(param: WorkItem) {
        let { item, child } = param;
        this.item = item;
        this.child = child;
        this.openPage(this.page);
    }

    private rowTop = (current: any) => {
        let { description, grade, deadline, author } = current;
        let left = <div className="mt-2 sm-3 text-muted" >
            <div>作&nbsp;&nbsp;&nbsp;者：{tv(author, v => v.nick)}</div>
            <div className="mt-1">难&nbsp;&nbsp;&nbsp;度：{tv(grade, v => v.name)}</div>
        </div >;
        let content = <div className="mt-2 sm-3 text-muted">
            <div>创建时间：{<EasyDate date={deadline}></EasyDate>}</div>
            <div>
                <span>时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;限：{<EasyDate date={deadline}></EasyDate>}</span>
            </div>
        </div>;

        return <LMR className="cursor-pointer w-100 py-2 h6 align-items-center">
            <div><strong>{description}</strong></div>
            <LMR className="small" left={left}>{content}</LMR>
            <div className="mt-2 d-flex justify-content-end small">
                <div>
                    <span>负责人：{tv(author, v => v.nick)}</span>
                    <span className="iconfont mr-3 mt-2 icon-bianji" style={{ fontSize: "10px", }}></span>
                </div>
                <div>
                    <span>参与人{tv(author, v => v.nick)}</span>
                    <span className="iconfont mr-3 mt-2 icon-bianji" style={{ fontSize: "10px", }}></span>
                </div>
            </div>
        </LMR >;
    }

    private rowCom = (current: any) => {
        let style: any = this.isShowContent ? { whiteSpace: "pre-wrap" } : {};
        let className: any = this.isShowContent ? "iconfont mr-3 mt-2 icon-fangxiang4" : "iconfont mr-3 mt-2 icon-angle-bottom"
        return <div className="mt-3 mb-2 text-truncate" >
            <div className="mb-2"><strong>任务内容</strong></div>
            <div className="text-truncate" style={style}><small>{current.content}</small></div>
            <div onClick={this.onClickContent} className="text-center"> <small className={className} ></small></div>
        </div>;
    };

    private onClickContent = () => {
        this.isShowContent = !this.isShowContent;
    }

    private page = observer(() => {
        let { showEiditWorkItem, showCreateWorkItem } = this.controller;
        let rows: Prop[] = [
            {
                type: 'component',
                component: this.rowTop(this.item),
            } as ComponentProp,
            {
                type: 'component',
                component: this.rowCom(this.item),
            } as ComponentProp

        ];

        let right_page = <span onClick={() => showEiditWorkItem(this.item)} className="iconfont mr-3 mt-2 icon-bianji" style={{ fontSize: "17px", color: "#ffffff" }}></span>;
        return <Page header="任务详情" headerClassName={setting.pageHeaderCss} right={right_page}>
            <PropGrid rows={rows} values={this.item} />
            <div className="sep-product-select" style={{ margin: '0 auto' }} />
            <div className="d-flex justify-content-between px-3 py-1" style={{ backgroundColor: "#bfbfbf" }}>
                <div><strong>任务明细</strong></div>
                <div onClick={() => showCreateWorkItem(this.item)} ><span className="iconfont icon-tianjia" style={{ fontSize: "17px" }}></span></div>
            </div>
            {this.child && <List items={this.child} item={{ render: this.renderItem }} />}
        </Page >
    })

    onClick = (model: any) => {
        let { showWorkItemDetail } = this.controller;
        if (this.item.id !== model.id) {
            showWorkItemDetail(model);
        }
    }

    private renderItem = (item: any, index: number) => {
        let { delWorkItem } = this.controller;
        let { description, deadline, author } = item;
        let right = <div className="text-muted text-right samll" >
            <small>
                <span>{tv(author, v => v.name)}</span>
                <EasyDate date={deadline}></EasyDate>
                <i onClick={() => delWorkItem(item)} className="iconfont icon-shanchu pl-2" style={{ fontSize: "17px", color: "#d81e06" }}></i>
            </small>
        </div>;
        let left = <div className="w-100" onClick={() => this.onClick(item)}>
            <div className="small"><strong>{description} </strong></div>
        </div>;
        return <LMR className="my-2 mx-3" right={right}>
            {left}
        </LMR >;
    }
}