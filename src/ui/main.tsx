import * as React from 'react';
import { VPage, TabCaptionComponent, Page, Tabs } from 'tonva';
import { CApp } from '../CApp';

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';

export class VMain extends VPage<CApp> {
    async open(param?: any) {
        this.openPage(this.render);
    }

    render = (param?: any): JSX.Element => {
        let { cMe, cWorkItem } = this.controller;
        let faceTabs = [
            { name: 'work', label: '工作', icon: 'th-large', content: cWorkItem.tab, onShown: cWorkItem.loadList, notify: undefined },
            { name: 'addressbook', label: '通讯录', icon: 'address-book', content: cWorkItem.tab, onShown: cWorkItem.loadList },
            { name: 'me', label: '我的', icon: 'user', content: cMe.tab, onShown: cWorkItem.loadList },
        ].map(v => {
            let { name, label, icon, content, notify, onShown } = v;
            return {
                name: name,
                caption: (selected: boolean) => TabCaptionComponent(label, icon, color(selected)),
                content: content,
                notify: notify,
                onShown: onShown,
            }
        });

        return <Page header={false} headerClassName={"bg-info"} >
            <Tabs tabs={faceTabs} />
        </Page>;
    }
}
