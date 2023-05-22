import { View } from '../view/View'
import { Model } from '../models/Model'
import { Physic } from './Physic/Physic'
import { ModelConditions } from '../models/ModelConditions'

export class World {
  private readonly axisX: boolean = true
  private readonly axisY: boolean = true
  private readonly axisZ: boolean = true
  private readonly models: Model[] = []
  private timestamp: number = 0
  private interval: number = 0.05

  constructor (protected rootElement: HTMLElement, public physic: Physic, private readonly view: View) {
    window.requestAnimationFrame((timestamp) => { this.refresh(timestamp) })
    const timeInterval = this.physic.getTime().getInterval()
    this.subscribe('tick', () => { this.run(timeInterval) })
  }

  /**
   * Запускает отрисовку мира по готовности через requestAnimationFrame
   * @param timestamp
   * @private
   */
  private refresh (timestamp): void {
    this.interval = (timestamp - this.timestamp) / 1000
    this.timestamp = timestamp
    this.view.draw(this.models)
    window.requestAnimationFrame((timestamp) => { this.refresh(timestamp) })
  }

  public clearWorld (): void {
    this.view.clear()
  }

  /**
   * Вызывается по событию tick из модуля Time, поэтому вся физика применяется к моделям с периодичностью генерации
   * события tick
   * @param interval
   */
  public run (interval): void {
    this.physic.run(this.models, interval)
  }

  public addModel (model: Model): Model {
    model.init()
    this.models.push(model)
    return model
  }

  public findModels (conditions?: ModelConditions): Model[] {
    let models = this.models
    if (conditions?.isBarrier === true) {
      models = models.filter((model) => model.isBarrier())
    }
    return models
  }

  public getView (): View {
    return this.view
  }

  public subscribe (event: string, callback: any): void {
    this.rootElement.addEventListener(event, callback)
  }
}
