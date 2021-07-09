import React from 'react';
import moment from 'moment';

function Info(props){
    return (
        <div className="col-sm-3 col-sm-offset-1 cpu-info">
          <h3>Operating System</h3>
          <div className="widget-text">{props.infoData.osType}</div>
          <h3>Time Online</h3>
          <div className="widget-text">{moment.utc(props.infoData.upTime * 1000).format('HH:mm:ss')}</div>
          <div className="widget-text"><strong>MAC Address: </strong>{props.infoData.macA}</div>
          <h3>Processor information</h3>
          <div className="widget-text"><strong>Type:</strong> {props.infoData.cpuModel}</div>
          <div className="widget-text"><strong>Number of Cores:</strong> {props.infoData.numCores / 2}</div>
          <div className="widget-text"><strong>Clock Speed:</strong> {props.infoData.cpuSpeed}</div>
        </div>
    );
}

export default Info;