import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import { WaveText } from "../waveText";

type homeProps = {
  setbot: (value: boolean) => void;
  loading: boolean;
};

export function Home({ setbot, loading }: homeProps) {
  const navigate = useNavigate();

  const playLocal = () => {
    setbot(false);
    navigate(`/SelectCharacter`);
  };
  const playAI = () => {
    setbot(true);
    navigate(`/SelectCharacter`);
  };
  const playOnline = () => {
    setbot(true);
    navigate(`/Online`);
  };

  return (
    <div className={styles.home}>
      <div className={styles.name}>
        <h1>Knucklebones</h1>
      </div>
      <div className={styles.desc}>
        <div className={styles.title}>
          <WaveText font="1.5rem" on={true} text={"inspiration"} />
          <WaveText font="1.5rem" on={true} text={"for"} />
          <a href="https://www.cultofthelamb.com/" target="_blank">
            <WaveText font="1.5rem" on={true} text={" Cult "} />
            <WaveText font="1.5rem" on={true} text={" of "} />
            <WaveText font="1.5rem" on={true} text={"  the "} />
            <WaveText font="1.5rem" on={true} text={"  lamb"} />
          </a>
        </div>
        <div className={styles.title}>
          <WaveText font="1.5rem" on={true} text={"Create"} />
          <WaveText font="1.5rem" on={true} text={"  by "} />
          <a
            href="https://www.renanchisas.work/
          "
            target="_blank"
          >
            <WaveText font="1.5rem" on={true} text={"  RenanChisas"} />
          </a>
        </div>
      </div>
      <div className={styles.buttons}>
        {loading ? (
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#fb273a" }}
            whileTap={{ scale: 0.9 }}
            onClick={playOnline}
            disabled={true}
          >
            <span>
              Play Online <FaLock />{" "}
            </span>
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#fb273a" }}
            whileTap={{ scale: 0.9 }}
            onClick={playOnline}
          >
            <span>Play Online</span>
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#fb273a" }}
          whileTap={{ scale: 0.9 }}
          onClick={playAI}
        >
          <span>Play vs AI</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#fb273a" }}
          whileTap={{ scale: 0.9 }}
          onClick={playLocal}
        >
          <span>Local Play</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#fb273a" }}
          whileTap={{ scale: 0.9 }}
        >
          <span>
            how to play <FaLock />{" "}
          </span>
        </motion.button>
      </div>
    </div>
  );
}
