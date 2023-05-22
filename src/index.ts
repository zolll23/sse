import { World } from './World/World'
import { Physic } from './World/Physic/Physic'
import { GravityFlatEarth } from './World/Physic/Gravity/GravityFlatEarth'
import { View } from './view/View'
import { BoxSpriteDto, BoxTextSpriteDto } from './models/Sprite.dto'
import { RealTime } from './World/Physic/Time/RealTime'
import { TimerSpriteModel } from './game/models/TimerSpriteModel'
import { BoxModel } from './game/models/BoxModel'
import { Continuum } from './World/Physic/Continuum'
import { PhysicConstants } from './World/Physic/PhysicConstants'
import { Collisions } from './World/Physic/Collisions'
import { ModelConditions } from './models/ModelConditions'

const wallLeft: BoxSpriteDto = { backgroundColor: '#808080', x: 0, y: 0, width: 10, height: 600, weight: PhysicConstants.INFINITE_MASS, fixed: true, density: 1, name: 'wallLeft', elasticity: 0.5 }
const wallBottom: BoxSpriteDto = { backgroundColor: '#808080', x: 0, y: 0, width: 800, height: 40, weight: PhysicConstants.INFINITE_MASS, fixed: true, density: 1, name: 'wallBottom', elasticity: 0.8 }
const wallTop: BoxSpriteDto = { backgroundColor: '#808080', x: 0, y: 590, width: 800, height: 10, weight: PhysicConstants.INFINITE_MASS, fixed: true, density: 1, name: 'wallTop', elasticity: 0.5 }
const wallRight: BoxSpriteDto = { backgroundColor: '#808080', x: 800, y: 0, width: 10, height: 600, weight: PhysicConstants.INFINITE_MASS, fixed: true, density: 1, name: 'wallRight', elasticity: 0.5 }

const metaBox: BoxSpriteDto = { backgroundColor: '#ff0000', x: 115, y: 400, width: 29, height: 29, weight: 1, velocityX: 0, velocityY: 0, visible: true }
const metaBox2: BoxSpriteDto = { backgroundColor: '#00ff00', x: 100, y: 450, width: 29, height: 29, weight: 1, velocityX: 0, velocityY: 0 }

function start (): void {
  const rootElement = document.getElementById('world') as HTMLCanvasElement
  const time = new RealTime(rootElement)
  const gravity = new GravityFlatEarth()
  const collisionsEngine = new Collisions()
  const continuum = new Continuum(collisionsEngine)

  const physic = new Physic(continuum, time, gravity)
  const view = new View(rootElement)
  const world = new World(rootElement, physic, view)

  // Add text sprite
  const metaBoxText: BoxTextSpriteDto = { x: 12, y: 566, width: 200, height: 22, weight: 0, text: 'Initialization...', density: 0 }
  // eslint-disable-next-line no-new
  new BoxModel(world, wallLeft)
  new BoxModel(world, wallRight)
  new BoxModel(world, wallBottom)
  new BoxModel(world, wallTop)
  new TimerSpriteModel(world, metaBoxText)

  const boxes: BoxModel[] = []
  // Add box sprites
  for (let i = 0; i < 1; i++) {
    if ((i % 2) !== 0) {
      const model = new BoxModel(world, metaBox)
      model.name = 'Even'
      boxes.push(model)
    } else {
      const box = new BoxModel(world, metaBox2)
      box.name = 'Odd'
    }
    metaBox.x += 30
    metaBox2.x += 30
  }

  // const conditions: ModelConditions = { isBarrier: true }
  // const models = world.findModels(conditions)
  // console.log(models)
  // window.setTimeout(() => {
  //   boxes.forEach((model) => {
  //     model.move(model.getX() - 10, model.getY() - 10)
  //     world.physic.getContinuum().run(models, 0.05)
  //   })
  // }, 2000)
  console.log(world.physic)
}

start()
