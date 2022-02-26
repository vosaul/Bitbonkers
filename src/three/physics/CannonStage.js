import * as CANNON from "cannon"
import AbstractPhysics from "./AbstractPhysics"

export default class CannonStage extends AbstractPhysics {
  constructor() {
    super()

    this._groundMaterial = new CANNON.Material("ground")
    this._sphereMaterial = new CANNON.Material("sphere")

    this._sphere_ground = new CANNON.ContactMaterial(
      this._groundMaterial,
      this._sphereMaterial,
      {
        friction: 0.01,
        restitution: 0.2, // HOW MUCH BOUNCE - higher number higher bounce
      }
    )

    this._world.addContactMaterial(this._sphere_ground)

    this._sphere_sphere = new CANNON.ContactMaterial(
      this._sphereMaterial,
      this._sphereMaterial,
      {
        friction: 0.01,
        restitution: 0.2, // HOW MUCH BOUNCE - higher number higher bounce
      }
    )

    this._world.addContactMaterial(this._sphere_sphere)

    this._ToRad = 0.0174532925199432957

    this.addPlatform()
  }

  addPlatform() {
    var size = 5

    var halfExtents = new CANNON.Vec3(size, 1, size)
    var boxShape = new CANNON.Box(halfExtents)
    var boxBody = new CANNON.Body({
      mass: 0,
      material: this._groundMaterial,
    })
    boxBody.addShape(boxShape)
    boxBody.position.set(0, -0.5, 0)
    this._world.addBody(boxBody)
  }

  addTransaction(val, backlog) {
    var size = Math.cbrt(val) * 0.2

    var shape = new CANNON.Sphere(size)
    var position = this.randomPosition()
    if (backlog > 0) {
      position.y += backlog * 0.1
      //console.log("Y height : " + (position.y));
    }
    var rotation = this.randomRotation()
    var linearVelocity = this.randomLinearVelocity(1)
    var angularVelocity = this.randomAngularVelocity(10)

    var body = new CANNON.Body({
      mass: size * 10,
      material: this._sphereMaterial,
    })

    body.addShape(shape)
    body.position.copy(position)
    body.quaternion.copy(rotation)
    body.angularVelocity.copy(angularVelocity)
    body.velocity.copy(linearVelocity)
    body.linearDamping = 0.025
    body.angularDamping = 0.025
    //body.linearDamping = 0.05;
    //body.angularDamping = 0.05;

    this._world.addBody(body)
    return body
  }

  addBlock(val) {
    var size = (Math.cbrt(val) * 0.1) / 2 //Half Extents

    var shape = new CANNON.Box(new CANNON.Vec3(size, size, size))
    var position = this.randomPosition()
    var rotation = this.randomRotation()
    var linearVelocity = this.randomLinearVelocity(1)
    var angularVelocity = this.randomAngularVelocity(10)

    var body = new CANNON.Body({
      mass: size * 25,
      material: this._sphereMaterial,
    })

    body.addShape(shape)
    body.position.copy(position)
    body.quaternion.copy(rotation)
    body.angularVelocity.copy(angularVelocity)
    body.velocity.copy(linearVelocity)
    body.linearDamping = 0.25
    body.angularDamping = 0.25

    this._world.addBody(body)
    return body
  }

  randomPosition() {
    var x = -3 + Math.random() * 6
    //var y = (30 + Math.random() * 20);
    var y = 40
    var z = -3 + Math.random() * 6

    var position = new CANNON.Vec3(x, y, z)

    return position
  }

  randomRotation() {
    var rx = Math.floor(Math.random() * 360 + 1) * this._ToRad
    var ry = Math.floor(Math.random() * 360 + 1) * this._ToRad
    var rz = Math.floor(Math.random() * 360 + 1) * this._ToRad

    var q = new CANNON.Quaternion()
    q.setFromEuler(rx, ry, rz)

    return q
  }

  randomLinearVelocity(max) {
    var x = (0.5 - Math.random()) * max
    var y = (0.5 - Math.random()) * max
    var z = (0.5 - Math.random()) * max
    var linearVelocity = new CANNON.Vec3(x, y, z)

    return linearVelocity
  }

  randomAngularVelocity(max) {
    var x = (0.5 - Math.random()) * max
    var y = (0.5 - Math.random()) * max
    var z = (0.5 - Math.random()) * max
    var angularVelocity = new CANNON.Vec3(x, y, z)

    return angularVelocity
  }

  jumble(body) {
    var linearVelocity = this.randomLinearVelocity(60)
    body.velocity.copy(linearVelocity)
    var angularVelocity = this.randomAngularVelocity(60)
    body.angularVelocity.copy(angularVelocity)
  }
}
