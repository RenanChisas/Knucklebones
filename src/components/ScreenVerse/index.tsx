import { useState } from "react";
import styles from "./styles.module.css";

import { SelectCharacter } from "../SelectCharacter";
import { useNavigate } from "react-router-dom";

import { playersDB } from "../../db/dbusers";
import { FaArrowAltCircleLeft } from "react-icons/fa";

type ScreenVerseProps = {
  isbot: boolean;
};

export function ScreenVerse({ isbot }: ScreenVerseProps) {
  const navigate = useNavigate();
  const [CharactersChoosePlayer1, setCharactersChoosePlayer1] = useState([
    "",
    "",
    "",
  ]);
  const [CharactersChoosePlayer2, setCharactersChoosePlayer2] = useState([
    "",
    "",
    "",
  ]);

  const playLocal = () => {
    if (
      CharactersChoosePlayer1[1].length > 0 &&
      CharactersChoosePlayer2[1].length > 0
    ) {
      playersDB.saveAll([CharactersChoosePlayer1, CharactersChoosePlayer2]);

      navigate(`/playLocal`);
    } else {
      alert("put your name");
    }
  };

  const playAI = () => {
    if (
      CharactersChoosePlayer1[1].length > 0 &&
      CharactersChoosePlayer2[1].length > 0
    ) {
      playersDB.saveAll([CharactersChoosePlayer1, CharactersChoosePlayer2]);

      navigate(`/playai`);
    } else {
      alert("put your name");
    }
  };

  const GoHome = () => {
    navigate(`/`);
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.player1}>
          <div className={styles.selectcharacter}>
            <SelectCharacter
              playerid={"0"}
              online={false}
              isbotInput={false}
              setCharactersChoose={setCharactersChoosePlayer1}
            />
          </div>
        </div>
        <div className={styles.mid}>
          <h1>VS</h1>
        </div>

        <div className={styles.player1}>
          <div className={styles.selectcharacter}>
            <SelectCharacter
              playerid={"1"}
              setCharactersChoose={setCharactersChoosePlayer2}
              isbotInput={isbot}
            />
          </div>
        </div>
      </div>
      <div className={styles.start}>
        {isbot ? (
          <button onClick={playAI}>START</button>
        ) : (
          <button onClick={playLocal}>START</button>
        )}
      </div>
      <div className={styles.quit}>
        <button onClick={GoHome}>
          {" "}
          <FaArrowAltCircleLeft />
          <h3>MENU</h3>
        </button>
      </div>
    </div>
  );
}
