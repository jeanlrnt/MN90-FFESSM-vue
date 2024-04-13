import { generateGUID, next } from '@/Helpers/Helper';
import * as Tables from '@/assets/tables.json';

type CellStop = [number, number, number, number, number, string]

export default class Dive {
  id: string;
  depth: number;
  duration: number;
  date: Date | null;

  constructor(dive?: Dive) {
    this.id = dive?.id ?? generateGUID();
    this.depth = dive?.depth ?? 0;
    this.duration = dive?.duration ?? 0;
    this.date = dive?.date ?? null;
  }

  get allowSecondDive() : boolean {
    return this.getStops()[5] !== '*';
  }

  get refDepth() : string {
    return next(this.depth, Tables.Mn90Prof);
  }

  get refDuration() : string {
    return next(this.duration, Tables.Mn90T[this.refDepth]);
  }

  public getStops() : CellStop {
    this.checkValues();
    if (!this.refDepth) {
      throw new Error('Profondeur non trouvée');
    }
    if (!this.refDuration) {
      throw new Error('Durée non trouvée pour cette profondeur');
    }

    return Tables.Mn90P[this.refDepth + "" + this.refDuration]
  }

  private checkValues() : void {
    if (this.depth === 0) {
      throw new Error('Profondeur de la plongée non renseignée');
    }
    if (this.duration === 0) {
      throw new Error('Durée de la plongée non renseignée');
    }
  }
}
