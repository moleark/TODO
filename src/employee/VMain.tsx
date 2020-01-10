import * as React from 'react';
import { VPage, Page, List, LMR, EasyDate } from 'tonva';
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

        return <Page header="工作" headerClassName={setting.pageHeaderCss} onScrollBottom={this.onScrollBottom}>
            员工
        </Page>;
    })

    private onScrollBottom = async () => {
        await this.controller.pageEmployee.more();
    }

}