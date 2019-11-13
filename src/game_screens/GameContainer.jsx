import React, { Component } from "react";
import { connect } from 'react-redux';
import Config from '../Config';
import PlayersConnect from './PlayersConnect';

class GameContainer extends Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    if(this.props.gameState === Config.GAME_STATE.PLAYERS_CONNECT){
      return <PlayersConnect />;
    } else if(this.props.gameState === Config.GAME_STATE.CHOOSE_ROLE){

    } else if(this.props.gameState === Config.GAME_STATE.VOTE_JOURNEY){

    } else if(this.props.gameState === Config.GAME_STATE.ON_JOURNEY){

    } else if(this.props.gameState === Config.GAME_STATE.STATS_REVIEW){

    } else if(this.props.gameState === Config.GAME_STATE.VOTE_SPY){

    } else if(this.props.gameState === Config.GAME_STATE.JOURNEY_REVIEW){

    } else if(this.props.gameState === Config.GAME_STATE.GAME_REVIEW){

    }
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(GameContainer);
