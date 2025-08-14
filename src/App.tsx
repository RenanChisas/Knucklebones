import "./App.css";
import { Home } from "./components/Home";

import { NotFound } from "./components/NotFound";
import { Route, Routes } from "react-router-dom";

import { PlayAI } from "./components/PlayAI";
import { PlayLocal } from "./components/PlayLocal";
import { ScreenVerse } from "./components/ScreenVerse";
import { useEffect, useRef, useState } from "react";
import { ScreenVerseOnline } from "./components/ScreenVerseOnline";

import type { Socket } from "socket.io-client";
import { OnlineControler } from "./components/OnlineController";

function App() {
  const [bot, setbot] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetch(`${url}/statusSocket`)
      .then((res) => res.json())
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching status:", err);
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home setbot={setbot} loading={loading} />} />
      <Route path="/playai" element={<PlayAI />} />
      <Route path="/playLocal" element={<PlayLocal />} />
      <Route path="/SelectCharacter" element={<ScreenVerse isbot={bot} />} />

      {loading ? (
        ""
      ) : (
        <>
          <Route
            path="/Online"
            element={<ScreenVerseOnline socketRef={socketRef} />}
          />
          <Route
            path="/Online/:id"
            element={<OnlineControler socketRef={socketRef} />}
          />
        </>
      )}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
