import { Avatar, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import "./Chat.css";
import { useParams } from "react-router-dom";
import db from "./Firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import InputEmoji from "react-input-emoji";

function Chat() {
  const { roomId } = useParams();
  const [randomPic, setRandomPic] = useState("");
  useEffect(() => {
    setRandomPic(Math.floor(Math.random() * 10000));
  }, [roomId]);

  const [input, setInput] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  //inserting emoji
  const [text, setText] = useState("");
  function handleOnEnter(text) {
    console.log("enter", text);
  }

  // const insertEmoji = () => {};
  const sendMessage = (event) => {
    event.preventDefault();
    if (input) {
      db.collection("rooms").doc(roomId).collection("messages").add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    setInput("");
  };

  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar
          src={`https://avatars.dicebear.com/api/personas/${randomPic}.svg`}
        />
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p
            className={`chat_message ${message.name === user.displayName && "chat_receiver"
              }`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <IconButton>
          <InsertEmoticonOutlinedIcon />
        </IconButton>

        <form>
          <input
            onChange={handleChange}
            value={input}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            <IconButton>
              <SendIcon />
            </IconButton>
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
