import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";

import { Actions } from "react-native-router-flux";

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20
  },
  nameInput: {
    height: 40,
    borderWidth: 2,
    borderColor: "palevioletred",
    borderRadius: 50,
    paddingLeft: 10,
    margin: 20
  },
  button: {
    borderWidth: 2,
    height: 40,
    borderColor: "papayawhip",
    borderRadius: 50,
    backgroundColor: "papayawhip",
    margin: 20
  },
  buttonText: {
    paddingTop: 10,
    textAlign: "center",
    color: "palevioletred"
  }
});

class Home extends Component {
  state = {
    name: " "
  };
  render() {
    return (
      <View>
        <Text style={styles.title}> Enter Your Name : </Text>
        <TextInput
          style={styles.nameInput}
          placeholder="Jon Snow"
          onChangeText={text => {
            this.setState({ name: text });
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            //navigate to next screen
            Actions.chat({
              user: this.state.name
            });
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Home;
