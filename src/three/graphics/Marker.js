import * as THREE from "three"

export default class Marker {
  constructor(scene) {
    this._scene = scene
    this._start = Date.now()
    this.addMarker()
  }

  addMarker() {
    var markerGeo = new THREE.BufferGeometry().fromGeometry(
      new THREE.CylinderGeometry(0.15, 0, 0.75, 4)
    )
    var markerMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.5,
      roughness: 0.5,
      metalness: 0.5,
      transparent: true,
      opacity: 0.5,
    })
    this._marker = new THREE.Mesh(markerGeo, markerMat)
    this._marker.position.set(0, -4000, 0)
    this._scene.add(this._marker)
  }

  update(selected) {
    var timer = Date.now() - this._start
    this._marker.position.copy(selected.position)
    if (selected.userData.type === "transaction") {
      this._marker.position.y +=
        Math.abs(Math.sin(timer * 0.002)) * 0.25 +
        (selected.geometry.parameters.radius + 0.4)
    }
    if (selected.userData.type === "block") {
      this._marker.position.y +=
        Math.abs(Math.sin(timer * 0.002)) * 0.25 +
        selected.geometry.parameters.height
    }
  }
}
