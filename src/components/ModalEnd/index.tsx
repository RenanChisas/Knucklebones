import styles from "./styles.module.css";

type infoProps = {
  NameWin: string;
  points: number[];
};

export function ModalEnd({ NameWin, points }: infoProps) {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.body}>
          <h2>
            {NameWin} WINS {points[0]}-{points[1]}
          </h2>
        </div>
        <div className={styles.footer}>
          <button className={styles.clButton}>menu</button>
          <button className={styles.cfButton}>play Again</button>
        </div>
      </div>
    </div>
  );
}
