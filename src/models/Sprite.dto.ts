export class SpriteDto {
  name: string = ''
  x: number = 0
  y: number = 0
  z?: number = 0
  width: number
  height: number
  depth?: number = 1
  weight?: number = 0
  velocityX?: number = 0
  velocityY?: number = 0
  velocityZ?: number = 0
  density: number = 1
  elasticity: number = 1
  fixed?: boolean = false
  visible?: boolean = true
}

export class BoxSpriteDto extends SpriteDto {
  backgroundColor?: string = '#FFFFFF'
  image?: string | null = null
}

export class BoxTextSpriteDto extends BoxSpriteDto {
  text: string = ''
}
