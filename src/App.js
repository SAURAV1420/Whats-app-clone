import React, { useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route
              path="/rooms/:roomId"
              element={
                // <>
                <Chat />
                // </>
              }
            />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
