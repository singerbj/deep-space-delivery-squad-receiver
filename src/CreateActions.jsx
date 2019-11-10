import { createStore } from 'redux';
import Config from './Config';

export default (store) => {
  return {
    setHostId: (hostId) => {
      store.dispatch({
        type: 'SET_HOST_ID',
        hostId
      })
    },
    playerConnected: (deviceId, playerId, playerName) => {
      store.dispatch({
        type: 'PLAYER_CONNECTED',
        deviceId,
        playerId,
        playerName
      })
    },
    checkForConnections: () => {
      store.dispatch({
        type: 'CHECK_CONNECTIONS'
      })
    },
    messageReceived: (message) => {
      if(message && message.type){
        store.dispatch(message);
      } else {
        console.log("Unexpected message: ", message);
      }
    }
  };
};
