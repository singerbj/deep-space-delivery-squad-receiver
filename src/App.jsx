import React, { Component} from "react";
import { Provider , connect } from 'react-redux';
import PeerJsManager from "./PeerJsManager";
import store from "./CreateStore";
import CreateActions from "./CreateActions";
import GameContainer from "./game_screens/GameContainer";
import SpaceBackground from "./game_screens/SpaceBackground";
import Config from './Config';
store.actions = CreateActions(store);

class App extends Component{
  constructor(props) {
    super(props);
    this.peerJsManager = new PeerJsManager(store);
    this.setupChromeCast();
    this.checkForConnections()
    this.appCss = {
      fontFamily: "Arial, Helvetica, sans-serif",
      color: "#fff",
      zIndex: 500,
      position: "absolute",
      top: "0px",
      left: "0px",
      width: "calc(100% - 40px)",
      height:  "calc(100% - 40px)",
      padding: "20px"
    }
  }

  setupChromeCast () {
    if(window.navigator.userAgent.indexOf('CrKey') > -1){
      const options = new cast.framework.CastReceiverOptions();
      options.disableIdleTimeout = true;

      const instance = cast.framework.CastReceiverContext.getInstance();
      instance.start(options);
    }
  }

  checkForConnections () {
    setInterval(() => {
      store.actions.checkForConnections();
    }, Config.CHECK_CONNECTION_INTERVAL);
  }

  render(){
    return(
      <Provider store={store}>
        <SpaceBackground />
        <div className="App" style={this.appCss}>
          <GameContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
