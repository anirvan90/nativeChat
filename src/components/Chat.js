import React, { Component } from "react";
import PropTypes from "prop-types";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

import Backend from "../../Backend";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.renderBubble = this.renderBubble.bind(this);
  }

  componentWillMount() {}
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "palevioletred"
          }
        }}
      />
    );
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={message => {
          //send message to backend
          Backend.sendMessage(message);
        }}
        user={{ _id: Backend.getUid(), name: this.props.user }}
        renderBubble={this.renderBubble}
      />
    );
  }

  componentDidMount() {
    Backend.loadMessages(message => {
      this.setState(previousState => {
        return {
          messages: GiftedChat.append(previousState.messages, message)
        };
      });
    });
  }

  componentWillUnmount() {
    Backend.closeChat();
  }
}

Chat.defaultProps = {
  user: "Jon Snow"
};

Chat.propTypes = {
  user: PropTypes.string
};

export default Chat;
