import * as React from 'react';
import { VPage, Page, List, LMR ,SearchBox} from 'tonva';
import { observer } from 'mobx-react';
import { setting } from 'configuration';
import { CEmployee } from './CEmployee';


export class VPickEmployee extends VPage<CEmployee> {
    async open(param?: any) {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { pageEmployee ,searchEmployeeByKey} = this.controller;
        return <Page header="选择员工" headerClassName={setting.pageHeaderCss} onScrollBottom={this.onScrollBottom} >
         <SearchBox className="w-80 mt-1 mr-2"
                size='sm'
                onSearch={(key: string) => searchEmployeeByKey(key)}
                placeholder="请输入工作任务关键字" />
            <List items={pageEmployee} item={{ render: this.renderItem, onClick: this.onClick }} />
        </Page>;
    });


    private onScrollBottom = async () => {
        await this.controller.pageEmployee.more();
    }

    private onClick = async (model: any) => {
        await this.controller.returnEmployee(model);
        this.closePage();
    }

    private renderItem = (item: any, index: number) => {
        let { name } = item;
        return <LMR className="px-3 py-2 border" left={name}>
        </LMR >;
    }
}
