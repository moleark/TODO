import { CAppBase, IConstructor } from "tonva";
import { VMain } from 'ui/main';
import { CUqBase } from "./CBase";
import { CMe } from "./me/CMe";
import { UQs } from "uqs";
import { CWorkItem } from "workitem/CWorkItem";
import { CWorkGrade } from "workgrade/CWorkGrade";

export class CApp extends CAppBase {
    get uqs(): UQs { return this._uqs };
    cMe: CMe;
    cWorkItem: CWorkItem;
    cWorkGrade: CWorkGrade;

    protected newC<T extends CUqBase>(type: IConstructor<T>): T {
        return new type(this);
    }

    protected async internalStart() {

        this.cMe = this.newC(CMe);
        this.cWorkItem = this.newC(CWorkItem);
        this.cWorkGrade = this.newC(CWorkGrade);

        this.showMain();
    }

    showMain(initTabName?: string) {
        this.openVPage(VMain, initTabName);
    }
}
