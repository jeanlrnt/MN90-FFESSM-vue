import Dive from '@/Models/Dive';
import CellStop from '@/Models/CellStop'
import * as Tables from '@/assets/tables.json';
import { next, pos, prev } from '@/Helpers/Helper.ts'

export default class Planification {
  firstDive: Dive;
  secondDive: Dive;
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
    return prev(this.interval, Tables.Mn90Interval);
  }

  get refN2Coef() {
    return next(this.N2Coef, Tables.TbCoeff);
  }

  public calculate()
  {
    this.firstDive.checkValues();
    console.log('Calcul de la planification');
    if (this.hasSurfaceInterval && this.firstDive.allowSecondDive)
    {
      if (!this.interval)
      {
        throw new Error('Interval de surface non renseigné');
      }

      // Si l'intervalle de surface est inférieur à 15 minutes, on considère que les plongées sont consécutives
      if (this.interval < 15)
      {
        this.firstDive.duration += this.secondDive.duration;
        this.firstDive.depth = Math.max(this.firstDive.depth, this.secondDive.depth);
        this.secondDive = new Dive();
        this.interval = 0;
        this.hasSurfaceInterval = false;
        return;
      }

      // Si l'intervalle de surface est supérieur à 24 heures, on considère que les plongées ne sont pas successives
      // Sinon, on considère que les plongées sont successives
      if (this.interval < 24 * 60)
      {
        // On minore l'intervalle de surface
        const refIntervalIndex = pos(this.refInterval, Tables.Mn90Interval);
        if (!this.refInterval)
        {
          throw new Error('Intervalle de surface non trouvé');
        }

        // On majore le coefficient d'azote résiduel
        this.N2Coef = Tables.Mn90Cr[this.firstDive.stops.GPS][refIntervalIndex];
        const refN2CoefIndex = pos(this.refN2Coef, Tables.TbCoeff);
        if (!this.refN2Coef) {
          throw new Error('Coefficient d\'azote résiduel non trouvé');
        }
        this.secondDive.isSuccessive = true;

        // On majore la profondeur de la deuxième plongée
        if (!this.secondDive.refDepth)
        {
          throw new Error('Profondeur de la deuxième plongée non trouvée');
        }
        this.secondDive.majoration = Tables.Majo[this.secondDive.refDepth][refN2CoefIndex];

        // On majore la durée de la deuxième plongée
        if (!this.secondDive.refDuration)
        {
          throw new Error('Durée de la deuxième plongée non trouvée');
        }
      }
    }
  }

  public duplicate() : Planification {
    const planification = new Planification(this);
    planification.firstDive = new Dive(this.firstDive);
    planification.secondDive = new Dive(this.secondDive);

    return planification;
  }
}
