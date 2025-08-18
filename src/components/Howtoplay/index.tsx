import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

import { FaArrowAltCircleLeft } from "react-icons/fa";

export function Howtoplay() {
  const navigate = useNavigate();

  const GoHome = () => {
    navigate(`/`);
  };

  return (
    <div className={styles.home}>
      <div className={styles.name}>
        <h1>How To Play</h1>
      </div>

      <div className={styles.descInfo}>
        <hr className={styles.line}></hr>
        <h2>Combined dice</h2>

        <img className={styles.img1} src="/img/img1.png" alt="" />
        <p>
          When dice with the same number are placed in the same line, multiply
          the values.
        </p>
      </div>

      <div className={styles.descInfo}>
        <hr className={styles.line}></hr>
        <h2>Destroy the opponent</h2>

        <img className={styles.img2} src="/img/img2.png" alt="" />
        <p>
          Destroy the opponent’s dice that show the same number as in your roll.
        </p>
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
