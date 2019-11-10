import React, { Component } from "react";
import { connect } from 'react-redux';

class GameContainer extends Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div>
        <h3>Host Id: {this.props.hostId || "Loading..."}</h3>
        <div>
          <div>Number of Players: {Object.keys(this.props.players).length}</div>
          <div>{JSON.stringify(this.props.players)}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(GameContainer);
