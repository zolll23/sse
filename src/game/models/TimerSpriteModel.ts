import { BoxTextSpriteModel } from '../../models/BoxTextSpriteModel'
import { BoxTextSpriteDto } from '../../models/Sprite.dto'
import { World } from '../../World/World'

export class TimerSpriteModel extends BoxTextSpriteModel {
  constructor (protected world: World, protected meta: BoxTextSpriteDto) {
    super(world, meta)
    this.setTag('Timer')
    this.subscribe('tick', (event: CustomEvent) => { this.tick(event) })
  }

  public tick (event: CustomEvent): void {
    this.setText(event.detail.time.getSeconds())
  }
}
