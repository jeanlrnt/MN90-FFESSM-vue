import Dive from '@/Models/Dive';
import CellStop from '@/Models/CellStop'
import * as Tables from '@/assets/tables.json';
import { next, posNext, posPrev } from '@/Helpers/Helper.ts'

type CellStopType = [number, number, number, number, number, string];

export default class Planification {
  firstDive: Dive;
  firstDiveStops: CellStopType = [0, 0, 0, 0, 0, '!'];
  secondDive: Dive;
  secondDiveStops: CellStopType = [0, 0, 0, 0, 0, '!'];
  hasSurfaceInterval: boolean = false;
  interval: number = 0;
  N2Coef: number = 0;
  majorationMin: number = 0;

  constructor(planification?: Planification) {
    this.firstDive = planification?.firstDive ?? new Dive();
    this.secondDive = planification?.secondDive ?? new Dive();
    this.hasSurfaceInterval = planification?.hasSurfaceInterval ?? false;
    this.interval = planification?.interval ?? 0;
    this.N2Coef = planification?.N2Coef ?? 0;
    this.majorationMin = planification?.majorationMin ?? 0;
  }

  get refInterval() {
    return next(this.interval, Tables.Mn90Interval);
  }

  get refN2Coef() {
    return next(this.N2Coef, Tables.Mn90Cr[this.firstDive.getStops()[5]]);
  }

  get getFirstDiveStops(): CellStop {
    return new CellStop(this.firstDiveStops);
  }

  get getSecondDiveStops(): CellStop {
    return new CellStop(this.secondDiveStops);
  }

  public calculate() {
    this.firstDiveStops = this.firstDive.getStops();
    if (this.hasSurfaceInterval && this.firstDive.allowSecondDive) {
      if (!this.interval) {
        throw new Error('Interval de surface non renseigné');
      }
      console.log('Calcul de la planification');

      // Si l'intervalle de surface est inférieur à 15 minutes, on considère que les plongées sont consécutives
      if (this.interval < 15) {
        this.firstDive.duration += this.secondDive.duration;
        this.firstDive.depth = Math.max(this.firstDive.depth, this.secondDive.depth);
        this.firstDiveStops = this.firstDive.getStops();
        this.secondDive = new Dive();
        return;
      }

      // Si l'intervalle de surface est supérieur à 24 heures, on considère que les plongées ne sont pas successives
      // Sinon, on considère que les plongées sont successives
      if (this.interval < 24 * 60) {
        {
          // On minore l'intervalle de surface
          const refIntervalIndex = posPrev(this.interval, Tables.Mn90Interval) - 1;
          if (!this.refInterval) {
            throw new Error('Intervalle de surface non trouvé');
          }

          // On majore le coefficient d'azote résiduel
          this.N2Coef = Tables.Mn90Cr[this.firstDiveStops[5]][refIntervalIndex];
          const refN2CoefIndex = posNext(this.N2Coef, Tables.Mn90Cr[this.firstDiveStops[5]]);
          if (!this.refN2Coef) {
            throw new Error('Coefficient d\'azote résiduel non trouvé');
          }

          // On majore la profondeur de la deuxième plongée
          const refSecondDiveDepth = next(this.secondDive.depth, Tables.Mn90Prof2);
          if (!refSecondDiveDepth) {
            throw new Error('Profondeur de la deuxième plongée non trouvée');
          }
          const majoration = Tables.Majo[refSecondDiveDepth][refN2CoefIndex];

          // On majore la durée de la deuxième plongée
          const refSecondDiveDuration = next(this.secondDive.duration + majoration, Tables.Mn90T[refSecondDiveDepth]);
          if (!refSecondDiveDuration) {
            throw new Error('Durée de la deuxième plongée non trouvée');
          }

          this.secondDive.depth = refSecondDiveDepth;
          this.secondDive.duration = refSecondDiveDuration;
          this.secondDiveStops = this.secondDive.getStops();
        }
      }
    }
  }
}
