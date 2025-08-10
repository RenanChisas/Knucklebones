import { useEffect, useState } from "react";
import styles from "./styles.module.css";

type SelectCharacterProps = {
  isbotInput: boolean;
  setCharactersChoose: (value: string[]) => void;
  playerid: string;
  online?: boolean;
};

export function SelectCharacter({
  isbotInput,
  setCharactersChoose,
  playerid,
  online = false,
}: SelectCharacterProps) {
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
      selectCharacterFunction(character[0]);
    }
  }, []);

  useEffect(() => {}, [levelBot]);

  const inputFunction = (event: { target: { value: string } }) => {
    if (event.target.value.length < 20) {
      setInputName(event.target.value);
      setCharactersChoose([playerid, event.target.value, SelectCharacter]);
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
                setLevelBot(index);
                selectCharacterFunction(character);
              }}
            >
              <img src={`/players/${character}.png`} alt="" />
              {isbotInput ? <p>{LevelText[index]}</p> : <p>{character}</p>}
            </button>
          </div>
        ))}
      </div>
      <div className={styles.input}>
        {isbotInput ? (
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
          <button>START</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
