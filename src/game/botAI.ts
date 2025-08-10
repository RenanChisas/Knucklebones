import { knuckbones } from "../game/knucklebones";
type returnProps = {
  line: number;
  dice: number;
  player: string;
};

export class botAI {
  private playerBot: string;

  constructor(player: string) {
    this.playerBot = player;
  }

  chooseLevel(
    dice: number,
    game: knuckbones,
    name: string
  ): returnProps | null {
    if (name == "oChisas(EASY)") {
      return this.easy(dice, game);
    } else if (name == "oChisas(MEDIUM)") {
      return this.mid(dice, game);
    }
    return this.hard(dice, game);
  }

  easy(dice: number, game: knuckbones): returnProps | null {
    if (game.endGame()) {
      return null;
    }
    const sumAux = game.sumForLine();
    const table = sumAux.tableReturn;

    while (true) {
      const randomNumber = Math.floor(Math.random() * 3);
      if (table[1][randomNumber].includes(0)) {
        return { line: randomNumber, dice: dice, player: this.playerBot };
      }
    }
  }

  mid(dice: number, game: knuckbones): returnProps | null {
    const randomNumber = Math.floor(Math.random() * 2);

    if (randomNumber === 0) {
      return this.easy(dice, game);
    }
    return this.hard(dice, game);
  }

  hard(dice: number, game: knuckbones) {
    if (game.endGame()) {
      return null;
    }

    const sumAux = game.sumForLine();
    const table = sumAux.tableReturn;

    const include: number[] = [];
    table[1].forEach((line, index) => {
      if (line.includes(0)) {
        include.push(index);
      }
    });

    for (const ind of include) {
      if (table[1][ind].includes(dice)) {
        return { line: ind, dice: dice, player: this.playerBot };
      }
    }

    for (const ind of include) {
      if (table[0][ind].includes(dice)) {
        return { line: ind, dice: dice, player: this.playerBot };
      }
    }

    const randomLine = include[Math.floor(Math.random() * include.length)];
    return { line: randomLine, dice: dice, player: this.playerBot };
  }
}
