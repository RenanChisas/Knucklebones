import { motion, type Variants } from "framer-motion";

type WaveProps = {
  text: string;
  on: boolean;
  font?: string;
};

export const WaveText = ({ text, on, font = "2rem" }: WaveProps) => {
  const letters = text.split("");

  const letterAnimation: Variants = {
    animate: {
      y: [0, -5, 0, 5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "loop",
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: font,
        fontWeight: "bold",
      }}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          variants={letterAnimation}
          animate={on ? "animate" : undefined}
          transition={{
            delay: i * 0.2,
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};
