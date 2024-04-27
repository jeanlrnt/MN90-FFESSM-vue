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
    return this.getStops()[5] !== '*';
  }

  get refDepth() : string {
    return next(this.depth, this.isSuccessive ? Tables.Mn90Prof : Tables.Mn90Prof2);
  }

  get refDuration() : string {
    return next(this.duration + this.majoration, Tables.Mn90T[this.refDepth]);
  }

  get stops() : CellStop {
    return new CellStop(Tables.Mn90P[this.refDepth][this.refDuration]);
  }


  public getStops() : CellStop {
    this.checkValues();
    if (!this.refDepth) {
      throw new Error('Profondeur non trouvée');
    }
    if (!this.refDuration) {
      throw new Error('Durée non trouvée pour cette profondeur');
    }
    return this.stops;
  }

  public checkValues() : void {
    if (this.depth === 0) {
      throw new Error('Profondeur de la plongée non renseignée');
    }
    if (this.duration === 0) {
      throw new Error('Durée de la plongée non renseignée');
    }
  }
}
