import * as THREE from "three"
//import * as textures from './../controls/textures';

import rough from "./../textures/rough.jpg"

export default class ThreeBlock {
  constructor(image, quality) {
    this.roughImg = image
    this.quality = quality

    if (quality > 2) {
      this.anistropy = 16
    } else {
      this.anistropy = 4
    }

    this.roughTexture = new THREE.TextureLoader().load(rough)
    this.roughTexture.wrapS = THREE.RepeatWrapping
    this.roughTexture.wrapT = THREE.RepeatWrapping
    this.roughTexture.repeat.set(2, 2)
    this.roughTexture.anisotropy = this.anistropy
  }

  block(val, height) {
    var size = Math.cbrt(val) * 0.1

    var geometry = new THREE.BoxBufferGeometry(size, size, size)

    var material = this.material(height)
    //material.needsUpdate = true;

    var box = new THREE.Mesh(geometry, material)

    box.position.set(0, 100, 0)
    box.castShadow = true
    box.receiveShadow = true

    return box
  }

  material(blockHeight) {
    var width = 1024
    var height = 1024

    //#########################
    // TEXTURE MAP
    //#########################

    var left = width / 2
    var top = height / 2 + 80

    var mapCanvas = document.createElement("canvas")
    mapCanvas.width = width
    mapCanvas.height = height

    var mapCTX = mapCanvas.getContext("2d")

    var gradient = mapCTX.createRadialGradient(512, 512, 512, 512, 512, 100)

    if (this.quality > 1) {
      gradient.addColorStop(0, "hsl(50, 100%, 40%)")
      gradient.addColorStop(1, "hsl(42, 88%, 38%)")
    } else {
      gradient.addColorStop(0, "hsl(50, 90%, 30%)")
      gradient.addColorStop(1, "hsl(42, 78%, 28%)")
    }

    mapCTX.fillStyle = gradient
    mapCTX.fillRect(0, 0, width, height)
    mapCTX.fillStyle = "white"
    mapCTX.textAlign = "center"
    mapCTX.font = "900 200px Lato"
    mapCTX.fillText(blockHeight, left, top)

    var map = new THREE.Texture(mapCanvas)
    map.needsUpdate = true
    map.anisotropy = this.anistropy

    //#########################
    // TEXTURE BUMP
    //#########################

    var bumpCanvas = document.createElement("canvas")
    bumpCanvas.width = width
    bumpCanvas.height = height

    var bumpCTX = bumpCanvas.getContext("2d")
    bumpCTX.drawImage(this.roughImg, 0, 0, height, width)
    //bumpCTX.fillStyle = "black";
    //bumpCTX.fillRect(0, 0, width, height);
    bumpCTX.fillStyle = "#cccccc"
    bumpCTX.textAlign = "center"
    bumpCTX.font = "900 200px Lato"
    bumpCTX.fillText(blockHeight, left, top)

    var bump = new THREE.Texture(bumpCanvas)
    bump.needsUpdate = true
    bump.anisotropy = this.anistropy

    //#########################
    // TEXTURE EMISSIVE
    //#########################

    var emissiveCanvas = document.createElement("canvas")
    emissiveCanvas.width = width
    emissiveCanvas.height = height

    var emissiveCTX = emissiveCanvas.getContext("2d")
    emissiveCTX.fillStyle = "black"
    emissiveCTX.fillRect(0, 0, width, height)
    emissiveCTX.fillStyle = "white"
    emissiveCTX.textAlign = "center"
    emissiveCTX.font = "900 200px Lato"
    emissiveCTX.fillText(blockHeight, left, top)

    var emissive = new THREE.Texture(emissiveCanvas)
    emissive.needsUpdate = true
    emissive.anisotropy = this.anistropy

    //#########################
    // MATERIAL
    //#########################

    var material

    if (this.quality > 1) {
      material = new THREE.MeshStandardMaterial({
        map: map,
        bumpMap: bump,
        bumpScale: -0.01,
        name: "block",
        roughnessMap: this.roughTexture,
        roughness: 1,
        metalness: 0.8,
        emissiveMap: emissive,
        emissive: 0xffffff,
        emissiveIntensity: 0.1,
        precision: "highp",
      })
    } else {
      material = new THREE.MeshLambertMaterial({
        map: map,
        name: "block",
        emissiveMap: emissive,
        emissive: 0xffffff,
        emissiveIntensity: 0.1,
      })
    }

    return material
  }
}
