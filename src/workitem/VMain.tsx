import * as React from 'react';
import { VPage, Page, SearchBox, FA, List, LMR, EasyDate } from 'tonva';
import { CWorkItem } from './CWorkItem';
import { setting } from 'configuration';
import { observer } from 'mobx-react';
import { tv } from 'tonva/CApp/cUq/reactBoxId';

export class VMain extends VPage<CWorkItem> {
    async open(param?: any) {

    }
    render() {
        return <this.page />
    }

    private page = observer(() => {
        let { searchWorkItemByKey, pageWorkItem, showCreateWorkItem, showWorkItemDetail } = this.controller;
        let right = <div className="w-19c d-flex">
            <SearchBox className="w-80 mt-1 mr-2"
                size='sm'
                onSearch={(key: string) => searchWorkItemByKey(key)}
                placeholder="请输入工作任务关键字" />
            <span onClick={showCreateWorkItem} className="iconfont mr-3 mt-2 icon-tianjia" style={{ fontSize: "17px", color: "#ffffff" }}></span>
        </div>;
        return <Page header="工作" headerClassName={setting.pageHeaderCss} right={right} onScrollBottom={this.onScrollBottom}>
            <List items={pageWorkItem} item={{ render: this.renderItem, onClick: showWorkItemDetail }} />
        </Page>;
    })

    private onScrollBottom = async () => {
        await this.controller.pageWorkItem.more();
    }

    private renderItem = (item: any, index: number) => {
        let { description, grade, deadline, author } = item;

        let right = <div className="text-muted text-right samll" >
            <div><small><EasyDate date={deadline}></EasyDate></small></div>
            <div className="samll"> <small>{tv(grade, v => v.name)}</small></div>
        </div >;
        let left = <div>
            <div>{description}</div>
            <div className="samll text-muted"> <small>王彦彩</small></div>
        </div>;

        return <LMR className="my-2 mx-3" left={left} right={right}>
        </LMR >;
    }
}
