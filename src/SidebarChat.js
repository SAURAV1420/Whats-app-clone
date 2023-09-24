import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./SidebarChat.css";
import db from "./Firebase";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function SidebarChat({ id, name, addNewChat }) {
  const [randomPic, setRandomPic] = useState("");
  const [messages, setMessages] = useState("");
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setRandomPic(Math.floor(Math.random() * 10000));
  }, []);

  const createChat = () => {
    const roomName = prompt(
      "Enter new name(Max. 15 Char) to create new Chat room"
    );

    if (roomName && roomName.length < 15) {
      // email validation and adding new chats
      if (user.email === "bhavesh953475@gmail.com") {
        db.collection("rooms").add({
          name: roomName,
        });
      } else {
        alert("You are not aurthorised to create new chat.");
      }
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar
          src={`https://avatars.dicebear.com/api/personas/${randomPic}.svg`}
        />
        <div className="sidebarChat_info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new chat</h2>
    </div>
  );
}

export default SidebarChat;
