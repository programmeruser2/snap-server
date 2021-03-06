const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const vm = require('vm');
const app = express();
const server = http.createServer(app);
app.use(express.static('snap'));
const wss = new WebSocket.Server({ server });
wss.on('connection', ws => {
    const contextObject = {
        AbortController,
        AbortSignal,
        Buffer,
        __dirname,
        __filename: '<sandbox>',
        clearImmediate,
        clearInterval,
        clearTimeout,
        console,
        Event,
        EventTarget,
        exports,
        //global: contextObject,
        MessageChannel,
        MessageEvent,
        MessagePort,
        process,
        queueMicrotask,
        require,
        setImmediate,
        setInterval,
        setTimeout,
        TextDecoder,
        TextEncoder,
        URL,
        URLSearchParams,
        WebAssembly,
        runClientsideJS: code => ws.send(code)
    };
    contextObject.global = contextObject;
    vm.createContext(contextObject);
    ws.on('message', code => {
        vm.runInContext(code, contextObject);
    });
});
server.listen(8080, () => {
    console.log('Listening on port 8080');
});
