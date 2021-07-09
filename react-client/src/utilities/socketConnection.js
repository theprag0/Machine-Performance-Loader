import io from 'socket.io-client';

const socket = io('http://localhost:3001');
socket.emit('clientAuth', 'uiluON4TW0gwtz1mrdRTiNiL43kpTxpg');
socket.on('connect', () => console.log('react connected to socket server'));
export default socket;