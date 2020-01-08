import * as React from 'react';
import { VPage, Page, SearchBox, FA, List, LMR } from 'tonva';
import { CWorkItem } from './CWorkItem';
import { observer } from 'mobx-react';
import { setting } from 'configuration';

export class VCreateWorkItem extends VPage<CWorkItem> {
    async open(param?: any) {
        this.openPage(this.page);
    }
    render() {
        return <this.page />
    }

    private page = observer(() => {

        let { saveWorkItem } = this.controller;
        let footer = <button type="button" className="btn btn-primary" style={{ padding: "6px 70px" }} onClick={saveWorkItem}>保存</button>
        return <Page header="添加工作" headerClassName={setting.pageHeaderCss} footer={footer} >
            内容
        </Page>;
    })
}
