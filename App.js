/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import Home from "./src/components/Home";
import Chat from "./src/components/Chat";
import { Router, Scene } from "react-native-router-flux";

import { Platform } from "react-native";

class App extends Component {
  render() {
    return (
      <Router>
        <Scene
          key="root"
          style={{ paddingTop: Platform.os === "ios" ? 64 : 54 }}
        >
          <Scene key="home" component={Home} title="Home" />
          <Scene key="chat" component={Chat} title="Chat" />
        </Scene>
      </Router>
    );
  }
}

export default App;
