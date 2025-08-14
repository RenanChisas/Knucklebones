import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Dices } from "../Dices";
import { TablesOnline } from "../TablesOnline";

import { ModalEndAnimationOnline } from "../modalEndAnimationOnline";

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
import type { Socket } from "socket.io-client";
import { FaDiceD6 } from "react-icons/fa";

type PlayOnlineProps = {
  CharactersChoosePlayer1: string[];
  CharactersChoosePlayer2: string[];
  socket: Socket | null;
  room: string;
};

export function PlayOnline({
  CharactersChoosePlayer1,
  CharactersChoosePlayer2,
  socket,
  room,
}: PlayOnlineProps) {
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
    img: "cat1",
  });
  const [playerPoints, setplayerPoints] = useState([0, 0]);

  const [dice, setDice] = useState(1);
  const [watchPlayer, setwatchPlayer] = useState(true);
  const [playerWins, setlayerWins] = useState("");

  socket?.on("end-game", (win) => {
    setTimeout(() => {
      setEnd(true);
      console.log(win);

      setlayerWins(win);
    }, 100);
  });

  useEffect(() => {
    setPlayer1({
      id: CharactersChoosePlayer1[0],
      name: CharactersChoosePlayer1[1],
      img: CharactersChoosePlayer1[2],
    });
    setPlayer2({
      id: CharactersChoosePlayer2[0],
      name: CharactersChoosePlayer2[1],
      img: CharactersChoosePlayer2[2],
    });
  }, []);

  socket?.on("receive-dice", (dice) => {
    setrollEnd(true);
    setDice(dice);
  });

  socket?.on("receive-turn", (data) => {
    if (data[0][0].includes(Player1.id)) {
      setwatchPlayer(true);
      setPlayerDice(data[1]);
    } else {
      setwatchPlayer(false);
      setPlayerDice(!data[1]);
    }
  });

  socket?.on("receive-points", (points) => {
    if (watchPlayer) {
      setplayerPoints(points);
    } else {
      setplayerPoints([points[1], points[0]]);
    }
  });

  socket?.on("receiveinfo-table", (data) => {
    if (data[0][0].includes(Player1.id)) {
      settabPLayer1(data[1][0]);
      settabPLayer2(data[1][1]);
    } else {
      settabPLayer1(data[1][1]);
      settabPLayer2(data[1][0]);
    }
  });

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
          <TablesOnline
            click={false}
            rollEnd={rollEnd}
            watchPlayer={watchPlayer}
            socket={socket}
            room={room}
            turn={playerDice && rollEnd}
            tabPLayer={tabPLayer2}
            playerChoose={false}
            color={false}
            playerLocal={true}
            dice={dice}
            player={Player2.id}
          />

          <TablesOnline
            click={true}
            rollEnd={rollEnd}
            watchPlayer={watchPlayer}
            socket={socket}
            room={room}
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
        <ModalEndAnimationOnline NameWin={playerWins} points={playerPoints} />
      ) : (
        ""
      )}
    </>
  );
}
