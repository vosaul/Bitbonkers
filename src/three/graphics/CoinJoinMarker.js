import * as THREE from "three"

export default class Marker {
  constructor(scene, tx) {
    this._scene = scene
    this._tx = tx
    this._start = Date.now()
    this.addMarker()
  }

  addMarker() {
    var markerGeo = new THREE.BufferGeometry().fromGeometry(
      new THREE.CylinderGeometry(0.1, 0, 0.1618, 12)
    )
    var markerMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      //emissive: 0xffffff,
      //emissiveIntensity: 0.5,
      roughness: 0.5,
      metalness: 0.5,
      transparent: true,
      opacity: 1,
    })
    this._marker = new THREE.Mesh(markerGeo, markerMat)
    this._marker.position.set(0, 4000, 0)
    this._scene.add(this._marker)
  }

  removeMarker() {
    this._marker.geometry.dispose()
    this._marker.material.dispose()
  }

  exists() {
    if (this._tx) {
      return true
    } else {
      return false
    }
  }

  get body() {
    return this._marker
  }

  update() {
    var timer = Date.now() - this._start
    this._marker.position.copy(this._tx.position)
    //this._marker.position.y += Math.abs(Math.sin(timer * 0.002)) * 0.25 + (this._tx.geometry.parameters.radius + 0.4);
    this._marker.position.y +=
      this._tx.geometry.parameters.radius +
      this._tx.geometry.parameters.radius * 0.35 +
      0.1618
  }
}
