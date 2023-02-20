import React, { useState, useEffect } from 'react';
import './Chat.css';
import client from '../Api'
import io from "socket.io-client";

function Chat(props) {
  const [chat, setChat] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [readyForRender, setReadyForRender] = useState(false);
  const [connectedState, setConnectedState] = useState(false);
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    client.get(props.id).then((response) => {
      let chatHistory = response.data.history;
      setChat(chatHistory);
    });
    setReadyForRender(true);
  }, [props.id]);
  useEffect(() => {
    const newSocket = io.connect(process.env.REACT_APP_GPT_URL) 
    setSocket(newSocket)
    setConnectedState(true)
  }, [])

  useEffect(() => {
    if(connectedState) {
      socket.on("response", (data) => {
        setChat([...chat, data]);
      })
    }
  }, [socket, chat, connectedState])

  const handleSubmit = (event) => {
    event.preventDefault();
    setNewMessage(newMessage.trim())
    if(socket == null){
      alert("socket is null")
      return
    }
    if(newMessage) {
      const newMessageData = {message: newMessage, sender: 'human'}
      setChat([...chat, newMessageData]);
      newMessageData.topicId = props.id;
      socket.emit("message", newMessageData)
      setNewMessage('');
    }
  };

  const handleChange = (event) => {
    setNewMessage(event.target.value);
  };

  if(readyForRender) {
    return (
      <div className="chat-container">
        <div className="chat-messages">
          {chat.map((chatContent, index) => (
            <div key={index} className={`chat-bubble ${chatContent.sender}`}>
              {chatContent.message}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newMessage}
            onChange={handleChange}
            className="chat-input"
            placeholder="Type your message..."
          />
          <button type="submit" className="chat-submit">
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default Chat;