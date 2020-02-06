import * as React from 'react';
import { VPage, Page } from 'tonva';
import { CMe } from './CMe';
import { setting } from 'configuration';

export class VMe extends VPage<CMe> {
    async open(param?: any) {

    }
    render() {
        return <Page logout={true} headerClassName={setting.pageHeaderCss}>
            我的Id:{this.controller.user.id}
        </Page>;
    }
}
