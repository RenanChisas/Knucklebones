import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

import { motion } from "framer-motion";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export function NotFound() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate(`/`);
    window.location.reload();
  };

  return (
    <div className={styles.home}>
      <div className={styles.name}>
        <h1>Page not found</h1>
      </div>
      <div className={styles.desc}>
        <div className={styles.title}>
          <h1>We couldn’t find the page you’re looking for.</h1>
        </div>
      </div>
      <div className={styles.buttons}>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#f7ecd4" }}
          whileTap={{ scale: 0.9 }}
          onClick={handleHome}
        >
          <FaArrowAltCircleLeft />
          <h3>MENU</h3>
        </motion.button>
      </div>
    </div>
  );
}
