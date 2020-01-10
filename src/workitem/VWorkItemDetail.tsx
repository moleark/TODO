import * as React from 'react';
import { VPage, Page, LMR, Prop, ComponentProp, PropGrid, EasyDate, tv } from 'tonva';
import { observer } from 'mobx-react';
import { CWorkItem } from './CWorkItem';
import { setting } from 'configuration';

//name, nick
function rowTop(current: any) {
    let { description, grade, deadline, author } = current;
    let left = <div className="mt-2 sm-3 text-muted" >
        <div>作&nbsp;&nbsp;&nbsp;者：{tv(author, v => v.nick)}</div>
        <div className="mt-1">负责人：{tv(author, v => v.nick)}</div>
        <div className="mt-1">难&nbsp;&nbsp;&nbsp;度：{tv(grade, v => v.name)}</div>
    </div >;
    let content = <div className="mt-2 sm-3 text-muted">
        <div>创建时间：{<EasyDate date={deadline}></EasyDate>}</div>
        <div>
            <span>时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;限：{<EasyDate date={deadline}></EasyDate>}</span>
        </div>
    </div>;

    return <LMR className="cursor-pointer w-100 py-2 h6 align-items-center">
        <div><strong>{description}</strong></div>
        <LMR className="small" left={left}>{content}</LMR>
    </LMR >;
}

function rowCom(caption: string, value: any) {
    return <div className="small my-3 pb-3" style={{ whiteSpace: "pre-wrap" }}>
        {value}
    </div>;
}

export class VWorkItemDetail extends VPage<CWorkItem> {
    async open() {
        this.openPage(this.page);
    }
    private page = observer(() => {
        let { current, showEiditWorkItem } = this.controller;
        let rows: Prop[] = [
            {
                type: 'component',
                component: rowTop(current),
            } as ComponentProp,
            {
                type: 'component',
                component: rowCom('', current.content),
            } as ComponentProp

        ];

        let right = <span onClick={showEiditWorkItem} className="iconfont mr-3 mt-2 icon-bianji" style={{ fontSize: "17px", color: "#ffffff" }}></span>
        return <Page header="任务详情" headerClassName={setting.pageHeaderCss} right={right}>
            <PropGrid rows={rows} values={current} />
        </Page >
    })
}