export default class CellStop {
  stop3m: number = 0;
  stop6m: number = 0;
  stop9m: number = 0;
  stop12m: number = 0;
  stop15m: number = 0;
  GPS: string = '!';
  DTR: number = 0;

  constructor(stop?: [number, number, number, number, number, string, number]) {
    if (stop) {
      this.stop3m = stop[0];
      this.stop6m = stop[1];
      this.stop9m = stop[2];
      this.stop12m = stop[3];
      this.stop15m = stop[4];
      this.GPS = stop[5];
      this.DTR = stop[6];
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

  get total() {
    return this.stop3m + this.stop6m + this.stop9m + this.stop12m + this.stop15m;
  }

  get countStops() {
    if (this.stop15m > 0) {
      return 5;
    }
    if (this.stop12m > 0) {
      return 4;
    }
    if (this.stop9m > 0) {
      return 3;
    }
    if (this.stop6m > 0) {
      return 2;
    }
    if (this.stop3m > 0) {
      return 1;
    }
    return 0;
  }

  get DRBetweenStops(): number {
    const upSpeed = 10; // 10m/min
    return 3 / upSpeed; // In minutes
  }

  get DRToFirstStop() {
    return this.DTR - this.total - (this.countStops * this.DRBetweenStops);
  }

  get isValid() {
    return this.GPS !== '!';
  }
}
