import { useEffect, useState } from "react";
import { Dices } from "../Dices";
import styles from "./styles.module.css";

import type { Socket } from "socket.io-client";
type SumItem = {
  sumReturn: number;
  isZero: boolean;
};

type TablesProps = {
  tabPLayer: number[];
  playerChoose: boolean;
  dice: number;
  player: string;
  playerLocal: boolean;
  color: boolean;
  turn: boolean;
  room: string;
  socket: Socket | null;
  watchPlayer: boolean;
  rollEnd: boolean;
  click: boolean;
};

export function TablesOnline({
  tabPLayer,
  playerChoose,
  dice,
  player,
  playerLocal,
  color,
  turn,
  room,
  socket,
  watchPlayer,
  rollEnd,
  click,
}: TablesProps) {
  const [sum, setSum] = useState<SumItem[]>([
    { sumReturn: 0, isZero: true },
    { sumReturn: 0, isZero: true },
    { sumReturn: 0, isZero: true },
    { sumReturn: 0, isZero: true },
    { sumReturn: 0, isZero: true },
    { sumReturn: 0, isZero: true },
  ]);
  const [tablesColor, settablesColor] = useState([
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  ]);

  const colorNumber = color ? 0 : 1;

  const canClick = (number1: number, number2: number) => {
    return (
      turn &&
      ((sum[number1].isZero && !playerLocal) ||
        (sum[number2].isZero && playerLocal))
    );
  };

  const ChooseLine = (number: 0 | 1 | 2) => {
    if (click) {
      if (rollEnd) {
        socket?.emit("adddice-room", room, number, dice, player);
      }
    }
  };

  const updateColors = (table: number[][][]) => {
    const tableAUX = table;
    const tableColorAUX = [
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    ];
    tableAUX[0].map((line, index) => {
      const indexes = line
        .map((v, i) =>
          v !== 0 && line.indexOf(v) !== line.lastIndexOf(v) ? i : -1
        )
        .filter((i) => i !== -1);
      if (indexes.length === 2) {
        tableColorAUX[0][index][indexes[0]] = 1;
        tableColorAUX[0][index][indexes[1]] = 1;
      } else if (indexes.length === 3) {
        tableColorAUX[0][index][indexes[0]] = 2;
        tableColorAUX[0][index][indexes[1]] = 2;
        tableColorAUX[0][index][indexes[2]] = 2;
      }
    });
    tableAUX[1].map((line, index) => {
      const indexes = line
        .map((v, i) =>
          v !== 0 && line.indexOf(v) !== line.lastIndexOf(v) ? i : -1
        )
        .filter((i) => i !== -1);
      if (indexes.length === 2) {
        tableColorAUX[1][index][indexes[0]] = 1;
        tableColorAUX[1][index][indexes[1]] = 1;
      } else if (indexes.length === 3) {
        tableColorAUX[1][index][indexes[0]] = 2;
        tableColorAUX[1][index][indexes[1]] = 2;
        tableColorAUX[1][index][indexes[2]] = 2;
      }
    });
    settablesColor(tableColorAUX);
  };

  socket?.on("receive-sumtable", (data) => {
    const sumAux = data;
    const sumReturn = sumAux.sumReturn;
    const tableReturn = sumAux.tableReturn;
    console.log(sumReturn, "sumReturn");
    console.log(tableReturn, "tableReturn");
    if (watchPlayer) {
      updateColors(sumAux.tableReturn);
      setSum(sumAux.sumReturn);
    } else {
      updateColors([tableReturn[1], tableReturn[0]]);
      setSum([
        sumReturn[3],
        sumReturn[4],
        sumReturn[5],
        sumReturn[0],
        sumReturn[1],
        sumReturn[2],
      ]);
    }
  });

  useEffect(() => {
    socket?.emit("getsumtable-room", room);
  }, []);

  return (
    <div
      className={`${styles.tabPlayer1} ${
        playerChoose && turn ? styles.hover : ""
      }`}
    >
      <div
        className={`${styles.label} ${
          ((!sum[0].isZero && !playerLocal) ||
            (!sum[3].isZero && playerLocal)) &&
          turn &&
          playerChoose
            ? styles.hoverSelect
            : ""
        }`}
      >
        {!playerLocal ? <p>{sum[0].sumReturn}</p> : ""}
        <button
          disabled={!playerChoose}
          onClick={canClick(0, 3) ? () => ChooseLine(0) : undefined}
          className={styles.tabLine}
        >
          <div className={styles.tab}>
            <div className={styles.tabchoose}>
              <div
                className={`${styles.dices} ${
                  styles[`color${tablesColor[colorNumber][0][0]}`]
                }`}
              >
                <Dices number={tabPLayer[0]} />
              </div>
            </div>
            <div className={styles.tabchoose}>
              <div
                className={`${styles.dices} ${
                  styles[`color${tablesColor[colorNumber][0][1]}`]
                }`}
              >
                <Dices number={tabPLayer[3]} />
              </div>
            </div>
            <div className={styles.tabchoose}>
              <div
                className={`${styles.dices} ${
                  styles[`color${tablesColor[colorNumber][0][2]}`]
                }`}
              >
                <Dices number={tabPLayer[6]} />
              </div>
            </div>
          </div>
        </button>
        {playerLocal ? <p>{sum[3].sumReturn}</p> : ""}
      </div>
      <div
        className={`${styles.label} ${
          ((!sum[1].isZero && !playerLocal) ||
            (!sum[4].isZero && playerLocal)) &&
          turn &&
          playerChoose
            ? styles.hoverSelect
            : ""
        }`}
      >
        {!playerLocal ? <p>{sum[1].sumReturn}</p> : ""}
        <button
          disabled={!playerChoose}
          onClick={canClick(1, 4) ? () => ChooseLine(1) : undefined}
          className={styles.tabLine}
        >
          <div className={styles.tab}>
            <div className={styles.tabchoose}>
              <div
                className={`${styles.dices} ${
                  styles[`color${tablesColor[colorNumber][1][0]}`]
                }`}
              >
                <Dices number={tabPLayer[1]} />
              </div>
            </div>
            <div className={styles.tabchoose}>
              <div
                className={`${styles.dices} ${
                  styles[`color${tablesColor[colorNumber][1][1]}`]
                }`}
              >
                <Dices number={tabPLayer[4]} />
              </div>
            </div>
            <div className={styles.tabchoose}>
              <div
                className={`${styles.dices} ${
                  styles[`color${tablesColor[colorNumber][1][2]}`]
                }`}
              >
                <Dices number={tabPLayer[7]} />
              </div>
            </div>
          </div>
        </button>
        {playerLocal ? <p>{sum[4].sumReturn}</p> : ""}
      </div>
      <div
        className={`${styles.label} ${
          ((!sum[2].isZero && !playerLocal) ||
            (!sum[5].isZero && playerLocal)) &&
          turn &&
          playerChoose
            ? styles.hoverSelect
            : ""
        }`}
      >
        {!playerLocal ? <p>{sum[2].sumReturn}</p> : ""}
        <button
          disabled={!playerChoose}
          onClick={canClick(2, 5) ? () => ChooseLine(2) : undefined}
          className={styles.tabLine}
        >
          <div className={styles.tab}>
            <div className={styles.tabchoose}>
              <div
                className={`${styles.dices} ${
                  styles[`color${tablesColor[colorNumber][2][0]}`]
                }`}
              >
                <Dices number={tabPLayer[2]} />
              </div>
            </div>
            <div className={styles.tabchoose}>
              <div
                className={`${styles.dices} ${
                  styles[`color${tablesColor[colorNumber][2][1]}`]
                }`}
              >
                <Dices number={tabPLayer[5]} />
              </div>
            </div>
            <div className={styles.tabchoose}>
              <div
                className={`${styles.dices} ${
                  styles[`color${tablesColor[colorNumber][2][2]}`]
                }`}
              >
                <Dices number={tabPLayer[8]} />
              </div>
            </div>
          </div>
        </button>
        {playerLocal ? <p>{sum[5].sumReturn}</p> : ""}
      </div>
    </div>
  );
}
