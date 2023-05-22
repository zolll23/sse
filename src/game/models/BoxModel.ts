import { SpriteDto } from '../../models/Sprite.dto'
import { World } from '../../World/World'
import { BoxSpriteModel } from '../../models/BoxSpriteModel'

export class BoxModel extends BoxSpriteModel {
  constructor (protected world: World, protected meta: SpriteDto) {
    super(world, meta)
    this.setTag('Box')
  }

  public die (): void {
    let counter = 0
    const timer = window.setInterval(() => {
      counter++
      if (this.isVisible()) {
        this.hide()
      } else {
        this.show()
      }
      if (counter >= 10) {
        window.clearInterval(timer)
        this.hide()
      }
    }, 100)
  }
}
