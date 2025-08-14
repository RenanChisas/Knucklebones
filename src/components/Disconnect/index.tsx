import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Leftdrop } from "../Leftdrop"; // adjust path as needed
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { WaveText } from "../waveText";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import type { Socket } from "socket.io-client";

const dropIn: Variants = {
  hidden: {
    x: "-100vw", // start off-screen to the left
    opacity: 0,
  },
  visible: {
    x: "0",
    opacity: 1,
    transition: {
      duration: 0.3,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    x: "-100vw", // slide back left on exit
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

type DisconnectProps = {
  NameWin: string;
  socket: Socket | null;
};

export function Disconnect({ NameWin, socket }: DisconnectProps) {
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  const GoHome = () => {
    socket?.disconnect();
    navigate(`/`);
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Leftdrop onClick={() => setIsOpen(true)}>
          <motion.div
            className={styles.modalContainer}
            onClick={(e) => e.stopPropagation()}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.body}>
              <div className={styles.text}>
                <h2>
                  <WaveText on={true} text={`THE`} />
                </h2>
                <h2>
                  <WaveText on={true} text={`${NameWin}`} />
                </h2>
                <h2>
                  <WaveText on={true} text={`QUIT`} />
                </h2>
                <h2>
                  <WaveText on={true} text={`THE`} />
                </h2>
                <h2>
                  <WaveText on={true} text={`GAME`} />
                </h2>
              </div>
            </div>
            <div className={styles.footer}>
              <button className={styles.clButton} onClick={GoHome}>
                <FaArrowAltCircleLeft />
                <h3>MENU</h3>
              </button>
            </div>
          </motion.div>
        </Leftdrop>
      )}
    </AnimatePresence>
  );
}
