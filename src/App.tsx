import "./App.css";
import { Home } from "./components/Home";

import { NotFound } from "./components/NotFound";
import { Route, Routes } from "react-router-dom";

import { PlayAI } from "./components/PlayAI";
import { PlayLocal } from "./components/PlayLocal";
import { ScreenVerse } from "./components/ScreenVerse";
import { useState } from "react";

function App() {
  const [bot, setbot] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Home setbot={setbot} />} />
      <Route path="/playai" element={<PlayAI />} />
      <Route path="/playLocal" element={<PlayLocal />} />
      <Route path="/SelectCharacter" element={<ScreenVerse isbot={bot} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
