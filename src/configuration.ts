import { AppConfig } from "tonva";
import logo from '../src/images/logo.png';
export const appConfig: AppConfig = {
    appName: '百灵威系统工程部/todo',
    version: '1.0.1',
    tvs: {},
    oem: '百灵威'
};

export const setting = {
    appName: "TODO",
    logo: logo,
    pageHeaderCss: 'bg-primary py-1',

}

/** 生产配置
const GLOABLE_PRODUCTION = {
    CHINA: 44,
    CHINESE: 196,
    SALESREGION_CN: 1
}
**/

// 测试环境配置
const GLOABLE_TEST = {
    CHINA: 43,
    CHINESE: 197,
    SALESREGION_CN: 4
}

// export { GLOABLE_PRODUCTION as GLOABLE };
export { GLOABLE_TEST as GLOABLE };