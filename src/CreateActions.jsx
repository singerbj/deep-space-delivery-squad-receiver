import { createStore } from 'redux';
import Config from './Config';

export default () => {
  return {
    setHostId: (hostId) => {
      return {
        type: 'SET_HOST_ID',
        hostId
      };
    },
    playerConnected: (deviceId, playerId, playerName) => {
      return {
        type: 'PLAYER_CONNECTED',
        deviceId,
        playerId,
        playerName
      };
    },
    checkForConnections: () => {
      return {
        type: 'CHECK_CONNECTIONS'
      };
    },
    setTimeRemaining: (timeRemaining, callback) => {
      return {
        type: 'SET_TIME_REMAINING',
        timeRemaining,
        callback
      }
    },
    roleSelectTimeExpired: () => {
      return {
        type: 'ROLE_SELECT_TIME_EXPIRE'
      }
    }
  };
};
