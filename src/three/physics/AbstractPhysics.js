const CANNON = require("cannon")

export default class AbstractCannon {
  constructor() {
    this._world = new CANNON.World()
    this._world.broadphase = new CANNON.NaiveBroadphase()
    //this._world.broadphase = new CANNON.SAPBroadphase(this._world);
    this._world.broadphase.useBoundingBoxes = true
    this._world.allowSleep = false
    this._world.gravity.set(0, -9.82, 0)

    this._world.solver.iterations = 10
    this._world.defaultContactMaterial.contactEquationStiffness = 1e8
    this._world.defaultContactMaterial.contactEquationRegularizationTime = 3
    this._world.defaultContactMaterial.contactEquationRelaxation = 4

    this.lastTime = 0
    this.fixedTimeStep = 1.0 / 60.0
    this.maxSubSteps = 3
  }

  get world() {
    return this._world
  }

  update(time) {
    //var dt = 1 / 60;
    //this._world.step(dt);

    var dt = (time - this.lastTime) / 1000
    this._world.step(this.fixedTimeStep, dt, this.maxSubSteps)
    this.lastTime = time
  }

  addBody(body) {
    this._world.addBody(body)
  }

  removeBody(body) {
    this._world.removeBody(body)
  }

  addConstraint(constraint) {
    this._world.addConstraint(constraint)
  }

  removeConstraint(constraint) {
    this._world.removeConstraint(constraint)
  }

  addContactMaterial(material) {
    this._world.addContactMaterial(material)
  }
}
