import React, { Component} from "react";
import { Provider , connect } from 'react-redux';
import PeerJsManager from "./PeerJsManager";
import store from "./CreateStore";
import CreateActions from "./CreateActions";
import GameContainer from "./game_screens/GameContainer";
import Config from './Config';
import "./App.css";
store.actions = CreateActions(store);

class App extends Component{
  constructor(props) {
    super(props);
    this.peerJsManager = new PeerJsManager(store);
    this.setupChromeCast();
    this.checkForConnections()
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
        <div className="App">
          <GameContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
