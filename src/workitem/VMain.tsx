import * as React from 'react';
import { VPage, Page, SearchBox, FA, List, LMR } from 'tonva';
import { CWorkItem } from './CWorkItem';
import { setting } from 'configuration';
import { observer } from 'mobx-react';

export class VMain extends VPage<CWorkItem> {
    async open(param?: any) {

    }
    render() {
        return <this.page />
    }

    private page = observer(() => {

        let { searchWorkItemByKey, pageWorkItem, showCreateWorkItem } = this.controller;

        let right = <div className="w-19c d-flex">
            <SearchBox className="w-80 mt-1 mr-2"
                size='sm'
                onSearch={(key: string) => searchWorkItemByKey(key)}
                placeholder="请输入工作任务关键字" />
            <button className="btn btn-success btn-sm ml-4 mr-2 align-self-center" onClick={showCreateWorkItem}>
                <FA name="plus" />
            </button>
        </div>;
        return <Page header="工作" headerClassName={setting.pageHeaderCss} right={right} onScrollBottom={this.onScrollBottom}>
            <List items={pageWorkItem} item={{ render: this.renderItem }} />
        </Page>;
    })

    private onScrollBottom = async () => {
        await this.controller.pageWorkItem.more();
    }

    private renderItem = (item: any, index: number) => {
        let { description } = item;
        return <LMR className="px-3 py-2 border" right={description}>
            <div><b>{description}</b></div>
            <div className="smallPath small">{description}</div>
        </LMR >;
    }
}
