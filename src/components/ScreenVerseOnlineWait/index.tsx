import styles from "./styles.module.css";

import { SelectCharacter } from "../SelectCharacter";

import { SelectCharacterNull } from "../SelectCharacterNull";

type ScreenVerseOnlineWaitProps = {
  CharactersChoosePlayer1: string[] | undefined;
  setCharactersChoosePlayer1: (chars: string[] | undefined) => void;
  CharactersChoosePlayer2: string[] | undefined;
  setCharactersChoosePlayer2: (chars: string[] | undefined) => void;
};

export function ScreenVerseOnlineWait({
  CharactersChoosePlayer1,
  setCharactersChoosePlayer1,
  CharactersChoosePlayer2,
  setCharactersChoosePlayer2,
}: ScreenVerseOnlineWaitProps) {
  return (
    <div className={styles.main}>
      <>
        <div className={styles.container}>
          <div className={styles.player1}>
            <div className={styles.selectcharacter}>
              <SelectCharacter
                characterChoose={CharactersChoosePlayer1}
                wait={true}
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
              {CharactersChoosePlayer2 ? (
                <SelectCharacter
                  characterChoose={CharactersChoosePlayer2}
                  wait={true}
                  playerid={"1"}
                  setCharactersChoose={setCharactersChoosePlayer2}
                  isbotInput={false}
                />
              ) : (
                <SelectCharacterNull />
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
