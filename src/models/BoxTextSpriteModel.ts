import { Model } from './Model'
import { World } from '../World/World'
import { BoxTextSpriteDto } from './Sprite.dto'
import { View } from '../view/View'

export class BoxTextSpriteModel extends Model {
  protected tag: string = 'BoxTextSpriteModel'
  protected isModified: boolean
  protected text: string

  constructor (protected world: World, protected meta: BoxTextSpriteDto) {
    super(world, meta)
    this.setText(meta.text)
  }

  public setText (text: string): void {
    this.isModified = true
    this.text = text
  }

  init (): void {
    super.init()
    this.isModified = true
    this.draw()
  }

  public draw (): View {
    if (this.isModified) {
      this.view.drawText(this.text, 0, 0, this.width, this.height)
      this.isModified = false
    }
    return this.view
  }
}
