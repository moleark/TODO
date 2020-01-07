import * as React from 'react';
import { VPage, TabCaptionComponent, Page, Tabs, Image } from 'tonva';
import { CApp } from '../CApp';
// import { setting } from 'configuration';

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';

export class VMain extends VPage<CApp> {
    async open(param?: any) {
        this.openPage(this.render);
    }
    // opensrc = () => {
    //     window.open(setting.downloadAppurl);
    // }

    render = (param?: any): JSX.Element => {
        let { cMe } = this.controller;
        let faceTabs = [
            { name: 'me', label: '我的', icon: 'user', content: cMe.tab }
        ].map(v => {
            let { name, label, icon, content } = v;
            return {
                name: name,
                caption: (selected: boolean) => TabCaptionComponent(label, icon, color(selected)),
                content: content,
            }
        });
        return <Page header={false} headerClassName={"bg-info"} >
            <Tabs tabs={faceTabs} />
        </Page>;
    }
}
