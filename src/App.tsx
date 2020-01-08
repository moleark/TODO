import * as React from 'react';
import './App.css';
import { NavView, nav, start } from 'tonva';
import { CApp } from 'CApp';
import { appConfig } from 'configuration';

nav.setSettings(appConfig);
class App extends React.Component {

    private onLogined = async () => {
        await start(CApp, appConfig);
    }
    public render() {
        //notLogined={this.onLogined} 
        return <NavView onLogined={this.onLogined} notLogined={this.onLogined} />
    }
}

export default App;