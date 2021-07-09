const os = require('os');
const cpus = os.cpus();
const io = require('socket.io-client');
const socket = io('http://localhost:3001');

socket.on('connect', () => {
    const nI = os.networkInterfaces();
    let macA;
    for (let key in nI) {
        if(!nI[key][0].internal){

            // FOR TESTING PURPOSES!!
            macA = Math.floor(Math.random() * 3) + 1;
            break;
            // FOR TESTING PURPOSES!!

            if(nI[key][0].mac === '00:00:00:00:00:00') {
                macA = Math.random().toString(36).substr(2, 15);
            } else {
                macA = nI[key][0].mac;
            }
            break;
        }
    }

    // Client Auth
    socket.emit('clientAuth', 'au6ket03p5G1G2VWZevWeR6NNp8ezDtX');

    performanceData().then(data => {
        data.macA = macA;
        socket.emit('perfDataInit', data);
    });

    // Emit Performance data in intervals
    let perfDataInterval = setInterval(() => {
        performanceData().then(data => {
            data.macA = macA;
            socket.emit('perfData', data)
        });
    }, 1000);

    socket.on('disconnect', () => {
        clearInterval(perfDataInterval);
    });
});

function performanceData() {
    return new Promise(async (resolve, reject) => {
        // OS Type
        const osType = os.type() === 'Darwin' ? 'Mac' : os.type();
        
        // UpTime
        const upTime = os.uptime();
        
        // Memory Usage
        // Free
        const freeMem = os.freemem();
        // Total
        const totalMem = os.totalmem();
        const usedMem = totalMem - freeMem;
        const memoryUsage = Math.floor((usedMem / totalMem) * 100);
        
        // CPU Info
        // Model
        const cpuModel = cpus[0].model;
        // Clock Speed
        const cpuSpeed = cpus[0].speed;
        // No. of cores
        const numCores = cpus.length;
        // CPU Load
        const cpuLoad = await getCpuLoad();
        const isActive = true;
        resolve({
            osType, upTime, freeMem, totalMem, usedMem, memoryUsage, cpuModel, cpuSpeed, numCores, cpuLoad, isActive
        });
    });
}

// Average of CPU mode in all cores
function cpuAverage() {
    const cpus = os.cpus();
    let idleMs = 0;
    let totalMs = 0;
    cpus.forEach(core => {
        for (type in core.times) {
            totalMs += core.times[type];
        }
        idleMs += core.times.idle;
    });

    return {
        total: totalMs / cpus.length,
        idle: idleMs / cpus.length
    };
}

function getCpuLoad() {
    return new Promise((resolve, reject) => {
        const start = cpuAverage();
        setTimeout(() => {
            const end = cpuAverage();
            const idleDifference = end.idle - start.idle;
            const totalDifference = end.total - start.total;
            const percentageCpu = 100 - Math.floor(100 * (idleDifference / totalDifference));
            resolve(percentageCpu);
        }, 100);
    });
}