import { Model } from './Model'
import { World } from '../World/World'
import { BoxSpriteDto } from './Sprite.dto'
import { Point } from './Point'

export class BoxSpriteModel extends Model {
  protected tag: string = 'BoxSpriteModel'

  constructor (protected world: World, protected meta: BoxSpriteDto) {
    super(world, meta)
  }

  init (): void {
    super.init()

    if (this.meta.image != null) {
      const image = new Image()
      image.src = this.meta.image
      this.view.drawImage(image, 0, 0, this.width, this.height)
      return
    }
    this.view.fillRect(this.meta)
  }

  public getModelPoints (): Point[] {
    return super.getModelPoints()
  }
}
