import type { JSX } from "react";
import {
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
  FaDiceSix,
} from "react-icons/fa";

type DicesProps = {
  number: number;
};

export function Dices({ number }: DicesProps) {
  const diceIcons: { [key: number]: JSX.Element } = {
    0: (
      <div style={{ visibility: "hidden" }}>
        <FaDiceOne />
      </div>
    ),
    1: <FaDiceOne />,
    2: <FaDiceTwo />,
    3: <FaDiceThree />,
    4: <FaDiceFour />,
    5: <FaDiceFive />,
    6: <FaDiceSix />,
  };
  const clampedNumber = number >= 0 && number <= 6 ? number : 0;

  return <div>{diceIcons[clampedNumber]}</div>;
}
