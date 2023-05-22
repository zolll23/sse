import { Model } from '../../models/Model'

export class Collisions {
  public detect (model: Model, models: Model[]): Model[] {
    const collisions = models.filter((barrier) => model.detectCollisions(barrier))
    if (collisions.length > 0) {
      // console.log(collisions)
      this.hit(model, collisions)
    }
    return collisions
  }

  public hit (model: Model, collisions: Model[]): void {
    collisions.forEach((barrier) => {
      Collisions.calcImpulse(model, barrier)
    })
  }

  private static calcImpulse (model: Model, barrier: Model): void {
    // console.log('calcImpulse', model, barrier)
    const modelCenter = model.getMassCenter()
    const barrierCenter = barrier.getMassCenter()
    if (barrier.isFixed()) {
      model.setVelocityX(-model.getVelocityX())
      model.setVelocityY(-model.getVelocityY() * barrier.getElasticity())
      return
    }
    const dx = barrierCenter.x - modelCenter.x
    const dy = barrierCenter.y - modelCenter.y
    const vCollision = { x: dx, y: dy }
    const distance = Math.sqrt(dx * dx + dy * dy)
    const vCollisionNorm = { x: vCollision.x / distance, y: vCollision.y / distance }
    const vRelativeVelocity = { x: model.getVelocityX() - barrier.getVelocityX(), y: model.getVelocityY() - barrier.getVelocityY() }
    const speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y
    if (speed < 0) return
    const impulseSpeed = 2 * speed / (model.getWeight() + barrier.getWeight())
    const impulseBarrier = impulseSpeed * barrier.getWeight()
    const impulseModel = impulseSpeed * model.getWeight()
    console.log(impulseSpeed, impulseBarrier, impulseModel, -(impulseBarrier * vCollisionNorm.x), -(impulseBarrier * vCollisionNorm.y))
    model.setVelocityDeltaX(-(impulseBarrier * vCollisionNorm.x))
    model.setVelocityDeltaY(-(impulseBarrier * vCollisionNorm.y))
    barrier.setVelocityDeltaX(impulseModel * vCollisionNorm.x)
    barrier.setVelocityDeltaY(impulseModel * vCollisionNorm.y)
  }
}
