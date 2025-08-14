import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import type { Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

type RoomsProps = {
  roomId: string;
  knucklebones: {
    table: number[][][];
    points: number[];
    players: [string, string, string][];
    turn: boolean;
    dice: number;
  };
  free: boolean;
};

type SelectCharacterProps = {
  isbotInput: boolean;
  setCharactersChoose: (value: string[]) => void;
  playerid: string;
  online?: boolean;
  id?: string | null;
  socket?: Socket | null;
  wait?: boolean;
  rooms?: RoomsProps[];
  characterChoose?: string[] | null;
};

export function SelectCharacter({
  isbotInput,
  setCharactersChoose,
  playerid,
  online = false,
  socket = null,
  wait = false,
  id = null,
  characterChoose = null,
  rooms = [],
}: SelectCharacterProps) {
  const navigate = useNavigate();
  const [SelectCharacter, setSelectCharacter] = useState<string>("cat");
  const [character, setCharacter] = useState<string[]>(["cat", "cow", "dog"]);
  const [inputName, setInputName] = useState<string>("");

  const [levelBot, setLevelBot] = useState<number>(0);

  const bot = ["bot", "bot", "bot"];
  const LevelText = ["EASY", "MEDIUM", "HARD"];

  const ChooseBotOrCharacter = (characterAUX: string) => {
    setCharactersChoose([playerid, inputName, characterAUX]);
  };

  const selectCharacterFunction = (character: string) => {
    ChooseBotOrCharacter(character);
    setSelectCharacter(character);
  };

  useEffect(() => {
    const nameBot = `oChisas(${LevelText[levelBot]})`;
    if (isbotInput) {
      setInputName(nameBot);
      setCharactersChoose([playerid, nameBot, SelectCharacter]);
    }
  }, [levelBot]);

  useEffect(() => {
    if (isbotInput) {
      const nameBot = `oChisas(${LevelText[levelBot]})`;
      setCharacter(bot);
      selectCharacterFunction(bot[0]);
      setCharactersChoose([playerid, nameBot, SelectCharacter]);
    } else {
      if (wait && characterChoose) {
        const name = characterChoose[1];
        const img = characterChoose[2];
        const index = character.indexOf(img);
        setLevelBot(index);
        setInputName(name);
        setSelectCharacter(img);
      } else {
        selectCharacterFunction(character[0]);
      }
    }
  }, []);

  useEffect(() => {
    if (wait && characterChoose) {
      const name = characterChoose[1];
      const img = characterChoose[2];
      const index = character.indexOf(img);
      setLevelBot(index);
      setInputName(name);
      setSelectCharacter(img);
    }
  }, [characterChoose]);

  useEffect(() => {}, [levelBot]);

  const inputFunction = (event: { target: { value: string } }) => {
    if (event.target.value.length < 20) {
      setInputName(event.target.value);
      setCharactersChoose([playerid, event.target.value, SelectCharacter]);
    }
  };
  const playOnline = () => {
    if (inputName.length > 0) {
      let idAUX = "";
      if (id) {
        idAUX = id;
      } else {
        if (rooms.length > 0) {
          idAUX = rooms[0]?.roomId;
        } else {
          idAUX = uuidv4();
        }
      }

      if (socket) {
        socket.emit("join-room", idAUX, [playerid, inputName, SelectCharacter]);
        navigate(`/Online/${idAUX}`);
      }
    } else {
      alert("put your name");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.characterimg}>
        <div>
          <img src={`/players/${SelectCharacter}BG.png`} alt="" />
        </div>
        <div>
          {isbotInput ? <p>{LevelText[levelBot]}</p> : <p>{SelectCharacter}</p>}
        </div>
      </div>
      <div className={styles.characterselect}>
        {character.map((character, index) => (
          <div
            key={index}
            className={`${index == levelBot ? styles.active : ""}`}
          >
            <button
              onClick={() => {
                if (!wait) {
                  setLevelBot(index);
                  selectCharacterFunction(character);
                }
              }}
            >
              <img src={`/players/${character}.png`} alt="" />
              {isbotInput ? <p>{LevelText[index]}</p> : <p>{character}</p>}
            </button>
          </div>
        ))}
      </div>
      <div className={styles.input}>
        {isbotInput || wait ? (
          <input
            type="text"
            value={inputName}
            placeholder="Choose your name"
            disabled={true}
          />
        ) : (
          <input
            type="text"
            placeholder="Choose your name"
            value={inputName}
            onChange={inputFunction}
          />
        )}
      </div>
      {online ? (
        <div className={styles.start}>
          <button onClick={playOnline}>START</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
