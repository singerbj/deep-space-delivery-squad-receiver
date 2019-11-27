export default {
  MAX_PLAYERS: 6,
  MAX_HEARTBEAT_INTERVAL: 3000,
  CHECK_CONNECTION_INTERVAL: 500,
  SEND_STATE_INTERVAL: 250,
  HOST_ID_LENGTH: 6,
  GAME_STATE: {
    PLAYERS_CONNECT: 0,
    CHOOSE_ROLE: 1,
    VOTE_JOURNEY: 2,
    ON_JOURNEY: 3,
    STATS_REVIEW: 4,
    VOTE_SPY: 5,
    JOURNEY_REVIEW: 6,
    GAME_REVIEW: 7,
  },
  ROLES: {
    GUNNER: 1,
    MEDIC: 2,
    COOK: 3,
    MECHANIC: 4,
    COMMS_OFFICER: 5,
    SCIENTIST: 6,
    1: "GUNNER",
    2: "MEDIC",
    3: "COOK",
    4: "MECHANIC",
    5: "COMMS_OFFICER",
    6: "SCIENTIST"
  },
  ROLES_TEXT: {
    GUNNER: "Gunner",
    MEDIC: "Medic",
    COOK: "Cook",
    MECHANIC: "Mechanic",
    COMMS_OFFICER: "Communications Officer",
    SCIENTIST: "Scientist"
  },
  COLORS: {
    BLACK: "#222222",
    WHITE: "#DDDDDD"
  }
};
