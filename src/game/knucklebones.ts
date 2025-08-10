type TableProps = [
  [number[], number[]],
  [number[], number[]],
  [number[], number[]]
];

type SumItem = {
  sumReturn: number;
  isZero: boolean;
};
type ReturnSumItem = {
  sumReturn: SumItem[];
  tableReturn: number[][][];
};

export class knuckbones {
  private players: string[];
  private points: number[];
  private turn: boolean;
  private table: TableProps;
  constructor(players: string[]) {
    this.table = [
      [
        [0, 0, 0],
        [0, 0, 0],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
      ],
    ];
    this.points = [0, 0];
    this.players = players;
    this.turn = false;
  }

  restartGame(): void {
    this.table = [
      [
        [0, 0, 0],
        [0, 0, 0],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
      ],
    ];
    this.points = [0, 0];
  }

  getTable(): number[][] {
    const tablePlayer1: number[] = [];
    const tablePlayer2: number[] = [];

    for (let index = 0; index < 2; index++) {
      for (let index2 = 0; index2 < 3; index2++) {
        if (index == 0) {
          tablePlayer1.push(this.table[0][index][index2]);
          tablePlayer1.push(this.table[1][index][index2]);
          tablePlayer1.push(this.table[2][index][index2]);
        }
        if (index == 1) {
          tablePlayer2.push(this.table[0][index][index2]);
          tablePlayer2.push(this.table[1][index][index2]);
          tablePlayer2.push(this.table[2][index][index2]);
        }
      }
    }

    return [tablePlayer1, tablePlayer2];
  }

  addDice(line: number, dice: number, player: string): boolean | null {
    const idPLayer = this.players.indexOf(player);

    const linePlayer = this.table[line][idPLayer];

    const indexADD = linePlayer.findIndex((num) => num === 0);

    const turnaux = this.turn;
    if (indexADD !== -1) {
      this.table[line][idPLayer][indexADD] = dice;
      this.turn = !this.turn;
    }
    if (idPLayer == 0) {
      this.removeDice(line, dice, 1);
    } else {
      this.removeDice(line, dice, 0);
    }

    return this.turn == turnaux ? null : this.turn;
  }

  removeDice(line: number, dice: number, playerid: number): void {
    const linePlayer = this.table[line][playerid];
    const filtered = linePlayer.filter((n) => n !== dice);
    const zerosCount = linePlayer.length - filtered.length;
    const zeros = new Array(zerosCount).fill(0);
    this.table[line][playerid] = [...filtered, ...zeros];
  }

  sumForLine(): ReturnSumItem {
    const sumPlayer1: number[][] = [[], [], []];
    const sumPlayer2: number[][] = [[], [], []];

    const sumPlayerReturn1: SumItem[] = [];
    const sumPlayerReturn2: SumItem[] = [];

    for (let index = 0; index < 2; index++) {
      for (let index2 = 0; index2 < 3; index2++) {
        if (index == 0) {
          sumPlayer1[0].push(this.table[0][index][index2]);
          sumPlayer1[1].push(this.table[1][index][index2]);
          sumPlayer1[2].push(this.table[2][index][index2]);
        }
        if (index == 1) {
          sumPlayer2[0].push(this.table[0][index][index2]);
          sumPlayer2[1].push(this.table[1][index][index2]);
          sumPlayer2[2].push(this.table[2][index][index2]);
        }
      }
    }

    sumPlayer1.map((sum) => {
      const isZero = sum.includes(0);
      const sumReturn = this.sumWithRepeats(sum);
      sumPlayerReturn1.push({ sumReturn, isZero });
    });
    sumPlayer2.map((sum) => {
      const isZero = sum.includes(0);
      const sumReturn = this.sumWithRepeats(sum);
      sumPlayerReturn2.push({ sumReturn, isZero });
    });
    const player1Sum = sumPlayerReturn1.reduce(
      (acc, val) => acc + val.sumReturn,
      0
    );
    const player2Sum = sumPlayerReturn2.reduce(
      (acc, val) => acc + val.sumReturn,
      0
    );

    this.points = [player1Sum, player2Sum];

    return {
      sumReturn: [...sumPlayerReturn1, ...sumPlayerReturn2],
      tableReturn: [sumPlayer1, sumPlayer2],
    };
  }

  endGame(): boolean {
    const isPlayer1end: boolean[] = [false, false, false];
    const isPlayer2end: boolean[] = [false, false, false];

    for (let index = 0; index < 3; index++) {
      if (this.table[index][0].includes(0)) {
        isPlayer1end[index] = false;
      } else {
        isPlayer1end[index] = true;
      }

      if (this.table[index][1].includes(0)) {
        isPlayer2end[index] = false;
      } else {
        isPlayer2end[index] = true;
      }
    }

    return (
      (isPlayer1end[0] && isPlayer1end[1] && isPlayer1end[2]) ||
      (isPlayer2end[0] && isPlayer2end[1] && isPlayer2end[2])
    );
  }

  getPoints(): number[] {
    return this.points;
  }

  sumWithRepeats(arr: number[]): number {
    const counts: Record<number, number> = {};

    for (const num of arr) {
      counts[num] = (counts[num] || 0) + 1;
    }

    let total = 0;
    for (const numStr in counts) {
      const num = Number(numStr);
      const count = counts[num];
      if (count > 1) {
        total += num * count * count;
      } else {
        total += num;
      }
    }
    return total;
  }

  chooseTurn(): void {
    this.turn = !this.turn;
  }

  setTurn(turn: boolean): void {
    this.turn = turn;
  }

  print(): void {
    console.log("players:", this.players);
    console.log("Turn:", this.turn);
    console.log("Table:", this.table);
    console.log("");
    console.log("");
  }
}
