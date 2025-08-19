import { useEffect, useState } from "react";
import styles from "./styles.module.css";

import { SelectCharacter } from "../SelectCharacter";
import { useNavigate } from "react-router-dom";

import { FaArrowAltCircleLeft } from "react-icons/fa";
import { io, Socket } from "socket.io-client";

type ScreenVerseOnlineProps = {
  socketRef: React.RefObject<Socket | null>;
};

export function ScreenVerseOnline({ socketRef }: ScreenVerseOnlineProps) {
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  if (!socketRef.current) {
    const url = import.meta.env.VITE_BASE_URL;
    socketRef.current = io(url);
  }
  const socket = socketRef.current;

  const navigate = useNavigate();
  const [, setCharactersChoosePlayer1] = useState(["", "", ""]);

  const [rooms, setRooms] = useState([]);
  socket?.on("receive-listroom", (data) => {
    setRooms(data);
  });

  useEffect(() => {
    socket?.emit("request-listroom");
  }, []);

  const GoHome = () => {
    socket?.disconnect();
    navigate(`/`);
    window.location.reload();
  };

  return (
    <div className={styles.main}>
      <div className={!id ? styles.container : styles.containerId}>
        <div className={styles.player1}>
          <div className={styles.selectcharacter}>
            <SelectCharacter
              rooms={rooms}
              id={id ? id : ""}
              playerid={socket.id ?? ""}
              socket={socket}
              online={true}
              isbotInput={false}
              setCharactersChoose={setCharactersChoosePlayer1}
            />
          </div>
        </div>
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
