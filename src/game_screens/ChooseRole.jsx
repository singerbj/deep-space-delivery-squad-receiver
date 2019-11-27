import React, { Component } from "react";
import { connect } from 'react-redux';
import Config from '../Config';

class GameContainer extends Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
    //start timer, render every second, trigger ROLE_SELECT_TIME_EXPIRE after
    //TODO: figure out how to remove timer if roles are selected correctly
  }

  render(){
    let numberOfPlayers = Object.keys(this.props.players).length;
    let players = Object.keys(this.props.players).map((hardwareId) => { return this.props.players[hardwareId]; });
    let hostPlayer = players.filter((player) => { return player.isHost; })[0];
    let playerJsx = players.map((player, i) => {
      let roleText = "Awaiting selection..."
      if(player.role){
        roleText = Config.ROLES_TEXT[Config.ROLES[player.role]]
      }
      return (
        <div key={i}>
          {player.playerName + " - " + roleText}
        </div>
      );
    });

    return(
      <div>
        <h3>Select Your Role</h3>
        <div>
          { playerJsx }
        </div>
        { hostPlayer &&
          <h3>Start your engines when ready, {hostPlayer.playerName}!</h3>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(GameContainer);
