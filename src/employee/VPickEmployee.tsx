import * as React from 'react';
import { VPage, Page, List, LMR } from 'tonva';
import { observer } from 'mobx-react';
import { setting } from 'configuration';
import { CEmployee } from './CEmployee';


export class VPickWorkGrade extends VPage<CEmployee> {
    async open(param?: any) {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { pageEmployee } = this.controller;
        return <Page header="选择员工" headerClassName={setting.pageHeaderCss} onScrollBottom={this.onScrollBottom} >
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
