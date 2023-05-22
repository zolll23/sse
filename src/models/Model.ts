import { World } from '../World/World'
import { View } from '../view/View'
import { SpriteDto } from './Sprite.dto'
import { Point } from './Point'
import { Elasticity } from '../World/Physic/Elasticity'

export class Model {
  public name: string = ''
  protected view: View
  protected enabled: boolean = true
  protected visible: boolean = true
  /**
   * Неподвижный. Если true - то на модель не действует сила тяжести, даже если weight > 0
   * @protected
   */
  protected fixed: boolean = false
  protected cX: number = 0
  protected cY: number = 0
  protected cZ: number = 0
  protected width: number
  protected height: number
  protected depth: number = 1
  protected tag: string = 'Model'
  protected velocityX: number = 0
  protected velocityY: number = 0
  protected velocityZ: number = 0
  /**
   * Вес в условных единицах. Если больше 0, то на тело действует сила тяжести
   * TODO: может участвовать в расчете импульса при столкновениях
   * @protected
   */
  protected weight: number = 0
  /**
   * Плотность: 0 - тела проходят сквозь данную модель без сопротивления, 1 - тело непроходимо
   * Играет роль при поиске коллизий, если density = 0 - то поиск коллизий с данной моделью не производится
   * @protected
   */
  protected density: number = 1
  /**
   *Упругость - определяет как взаимодействуют модели при столкновении:
   * 0 - полностью неупругое столкновение
   * 1 - полностью упругое столкновение
   * @protected
   */
  protected elasticity: number = 0
  protected moved: boolean = false

  constructor (protected world: World, protected meta: SpriteDto) {
    this.name = this.meta.name ?? ''
    this.cX = this.meta.x
    this.cY = this.meta.y
    this.velocityX = this.meta.velocityX ?? 0
    this.velocityY = this.meta.velocityY ?? 0
    this.velocityZ = this.meta.velocityZ ?? 0
    this.weight = this.meta.weight ?? 0
    this.fixed = this.meta.fixed ?? false
    this.density = this.meta.density ?? 1
    this.elasticity = this.meta.elasticity ?? 1
    this.visible = this.meta.visible ?? true
    this.checkMoving()
    this.world.addModel(this)
  }

  public init (): void {
    this.width = this.meta.width
    this.height = this.meta.height
    this.view = this.world.getView().create(this.width, this.height)
  }

  public getX (): number {
    return this.cX
  }

  public getY (): number {
    return this.cY
  }

  public getWidth (): number {
    return this.width
  }

  public getHeight (): number {
    return this.height
  }

  public getWeight (): number {
    return this.weight
  }

  public getDensity (): number {
    return this.density
  }

  public getElasticity (): number {
    return this.elasticity
  }

  public getVelocityX (): number {
    return this.velocityX
  }

  public getVelocityY (): number {
    return this.velocityY
  }

  public getVelocityZ (): number {
    return this.velocityZ
  }

  public setVelocityX (velocityX: number): void {
    this.velocityX = velocityX
  }

  public setVelocityY (velocityY: number): void {
    this.velocityY = velocityY
  }

  public setVelocityZ (velocityZ: number): void {
    this.velocityZ = velocityZ
  }

  public setVelocityDeltaX (velocityX: number): void {
    this.velocityX += velocityX
  }

  public setVelocityDeltaY (velocityY: number): void {
    this.velocityY += velocityY
  }

  public setVelocityDeltaZ (velocityZ: number): void {
    this.velocityZ += velocityZ
  }

  public appendVelocityX (acceleration: number, time: number): number {
    this.velocityX += acceleration * time
    this.setOffsetX(time)
    return this.velocityX
  }

  public appendVelocityY (acceleration: number, time: number): number {
    this.velocityY += acceleration * time
    this.setOffsetY(time)
    return this.velocityY
  }

  public appendVelocityZ (acceleration: number, time: number): number {
    this.velocityZ += acceleration * time
    this.setOffsetZ(time)
    return this.velocityZ
  }

  public setOffsetX (time: number): void {
    this.cX += this.velocityX * time
  }

  public setOffsetY (time: number): void {
    this.cY += this.velocityY * time
  }

  public setOffsetZ (time: number): void {
    this.cZ += this.velocityZ * time
  }

  public move (x: number, y: number, z: number = 0): void {
    this.cX = x
    this.cY = y
    this.cZ = z
    this.moved = true
  }

  private checkMoving (): boolean {
    this.moved = (this.velocityX !== 0 || this.velocityY !== 0 || this.velocityZ !== 0)
    return this.moved
  }

  public draw (): View {
    // TODO: add realization in children classes
    // console.log('draw:', this.moved, this.velocityX)
    this.checkMoving()
    return this.view
  }

  public hide (): void {
    this.visible = false
  }

  public show (): void {
    this.visible = true
  }

  public setTag (tag: string): void {
    this.tag = tag
  }

  public subscribe (event: string, callback: any): void {
    this.world.subscribe(event, callback)
  }

  public isFixed (): boolean {
    return this.fixed
  }

  public isVisible (): boolean {
    return this.visible
  }

  public isMoving (): boolean {
    return this.enabled && this.moved
  }

  public isBarrier (): boolean {
    return this.density > 0
  }

  public getModelPoints (): Point[] {
    return [
      new Point(this.cX, this.cY),
      new Point(this.cX + this.width, this.cY),
      new Point(this.cX + this.width, this.cY + this.height),
      new Point(this.cX, this.cY + this.height)
    ]
  }

  /**
   * Считаем что базовый спрайт - это прямоугольник, и проверяем что искомая точка попала внутрь этого прямоугольника
   *
   * @param point
   */
  public pointInsideModel (point: Point): boolean {
    const cX = this.getX()
    const cY = this.getY()
    const cW = this.getWidth()
    const cH = this.getHeight()
    // console.log((point.x >= cX && point.x <= cX + cW && point.y >= cY && point.y <= cY + cH), `${point.x} >= ${cX} && ${point.x} <= ${cX + cW} && ${point.y} >= ${cY} && ${point.y} <= ${cY} + ${cH}`)
    return (point.x >= cX && point.x <= cX + cW && point.y >= cY && point.y <= cY + cH)
  }

  public detectCollisions (outerModel: Model): boolean {
    if (!outerModel.isBarrier()) return false
    const pointsOuter = outerModel.getModelPoints()
    const foundPointOuter = pointsOuter.find((point) => this.pointInsideModel(point))
    const pointsModel = this.getModelPoints()
    const foundPointModel = pointsModel.find((point) => outerModel.pointInsideModel(point))
    return (foundPointOuter != null || foundPointModel != null)
  }

  public getMassCenter (): Point {
    return new Point(
      Math.ceil(this.cX + this.width / 2),
      Math.ceil(this.cY + this.height / 2)
    )
  }
}
