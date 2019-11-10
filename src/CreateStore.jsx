import { createStore } from 'redux';
import Config from './Config';

const INITIAL_STATE = {
  gameState: 0,
  hostId: undefined,
  players: {}
};


const storeHandler = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_HOST_ID':
      return {
        ...state,
        hostId: action.hostId
      }
    case 'PLAYER_CONNECTED':
      var numberOfPlayers = Object.keys(state.players).length;
      if(numberOfPlayers < Config.MAX_PLAYERS){
        var players = { ...state.players };
        players[action.deviceId] = {
          deviceId: action.deviceId,
          playerId: action.playerId,
          playerName: action.playerName,
          connected: true,
          lastMessage: Date.now(),
          isHost: false
        };

        if(numberOfPlayers === 0){
          players[action.deviceId].isHost = true;
        }

        return {
          ...state,
          players: {
            ...players
          }
        }
      } else {
        return {
          ...state
        }
      }
    case 'CHECK_CONNECTIONS':
      var players = { ...state.players };

      Object.keys(players).forEach((deviceId) => {
        let player = players[deviceId];
        if(player.connected && player.lastMessage < (Date.now() - Config.MAX_HEARTBEAT_INTERVAL)){
          player.connected = false;
          if(state.gameState === Config.GAME_STATE.PLAYERS_CONNECT){
            if(player.isHost){
              delete players[deviceId];
              var nextHost = players[Object.keys(players)[0]];
              if(nextHost){
                nextHost.isHost = true;
              }
            } else {
              delete players[deviceId];
            }
          }
        }
      });

      return {
        ...state,
        players: {
          ...players
        }
      }
    case 'HEARTBEAT':
      var players = { ...state.players };
      var player = players[action.deviceId];
      if(player){
        player.lastMessage = Date.now();
        return {
          ...state,
          players: {
            ...players
          }
        }
      } else {
        return {
          ...state
        };
      }
    default:
      return state
  }
};

export default createStore(storeHandler);
