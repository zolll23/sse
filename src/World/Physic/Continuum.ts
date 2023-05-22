import { Model } from '../../models/Model'
import { Collisions } from './Collisions'

/**
 * Отвечает за равномерное и прямолинейное движение (1 закон Ньютона)
 *а также поддержку столкновений
 */
export class Continuum {
  constructor (
    private readonly collisionsEngine: Collisions
  ) {
  }

  run (models: Model[], interval: number): void {
    this.findCollisions(models)
    this.firstLawOfNewton(models, interval)
  }

  /**
   * Реализация первого закона Ньютона (тела, если на них не действуют силы двигаются равномерно и прямолинейно)
   *
   * @param models
   * @param interval
   * @private
   */
  private firstLawOfNewton (models: Model[], interval: number): void {
    models.forEach((model) => {
      model.setOffsetX(interval)
      model.setOffsetY(interval)
      model.setOffsetZ(interval)
    })
  }

  /**
   * Находим все коллизии между движущимися моделями и всеми остальными плотными моделями
   *
   * @param models
   */
  public findCollisions (models: Model[]): void {
    // находим все материальные модели (у которых плотность отлична от нуля)
    let denseModels = models.filter((model) => model.isBarrier())
    // находим все движущиеся модели (у которых ненулевая скорость или был вызван метод move)
    const movingModels = models.filter((model) => model.isMoving())
    // console.log(denseModels.length, movingModels.length)
    movingModels.forEach((model) => {
      // отфильтровываем из моделей, с которыми проверяем столкновение саму модель, для которой ищем столкновения
      denseModels = denseModels.filter((dense) => dense !== model)
      this.collisionsEngine.detect(model, denseModels)
    })
  }
}
