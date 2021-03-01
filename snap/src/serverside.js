/*
 serverside.js - WebSocket connection to the serverside
*/
modules.serverside = '2021-March-01';
(function () {
    const isSecure = location.protocol === 'https:';
    const protocol = isSecure ? 'wss://' : 'ws://';
    window.serversideSocket = new WebSocket(`${protocol}${location.host}`);
    window.serversideSocket.addEventListener('open', event => console.log('Serverside socket is open'));
    window.serversideSocket.addEventListener('close', event => {
        if (event.code === 1011) {
            throw new Error(event.reason);
        }
    });
    window.serversideSocket.addEventListener('message', event => eval(event.data));
    window.serversideSocket.addEventListener('error', event => {
        throw new Error(event);
    });
})();
