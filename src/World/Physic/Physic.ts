import { GravityFlatEarth } from './Gravity/GravityFlatEarth'
import { Time } from './Time/Time'
import { Model } from '../../models/Model'
import { Continuum } from './Continuum'

export class Physic {
  private readonly interval: number

  constructor (
    private readonly continuum: Continuum,
    private readonly time: Time,
    private readonly gravity: GravityFlatEarth
  ) {
    this.interval = this.time.getInterval()
  }

  public getTime (): Time {
    return this.time
  }

  public getContinuum (): Continuum {
    return this.continuum
  }

  run (models: Model[], interval: number): void {
    this.gravity.run(models, interval)
    this.continuum.run(models, interval)
  }
}
