export class Time {
  constructor (protected readonly rootElement: HTMLElement) {
  }

  public tick (meta: any): void {
    const event = new CustomEvent(
      'tick',
      {
        detail: {
          time: new Date(),
          meta
        }
      }
    )
    this.rootElement.dispatchEvent(event)
  }

  public getInterval (): number {
    return 1
  }
}
