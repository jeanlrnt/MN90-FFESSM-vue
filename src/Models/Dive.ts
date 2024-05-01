import { generateGUID, next } from '@/Helpers/Helper';
import * as Tables from '@/assets/tables.json';
import CellStop from '@/Models/CellStop.ts'

export default class Dive {
  id: string;
  depth: number = 0;
  duration: number = 0;
  date: Date | null = null;
  isSuccessive: boolean = false;
  majoration: number = 0;

  constructor(dive?: Dive) {
    this.id = generateGUID();
    this.depth = dive?.depth ?? 0;
    this.duration = dive?.duration ?? 0;
    this.date = dive?.date ?? null;
    this.isSuccessive = dive?.isSuccessive ?? false;
    this.majoration = dive?.majoration ?? 0;
  }

  get allowSecondDive() : boolean {
    return this.stops.GPS !== '*';
  }

  get refDepth() : number {
    return next(this.depth, this.isSuccessive ? Tables.Mn90Prof2 : Tables.Mn90Prof);
  }

  get refDuration() : number {
    return next(this.duration + this.majoration, Tables.Mn90T[this.refDepth]);
  }

  get stops() : CellStop {
    return new CellStop(Tables.Mn90P[this.refDepth][this.refDuration]);
  }

  public checkValues() : void {
    if (this.depth <= 0) {
      throw new Error('Profondeur de la plongée invalide');
    }
    if (this.duration <= 0) {
      throw new Error('Durée de la plongée invalide');
    }
    if (!this.refDepth) {
      throw new Error('Profondeur de la plongée hors des limites de la table MN90');
    }
    if (!this.refDuration) {
      throw new Error('Durée de la plongée hors des limites de la table MN90');
    }
  }

  public isValid() : boolean {
    try {
      this.checkValues();
      return this.stops.isValid;
    }
    catch {
      return false;
    }
  }
}
