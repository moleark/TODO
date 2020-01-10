import * as React from 'react';
import { VPage, Page, Form, UiSchema, UiInputItem, UiIdItem, Schema, Context, tv } from 'tonva';
import { CWorkItem } from './CWorkItem';
import { observer } from 'mobx-react';
import { setting } from 'configuration';

export class VCreateWorkItem extends VPage<CWorkItem> {
    private form: Form;
    async open(param?: any) {
        this.openPage(this.page);
    }

    private gradeContent = (boxId: any) => {
        return tv(boxId, (values) => {
            let { name } = values;
            return <>{name}</>;
        });
    }

    private schema: Schema = [
        { name: 'description', type: 'string', required: true },
        { name: 'content', type: 'string', required: true },
        { name: 'deadline', type: 'date', required: true },
        { name: 'grade', type: 'id', required: true },
    ];

    private uiSchema: UiSchema = {
        items: {
            description: {
                widget: 'textarea', label: '描述', placeholder: '任务描述', rows: 2
            } as UiInputItem,
            content: {
                widget: 'textarea', label: '内容', placeholder: '请填任务内容', rows: 6
            } as UiInputItem,
            deadline: {
                widget: 'date', label: '时限', placeholder: '请填任务内容'
            } as UiInputItem,
            grade: {
                widget: 'id', label: '等级', pickId: this.controller.pickGrade, Templet: this.gradeContent
            } as UiIdItem,
            submit: { widget: 'button', label: '提交' }
        }
    };

    private onAddWork = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }
    private onFormButtonClick = async (name: string, context: Context) => {
        let { saveWorkItem, current } = this.controller;
        let id = current && current.id;
        await saveWorkItem(id, context.form.data);
        this.closePage();
    }

    private page = observer(() => {
        let { current } = this.controller;
        let footer = <div className="d-flex">
            <div className="flex-grow-1 justify-content-end">
                <button type="button" className="btn btn-primary mr-3 px-6" onClick={this.onAddWork} ><span className="px-4">保存</span></button>
            </div>
        </div>;

        return <Page header="添加工作" headerClassName={setting.pageHeaderCss} footer={footer} >
            <Form ref={v => this.form = v} className="my-3 mx-3"
                formData={current}
                schema={this.schema}
                uiSchema={this.uiSchema}
                onButtonClick={this.onFormButtonClick}
                requiredFlag={true}
            />
        </Page>;
    })
}

