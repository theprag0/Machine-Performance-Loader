import React from 'react';
import drawCircle from './utilities/canvasLoadAnimation';

function Memory(props) {
    const {freeMem, totalMem, usedMem, memoryUsage} = props.memData;
    const canvas = document.querySelector(`.${props.memData.memWidgetId}`);
    drawCircle(canvas, memoryUsage);

    const totalMemInGb = ((totalMem / 1073741824 * 100) / 100).toFixed(2);
    const freeMemInGb = ((freeMem / 1073741824 * 100) / 100).toFixed(2);
    const usedMemInGb = ((usedMem / 1073741824 * 100) / 100).toFixed(2);

    return (
        <div className="col-sm-3 mem">
            <h3>Memory Useage</h3>
            <div className="canvas-wrapper">
                <canvas className={props.memData.memWidgetId} height="200" width="200"></canvas>
                <div className="mem-text">{memoryUsage}%</div>
            </div>
            <div>Total Memory: {totalMemInGb}GB</div>
            <div>Free Memory: {freeMemInGb}GB</div>
            <div>Used Memory: {usedMemInGb}GB</div>
        </div>
    );
}

export default Memory;