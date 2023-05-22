export class ModelConditions {
  public tag?: string
  public density?: number
  /**
   * true - если density > 0 (служит для поиска моделей, для которых есть смысл искать коллизии)
   */
  public isBarrier?: boolean
}
