export default class CellStop {
  stop3m: number = 0;
  stop6m: number = 0;
  stop9m: number = 0;
  stop12m: number = 0;
  stop15m: number = 0;
  GPS: string = '*';

  constructor(stop?: [number, number, number, number, number, string]) {
    if (stop) {
      this.stop3m = stop[0];
      this.stop6m = stop[1];
      this.stop9m = stop[2];
      this.stop12m = stop[3];
      this.stop15m = stop[4];
      this.GPS = stop[5];
    }
  }

  get formatted() {
    return [
      { depth: 3, duration: this.stop3m },
      { depth: 6, duration: this.stop6m },
      { depth: 9, duration: this.stop9m },
      { depth: 12, duration: this.stop12m },
      { depth: 15, duration: this.stop15m },
    ];
  }
}
