import React, {Component} from 'react';
import Cpu from './Cpu';
import Memory from './Memory';
import Info from './Info';
import './Widget.css';

class Widget extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {osType, upTime, freeMem, totalMem, usedMem, memoryUsage, cpuModel, cpuSpeed, numCores, cpuLoad, macA, isActive} = this.props.data;
        
        const cpuWidgetId = `cpu-widget-${macA}`;
        const memWidgetId = `mem-widget-${macA}`;

        const cpu = {cpuLoad, cpuWidgetId};
        const mem = {freeMem, totalMem, usedMem, memoryUsage, memWidgetId};
        const info = {osType, upTime, cpuModel, cpuSpeed, numCores, macA};

        let notActiveDiv;
        if(!isActive) {
            notActiveDiv = <div className="not-active">Offline</div>
        }

        return (
            <div className="widget col-sm-12">
                {notActiveDiv}
                <div className="container">
                    <div className="row">
                        <Cpu cpuData={cpu}/>
                        <Memory memData={mem}/>
                        <Info infoData={info}/> 
                    </div>
                </div>
            </div>
        );
    }
}

export default Widget;