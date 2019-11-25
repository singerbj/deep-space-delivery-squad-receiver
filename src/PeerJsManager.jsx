import { connect } from 'react-redux';
import Config from './Config';

const makeid = (length) => {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
};

class PeerJsManager {
  constructor(store) {
    var serverId = makeid(6);
    var peer = new Peer(serverId, { debug: 3 });
    var connectionsArray = [];

    peer.on('open', function (id) {
        if (peer.id === null) {
            console.log('Received null id from peer open');
        } else {
            store.actions.setHostId(peer.id);
        }
    });

    peer.on('connection', function (conn) {
      let state = store.getState();
      const playerName = conn.metadata ? conn.metadata.playerName : undefined;
      const deviceId = conn.metadata ? conn.metadata.deviceId : undefined;
      let numberOfPlayers = Object.keys(state.players).length;
      if(playerName && deviceId){
        let gameStarted = !state.gameState === Config.GAME_STATE.PLAYERS_CONNECT;
        let morePlayersCanJoin = numberOfPlayers < Config.MAX_PLAYERS;
        let playerHasConnectedBefore = state.players[deviceId];
        if((!gameStarted && morePlayersCanJoin) || (gameStarted && playerHasConnectedBefore)){
          console.log("Connected to: " + conn.peer + " with playerName: " + playerName);
          connectionsArray.push(conn);
          store.actions.playerConnected(deviceId, conn.peer, playerName);

          conn.on('data', function(data) {
            console.log('data recieved from ' + conn.peer + ':', data);
            store.actions.messageReceived(JSON.parse(data));
          });
          conn.on('close', function(data) {
            console.log('close (conn) ' + conn.peer + ':', data);
          });
          conn.on('error', function(data) {
            console.log('error (conn) ' + conn.peer + ':', data);
          });
        } else {
          if(gameStarted){
            console.log("Game already started, closing connection.");
            conn.send({ type: "GAME_STARTED" });
            setTimeout(() => { conn.close(); }, 1000);
          } else if(!gameStarted) {
            console.log("Too many connected players, closing connection.");
            conn.send({ type: "TOO_MANY_PLAYERS" });
            setTimeout(() => { conn.close(); }, 1000);
          }
        }
      } else {
        console.log("Invalid Game connection, closing connection.");
        conn.send({ type: "GAME_STARTED"});
        setTimeout(() => { conn.close(); }, 1000);
      }
    });

    peer.on('disconnected', function (conn) {
        console.log('Connection lost. Please reconnect', conn);
    });

    peer.on('close', function() {
        conn = null;
        console.log('Connection destroyed');
    });

    peer.on('error', function (err) {
        console.log(err);
    });

    setInterval(() => {
      connectionsArray = connectionsArray.filter((conn) => {
        return conn && conn.send && conn.peerConnection && conn.peerConnection.iceConnectionState !== "disconnected";
      });
      connectionsArray.forEach((conn) => {
        if(conn && conn.send && conn.peerConnection && conn.peerConnection.iceConnectionState !== "disconnected"){
          conn.send(store.getState());
        }
      });
    }, Config.SEND_STATE_INTERVAL);

    console.log('PeerJs setup complete!');
  }
}

export default PeerJsManager;
