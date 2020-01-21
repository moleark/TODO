import * as React from 'react';
import { VPage, Page, LMR, EasyDate, tv, List, EasyTime } from 'tonva';
import { observer } from 'mobx-react';
import { CWorkItem } from './CWorkItem';
import { setting } from 'configuration';
import { observable } from 'mobx';
import { WorkItem } from 'model/workitem';

export class VWorkItemDetail extends VPage<CWorkItem> {
    @observable isShowContent: boolean = false;
    private item: any
    private child: any
    async open(param: WorkItem) {
        let { item, child } = param;
        this.item = item;
        this.child = child;
        this.openPage(this.page);
    }

    private rowTop = (current: any) => {
        let { description, grade, deadline, author } = current;
        let title = <div className="px-3">
            <i className="iconfont icon-duihao mr-2" style={{ fontSize: "16px", color: "#dbdbdb" }}></i>
            <span className="h5 text-black" ><strong>{description}</strong> </span>
        </div>
        let authorshow = <div className="mt-4">
            <span className="ml-4 pl-3 text-primary"> 王彦彩</span>
            <span className="mx-2">|</span>
            <span> {<EasyTime date={deadline}></EasyTime>}</span>
        </div>;

        let deadlineshow = deadline ? <div>
            <i className="iconfont icon-rili1 ml-3 mr-2" style={{ fontSize: "16px", color: "#dbdbdb" }}></i>
            <EasyTime date={deadline}></EasyTime>
        </div> : <></>;

        let operator = <div>
            <i className="iconfont icon-xiaoren ml-3 mr-2" style={{ fontSize: "16px", color: "#dbdbdb" }}></i>
            执行人：
            <span className=""> 王彦彩</span>
        </div>;
        return <div className="w-100 py-2 bg-white small text-muted">
            {title}
            {authorshow}
            <div className="sep-product-select my-2" style={{ margin: "0 0 0 40px" }} />
            {deadlineshow}
            <div className="sep-product-select my-2" style={{ margin: "0 0 0 40px" }} />
            {operator}
        </div >;
    }

    private rowContent = (current: any) => {
        let style: any = this.isShowContent ? { whiteSpace: "pre-wrap" } : {};
        let className: any = this.isShowContent ? "iconfont mr-3 mt-2 icon-fangxiang4" : "iconfont mr-3 mt-2 icon-angle-bottom"
        return <div className="w-100 bg-white small text-muted" >
            <div className="sep-product-select" style={{ margin: "0 0 0 40px" }} />
            <div className="text-truncate mt-3 mx-3" style={style}><small>{current.content}</small></div>
            <div onClick={this.onClickContent} className="text-center"> <small className={className} ></small></div>
        </div>;
    }
    private onClickContent = () => {
        this.isShowContent = !this.isShowContent;
    }

    private childItem = () => {
        let { showCreateWorkItem } = this.controller;
        return <div>
            <div className="w-100 py-2 bg-white small">
                <div className="sep-product-select my-2" style={{ margin: "0 0 0 40px" }} />
                <i className="iconfont icon-neirong ml-3 mr-2" style={{ fontSize: "16px", color: "#dbdbdb" }}></i>
                <span>子任务</span>
            </div>
            {this.child && <List items={this.child} item={{ render: this.renderItem }} />}
            <div className="text-primary text-center small bg-white py-2" onClick={() => showCreateWorkItem(this.item)}  >＋子任务</div>
        </div>
    }
    private renderItem = (item: any, index: number) => {
        let { delWorkItem } = this.controller;
        let { description, deadline, author } = item;
        let right = <div className="text-muted text-right samll" >
            <small>
                <span>{tv(author, v => v.name)}</span>
                <EasyDate date={deadline}></EasyDate>
                <i onClick={() => delWorkItem(item)} className="iconfont icon-shanchu pl-2" style={{ fontSize: "17px", color: "#d81e06" }}></i>
            </small>
        </div>;
        let left = <div className="w-100  mx-4" onClick={() => this.onClick(item)}>
            <div className="small"><strong>{description} </strong></div>
        </div>;
        return <LMR className="my-2 mx-4" right={right}>
            {left}
        </LMR >;
    }



    private page = observer(() => {
        let { showEiditWorkItem } = this.controller;

        let right_page = <span onClick={() => showEiditWorkItem(this.item)} className="iconfont mr-3 mt-2 icon-bianji" style={{ fontSize: "17px", color: "#ffffff" }}></span>;
        return <Page header="任务详情" headerClassName={setting.pageHeaderCss} right={right_page}>

            {this.rowTop(this.item)}
            {this.childItem()}
            {this.rowContent(this.item)}
        </Page >
    })

    onClick = (model: any) => {
        let { showWorkItemDetail } = this.controller;
        if (this.item.id !== model.id) {
            showWorkItemDetail(model);
        }
    }


}