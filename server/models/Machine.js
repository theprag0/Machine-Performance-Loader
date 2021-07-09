const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const machineSchema = new Schema({
    macA: String,
    osType: String,
    upTime: Number, 
    freeMem: Number, 
    totalMem: Number, 
    usedMem: Number, 
    memoryUsage: Number, 
    cpuModel: String, 
    cpuSpeed: Number, 
    numCores: Number, 
    cpuLoad: Number,
});

module.exports = mongoose.model('Machine', machineSchema);