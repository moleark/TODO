import * as React from 'react';
import { VPage, Page, List, LMR } from 'tonva';
import { observer } from 'mobx-react';
import { setting } from 'configuration';
import { CWorkGrade } from './CWorkGrade';

export class VPickWorkGrade extends VPage<CWorkGrade> {
    async open(param?: any) {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { pageWorkGrade } = this.controller;
        return <Page header="任务等级" headerClassName={setting.pageHeaderCss} onScrollBottom={this.onScrollBottom} >
            <List items={pageWorkGrade} item={{ render: this.renderItem, onClick: this.onClick }} />
        </Page>;
    });


    private onScrollBottom = async () => {
        await this.controller.pageWorkGrade.more();
    }

    private onClick = async (model: any) => {
        await this.controller.returnWorkGrade(model);
        this.closePage();
    }

    private renderItem = (item: any, index: number) => {
        let { name, amount } = item;
        return <LMR className="px-3 py-2 border" right={amount} left={name}>
        </LMR >;
    }
}

