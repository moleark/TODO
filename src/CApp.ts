import { CAppBase, IConstructor } from "tonva";
import { VMain } from 'ui/main';
import { CUqBase } from "./CBase";
import { CMe } from "./me/CMe";
import { UQs } from "uqs";

export class CApp extends CAppBase {
    get uqs(): UQs { return this._uqs };
    cMe: CMe;

    protected newC<T extends CUqBase>(type: IConstructor<T>): T {
        return new type(this);
    }

    protected async internalStart() {
        this.cMe = this.newC(CMe);
        this.showMain();
    }

    showMain(initTabName?: string) {
        this.openVPage(VMain, initTabName);
    }
}
