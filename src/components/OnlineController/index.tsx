import { useEffect, useState } from "react";
import { ScreenVerseOnlineWait } from "../ScreenVerseOnlineWait";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

import { Disconnect } from "../Disconnect";
import { FaArrowAltCircleLeft } from "react-icons/fa";

import { NotFound } from "../NotFound";
import { PlayOnline } from "../PlayOnline";
import type { Socket } from "socket.io-client";

type OnlineControlerProps = {
  socketRef: React.RefObject<Socket | null>;
};
export function OnlineControler({ socketRef }: OnlineControlerProps) {
  const navigate = useNavigate();
  const socket = socketRef.current;
  const location = useLocation();
  const path = location.pathname;
  const segments = path.split("/").filter(Boolean);
  const room = segments.length > 0 ? segments[segments.length - 1] : null;

  const [CharactersChoosePlayer1, setCharactersChoosePlayer1] = useState<
    string[] | undefined
  >(undefined);
  const [CharactersChoosePlayer2, setCharactersChoosePlayer2] = useState<
    string[] | undefined
  >(undefined);

  const [fullroom, setFullromm] = useState(true);
  const [start, setstart] = useState(false);
  const [quit, setquit] = useState(false);
  const [quitName, setquitName] = useState("");

  socket?.on("receive-disconnect", (id: string) => {
    if (CharactersChoosePlayer1?.includes(id)) {
      setquitName(CharactersChoosePlayer1[1]);
    } else if (CharactersChoosePlayer2?.includes(id)) {
      setquitName(CharactersChoosePlayer2[1]);
    }

    setquit(true);
  });
  useEffect(() => {
    if (!socket) return;

    const handlePlayers = (players: string[][]) => {
      setFullromm(false);
      const me = players.find((player) => player[0] === socket.id);
      const other = players.find((player) => player[0] !== socket.id);
      let count = 0;
      if (me) {
        setCharactersChoosePlayer1(me);
        count++;
      }

      if (other) {
        setCharactersChoosePlayer2(other);
        count++;
      }

      if (count === 2) {
        setTimeout(() => {
          setstart(true);
        }, 3000);
      }
    };

    socket.on("receiveinfo-players", handlePlayers);

    socket.on("room-full", () => {
      setFullromm(true);
    });

    return () => {
      socket.off("receiveinfo-players", handlePlayers); // cleanup when component unmounts
    };
  }, [socket]);

  const GoHome = () => {
    socket?.disconnect();
    navigate(`/`);
    window.location.reload();
  };

  return (
    <>
      {fullroom ? (
        <NotFound />
      ) : (
        <>
          {start ? (
            <PlayOnline
              room={room ?? ""}
              socket={socket}
              CharactersChoosePlayer1={CharactersChoosePlayer1 ?? []}
              CharactersChoosePlayer2={CharactersChoosePlayer2 ?? []}
            />
          ) : (
            <ScreenVerseOnlineWait
              CharactersChoosePlayer1={CharactersChoosePlayer1}
              CharactersChoosePlayer2={CharactersChoosePlayer2}
              setCharactersChoosePlayer1={setCharactersChoosePlayer1}
              setCharactersChoosePlayer2={setCharactersChoosePlayer2}
            />
          )}
          <div className={styles.quit}>
            <button onClick={GoHome}>
              {" "}
              <FaArrowAltCircleLeft />
              <h3>MENU</h3>
            </button>
          </div>
        </>
      )}

      {quit ? <Disconnect socket={socket} NameWin={quitName} /> : ""}
    </>
  );
}
