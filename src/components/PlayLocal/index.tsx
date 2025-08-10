import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Dices } from "../Dices";
import { FaArrowAltCircleLeft, FaDiceD6, FaCircleNotch } from "react-icons/fa";
import { Tables } from "../Tables";

import dicerollSound from "/sounds/diceroll.wav";
import endSound from "/sounds/end.wav";

import { knuckbones } from "../../game/knucklebones";

import { ModalEndAnimation } from "../modalEndAnimation";
import { playersDB } from "../../db/dbusers";

const playerVariants = {
  active: {
    scale: 1, // normal size
    opacity: 1, // full opacity
    transition: { duration: 0.3 },
  },
  inactive: {
    scale: 0.9, // smaller
    opacity: 0.5, // half transparent
    transition: { duration: 0.3 },
  },
};

import { WaveText } from "../waveText";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function PlayLocal() {
  const navigate = useNavigate();
  const [tabPLayer1, settabPLayer1] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [tabPLayer2, settabPLayer2] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [playerDice, setPlayerDice] = useState(false);
  const [rollEnd, setrollEnd] = useState(false);
  const [end, setEnd] = useState(false);
  const [Player1, setPlayer1] = useState({
    id: "0",
    name: "oChisas",
    img: "cat1",
  });
  const [Player2, setPlayer2] = useState({
    id: "1",
    name: "oChisasEvil",
    img: "cat2",
  });
  const [playerPoints, setplayerPoints] = useState([0, 0]);

  const [game] = useState(() => new knuckbones([Player1.id, Player2.id]));

  const [dice, setDice] = useState<number>(1);

  const [playerWins, setlayerWins] = useState("");
  const players = playersDB.getAll();

  const endGameFunction = () => {
    setTimeout(() => {
      const endGame = game.endGame();
      if (endGame) {
        setEnd(endGame);
        new Audio(endSound).play();
      } else {
        randomDice();
      }
    }, 100);
  };

  useEffect(() => {
    const randomTurn = Math.random().toFixed();
    const turn = randomTurn == "1" ? true : false;
    setPlayerDice(turn);
    game.setTurn(turn);
    setPlayer1({
      id: players[0][0],
      name: players[0][1],
      img: players[0][2],
    });
    setPlayer2({
      id: players[1][0],
      name: players[1][1],
      img: players[1][2],
    });
  }, []);

  useEffect(() => {
    if (playerPoints[0] > playerPoints[1]) {
      setlayerWins(Player1.name);
    } else {
      setlayerWins(Player2.name);
    }
  }, [playerPoints]);

  useEffect(() => {
    const playersTable = game.getTable();
    settabPLayer1(playersTable[0]);
    settabPLayer2(playersTable[1]);
    const pointsAUX = game.getPoints();
    setplayerPoints(pointsAUX);

    endGameFunction();
  }, [playerDice]);

  const addDice = (line: 0 | 1 | 2, dice: number, player: string) => {
    const turn = game.addDice(line, dice, player);
    if (turn != null) {
      setPlayerDice(turn);
    }
  };

  const playAudioDice = () => {
    const audio = new Audio(dicerollSound);
    audio.play();
    audio.play().catch(() => {});
  };

  const randomDice = () => {
    let count = 0;
    playAudioDice();
    const roll = () => {
      const numberDice = Math.floor(Math.random() * 6) + 1;
      setDice(numberDice);
      count++;

      if (count < 5) {
        setTimeout(roll, 100);
        setrollEnd(false);
      } else {
        setrollEnd(true);
        return;
      }
    };

    roll();
  };
  const reloadPage = () => {
    window.location.reload();
  };

  const GoHome = () => {
    navigate(`/`);
  };
  const getRandomPosition = () => ({
    x: Math.random() * 50 - 25,
    y: Math.random() * 50 - 25,
  });

  return (
    <>
      <div className={styles.playHome}>
        <motion.div
          variants={playerVariants}
          animate={playerDice ? "inactive" : "active"}
          className={styles.player1}
        >
          <div className={styles.image}>
            <img src={`/players/${Player1.img}.png`} alt="" />
          </div>
          <div className={styles.nameplayer}>
            <h3>
              {" "}
              <WaveText on={!playerDice} text={Player1.name} />
            </h3>
          </div>
          <div className={styles.nameplayer}>
            <h3> {playerPoints[0]}</h3>
          </div>
          <div className={styles.box}>
            {!playerDice ? (
              <motion.div
                className={styles.dices}
                animate={rollEnd ? getRandomPosition() : { x: 0, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Dices number={dice} />
              </motion.div>
            ) : (
              <div style={{ fontSize: "5rem" }}>
                <FaDiceD6 />
              </div>
            )}
          </div>
        </motion.div>
        <div className={styles.mid}>
          <Tables
            table={game}
            addDice={addDice}
            turn={playerDice && rollEnd}
            tabPLayer={tabPLayer2}
            playerChoose={true}
            playerLocal={true}
            color={false}
            dice={dice}
            player={Player2.id}
          />

          <Tables
            table={game}
            addDice={addDice}
            turn={!playerDice && rollEnd}
            tabPLayer={tabPLayer1}
            playerChoose={true}
            color={true}
            playerLocal={false}
            dice={dice}
            player={Player1.id}
          />
        </div>
        <motion.div
          variants={playerVariants}
          animate={!playerDice ? "inactive" : "active"}
          className={styles.player2}
        >
          <div className={styles.box}>
            {playerDice ? (
              <motion.div
                className={styles.dices}
                animate={rollEnd ? getRandomPosition() : { x: 0, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Dices number={dice} />
              </motion.div>
            ) : (
              <div style={{ fontSize: "5rem" }}>
                <FaDiceD6 />
              </div>
            )}
          </div>
          <div className={styles.image}>
            <img src={`/players/${Player2.img}.png`} alt="" />
          </div>
          <div className={styles.nameplayer}>
            <h3>
              {" "}
              <WaveText on={playerDice} text={Player2.name} />
            </h3>
          </div>
          <div className={styles.nameplayer}>
            <h3> {playerPoints[1]}</h3>
          </div>
        </motion.div>
      </div>

      {end ? (
        <ModalEndAnimation NameWin={playerWins} points={playerPoints} />
      ) : (
        ""
      )}
      <div className={styles.quit}>
        <button onClick={GoHome}>
          {" "}
          <FaArrowAltCircleLeft />
          <h3>MENU</h3>
        </button>
        <button onClick={reloadPage}>
          {" "}
          <FaCircleNotch />
          <h3>RESTART </h3>
        </button>
      </div>
    </>
  );
}
