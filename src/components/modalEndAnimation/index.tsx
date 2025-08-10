// ModalEndAnimation.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Leftdrop } from "../Leftdrop"; // adjust path as needed
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { WaveText } from "../waveText";
import { FaArrowAltCircleLeft, FaCircleNotch } from "react-icons/fa";

type infoProps = {
  NameWin: string;
  points: number[];
};

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

export function ModalEndAnimation({ NameWin, points }: infoProps) {
  const [isOpen, setIsOpen] = useState(true);

  const [pointsText, setpointsText] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (points[0] > points[1]) {
      setpointsText([points[0], points[1]]);
    } else {
      setpointsText([points[1], points[0]]);
    }
  }, []);

  const reloadPage = () => {
    window.location.reload();
  };

  const GoHome = () => {
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
                  <WaveText on={true} text={`${NameWin}`} />
                </h2>
                <h2>
                  <WaveText on={true} text={` WINS`} />
                </h2>
                <h2>
                  <WaveText
                    on={true}
                    text={`${pointsText[0]} - ${pointsText[1]}`}
                  />
                </h2>
              </div>
            </div>
            <div className={styles.footer}>
              <button className={styles.clButton} onClick={GoHome}>
                <FaArrowAltCircleLeft />
                <h3>MENU</h3>
              </button>
              <button className={styles.clButton} onClick={reloadPage}>
                <FaCircleNotch />
                <h3>PLAY AGAIN </h3>
              </button>
            </div>
          </motion.div>
        </Leftdrop>
      )}
    </AnimatePresence>
  );
}
