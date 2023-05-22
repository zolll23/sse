import { Model } from '../../../models/Model'

/**
 * Отвечает за гравитационное притяжение тел с ненулевой массой на плоской Земле
 * Мы считаем, что сила тяжести действует только по координатеY строго вниз (убыванию координат)
 */
export class GravityFlatEarth {
  acceleration: number = 50

  run (models: Model[], interval: number): void {
    models.forEach((model) => { this.falling(model, interval) })
  }

  private falling (model: Model, interval: number): void {
    if (model.isFixed() || model.getWeight() === 0) return
    model.appendVelocityY(-this.acceleration, interval)
  }
}
