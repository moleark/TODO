import * as React from 'react';
import { VPage, Page, List, LMR ,SearchBox} from 'tonva';
import { observer } from 'mobx-react';
import { CEmployee } from './CEmployee';
import { setting } from 'configuration';


export class VMain extends VPage<CEmployee> {
    async open(param?: any) {

    }

    render() {
        return <this.page />
    }

    private page = observer(() => {
        let { pageEmployee , searchEmployeeByKey} = this.controller;
        return <Page header="工作" headerClassName={setting.pageHeaderCss} onScrollBottom={this.onScrollBottom}>
         <SearchBox className="w-80 mt-1 mr-2"
                size='sm'
                onSearch={(key: string) => searchEmployeeByKey(key)}
                placeholder="请输入工作任务关键字" />
           <List items={pageEmployee} item={{ render: this.renderItem }} />
        </Page>;
    })

    private onScrollBottom = async () => {
        await this.controller.pageEmployee.more();
    }
    private renderItem = (item: any, index: number) => {
        let { name } = item;
        return <LMR className="px-3 py-2 border" left={name}>
        </LMR >;
    }

}