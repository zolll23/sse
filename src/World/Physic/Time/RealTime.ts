import { Time } from './Time'

/**
 * Реализует реальное течение времени, генерируя события tick через заданные интервалы
 */
export class RealTime extends Time {
  private readonly interval: number = 10
  private readonly timer: number

  constructor (protected readonly rootElement: HTMLElement) {
    super(rootElement)
    this.timer = window.setInterval(() => {
      this.tick({ duration: this.interval / 1000 })
    }, this.interval)
  }

  public getInterval (): number {
    return this.interval / 1000
  }
}
