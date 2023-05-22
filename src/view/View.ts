import { BoxSpriteDto } from '../models/Sprite.dto'
import { Model } from '../models/Model'

export class View {
  private readonly ctx: any
  private readonly width: number
  private readonly height: number

  constructor (private readonly canvas: HTMLCanvasElement) {
    (this.canvas.offsetWidth !== 0) && (this.canvas.width = this.canvas.offsetWidth);
    (this.canvas.offsetHeight !== 0) && (this.canvas.height = this.canvas.offsetHeight)
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.ctx = this.canvas.getContext('2d')
  }

  public create (width: number, height: number, depth: number = 1): View {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    return new View(canvas)
  }

  public draw (models: Model[]): void {
    this.clear()
    models.forEach((model, idx) => {
      if (model.isVisible()) {
        this.ctx.drawImage(model.draw().canvas, this.getX(model), this.getY(model), model.getWidth(), model.getHeight())
      }
    })
    this.ctx.save()
  }

  public clear (): void {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  /*
  * Get the X coordinate of Sprite in current View
  */
  public getX (model: Model): number {
    return Math.ceil(model.getX())
  }

  /*
  * Get the Y coordinate of Sprite in current View (in Canvas Y=0 is top, but not bottom, we invert this)
  */
  public getY (model: Model): number {
    return Math.ceil(this.height - model.getY() - model.getHeight())
    // return model.getY()
  }

  public fillRect (meta: BoxSpriteDto): void {
    this.ctx.fillStyle = meta.backgroundColor
    this.ctx.fillRect(0, 0, meta.width, meta.height)
  }

  public drawImage (image: HTMLImageElement, x: number, y: number, width: number, height: number): void {
    this.ctx.drawImage(image, x, y, width, height)
  }

  drawText (text: string, x: number, y: number, width: number, height: number): void {
    this.clear()
    const fontSize = 18
    this.ctx.strokeStyle = 'green'
    this.ctx.strokeRect(x, 0, width, height)
    this.ctx.font = fontSize.toString() + 'px serif'
    this.ctx.textBaseline = 'bottom'
    const offsetY = Math.ceil(this.height - (this.height - fontSize) / 2)
    this.ctx.fillText(text, x + 3, offsetY, width)
  }
}
