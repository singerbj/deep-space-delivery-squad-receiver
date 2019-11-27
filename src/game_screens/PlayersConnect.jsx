import React, { Component } from "react";
import { connect } from 'react-redux';
import Config from '../Config';

class GameContainer extends Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
  	let numberOfPlayers = Object.keys(this.props.players).length;
  	let players = Object.keys(this.props.players).map((hardwareId) => { return this.props.players[hardwareId]; });
  	let hostPlayer = players.filter((player) => { return player.isHost; })[0];
  	let playerJsx = players.map((player, i) => {
  		return (
  			<div key={i}>
  				Player {i + 1}: {player.playerName}
  			</div>
  		);
  	});

  	for(let i = numberOfPlayers; i < Config.MAX_PLAYERS; i += 1){
  		playerJsx.push(
  			<div key={i}>
  				Player {i + 1}: ?
  			</div>
  		);
  	}

  	return(
  		<div>
  			<h3>Spaceship Identifier: {this.props.hostId ? this.props.hostId.split('').join(' ') : "Loading..."}</h3>
  			<div>
  				<div>Number of Players Connected: {numberOfPlayers} out of {Config.MAX_PLAYERS}</div>
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
