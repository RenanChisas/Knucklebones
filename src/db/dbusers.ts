export class playersDB {
  static key1 = "players";

  static getAll() {
    const data = localStorage.getItem(this.key1);
    return data ? JSON.parse(data) : [];
  }

  static saveAll(players: string[][]) {
    localStorage.setItem(this.key1, JSON.stringify(players));
  }

  static clear() {
    localStorage.removeItem(this.key1);
  }
}
