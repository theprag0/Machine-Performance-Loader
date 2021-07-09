const mongoose = require('mongoose');
const Machine = require('./models/Machine');

// dB Connection
mongoose.connect('mongodb://localhost:27017/perfLoad', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

function socketMain(io, socket) {
    let macA;
    // Client Auth
    socket.on('clientAuth', async key => {
        if(key === 'au6ket03p5G1G2VWZevWeR6NNp8ezDtX') {
            // Valid node client
            socket.join('clients');
        } else if (key === 'uiluON4TW0gwtz1mrdRTiNiL43kpTxpg') {
            // Valid UI Client
            socket.join('ui');
            const machines = await Machine.find({});
            if(machines.length > 0) {
                machines.forEach(machine => {
                    // At load, assume all machines are offline
                    machine.isActive = false;
                    io.to('ui').emit('data', machine);
                });
            }

        } else {
            socket.disconnect(true);
        }
    });

    socket.on('disconnect', async () => {
        const machine = await Machine.find({macA});
        if(machine.length > 0) {
            machine[0].isActive = false;
            io.to('ui').emit('data', machine[0]);
        }
    });

    socket.on('perfDataInit', async data => {
        macA = data.macA;
        const mongooseResponse = await checkAndAdd(data);
        console.log(mongooseResponse)
    });

    // Listen for client performance data
    socket.on('perfData', data => {
        io.to('ui').emit('data', data);
    });
}

async function checkAndAdd(data) {
    try{
        const foundMachine = await Machine.findOne({macA: data.macA});
        if(!foundMachine) {
            const newMachine = new Machine(data);
            const savedMachine = await newMachine.save();
            return 'added';
        } else {
            return 'found';
        }
    } catch(err) {
        console.log(err);
    }
}

module.exports = socketMain;