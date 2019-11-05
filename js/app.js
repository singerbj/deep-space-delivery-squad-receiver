if(window.navigator.userAgent.indexOf('CrKey') > -1){
    const options = new cast.framework.CastReceiverOptions();
    options.disableIdleTimeout = true;

    const instance = cast.framework.CastReceiverContext.getInstance();
    instance.start(options);
}

var getRandHex = function(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
};

var serverId = getRandHex();

var peer = new Peer(null, { debug: 2 });

peer.on('open', function (id) {
    // Workaround for peer.reconnect deleting previous id
    if (peer.id === null) {
        console.log('Received null id from peer open');
        peer.id = lastPeerId;
    } else {
        lastPeerId = peer.id;
    }

    console.log('ID: ' + peer.id);
    cast.framework.CastReceiverContext.sendCustomMessage(, undefined, message)
//    recvId.innerHTML = "ID: " + peer.id;
//    status.innerHTML = "Awaiting connection...";
});

peer.on('connection', function (c) {
    // Allow only a single connection
    if (conn) {
        c.on('open', function() {
            c.send("Already connected to another client");
            setTimeout(function() { c.close(); }, 500);
        });
        return;
    }

    conn = c;
    console.log("Connected to: " + conn.peer);
//    status.innerHTML = "Connected"
    ready();
});

peer.on('disconnected', function () {
//    status.innerHTML = "Connection lost. Please reconnect";
    console.log('Connection lost. Please reconnect');

    // Workaround for peer.reconnect deleting previous id
    peer.id = lastPeerId;
    peer._lastServerId = lastPeerId;
    peer.reconnect();
});

peer.on('close', function() {
    conn = null;
//    status.innerHTML = "Connection destroyed. Please refresh";
    console.log('Connection destroyed');
});

peer.on('error', function (err) {
    console.log(err);
    alert('' + err);
});

console.log('done');