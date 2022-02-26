import * as THREE from "three"
//import * as textures from './../controls/textures';

import meshPhongFrag from "./shaders/meshPhong.frag"
import meshPhysicalFrag from "./shaders/meshPhysical.frag"

import roughTexture from "./../textures/rough.jpg"
import bitcoinTexture from "./../textures/bitcoinTx.png"
import coinJoinTexture from "./../textures/coinjoin_inv.png"

export default class ThreeTransaction {
  constructor(quality) {
    this.quality = quality

    if (quality > 2) {
      this.anistropy = 16
    } else {
      this.anistropy = 4
    }

    this.roughTexture = new THREE.TextureLoader().load(roughTexture)
    this.roughTexture.wrapS = THREE.RepeatWrapping
    this.roughTexture.wrapT = THREE.RepeatWrapping
    this.roughTexture.repeat.set(2, 2)
    this.roughTexture.anisotropy = this.anistropy

    this.logoTexture = new THREE.TextureLoader().load(bitcoinTexture)
    this.logoTexture.anisotropy = this.anistropy

    this.coinJoinTexture = new THREE.TextureLoader().load(coinJoinTexture)
    this.coinJoinTexture.anisotropy = this.anistropy
  }

  transaction(val, coinjoin) {
    var size = Math.cbrt(val) * 0.2
    var material
    var map

    if (coinjoin) {
      map = this.coinJoinTexture
    } else {
      map = this.logoTexture
    }

    if (this.quality > 1) {
      material = new THREE.MeshStandardMaterial({
        color: this.getColour(val, coinjoin),
        map: map,
        metalness: 0.8,
        roughness: 1,
        roughnessMap: this.roughTexture,
        precision: "mediump",
      })

      material.onBeforeCompile = function(shader) {
        shader.fragmentShader = meshPhysicalFrag
      }
    } else {
      material = new THREE.MeshPhongMaterial({
        color: this.getColour(val, coinjoin),
        map: map,
      })

      material.onBeforeCompile = function(shader) {
        shader.fragmentShader = meshPhongFrag
      }
    }

    var sides = 24

    if (this.quality > 2) {
      sides = 36
    }

    var geometry = new THREE.SphereBufferGeometry(size, sides, sides)

    var ball = new THREE.Mesh(geometry, material)
    ball.position.set(0, 100, 0)
    ball.castShadow = true
    ball.receiveShadow = true

    return ball
  }

  getColour(val, coinjoin) {
    var color = new THREE.Color()

    var hue = 0
    var sat = 0.45
    var lig = 0.45
    var div = 1 / 6
    var shift = 0.73

    if (this.quality < 2) {
      sat = 0.4
      lig = 0.25
    }

    if (val > 1000) {
      hue = shift + div * 6
    } else if (val > 100) {
      hue = shift + div * 5
    } else if (val > 10) {
      hue = shift + div * 4
    } else if (val > 1) {
      hue = shift + div * 3
    } else if (val > 0.1) {
      hue = shift + div * 2
    } else {
      hue = shift + div
    }

    if (coinjoin === true) {
      sat = 1
      lig = 9.5
    }

    color.setHSL(hue, sat, lig)

    return color
  }

  // color = new THREE.Color(0xaa3838),
  // color = new THREE.Color(0x38aa65),
  // color = new THREE.Color(0xAA6538),
  // color = new THREE.Color(0xAAAA38),
  // color = new THREE.Color(0x3884AA),
  // color = new THREE.Color(0x7b38aa),
}
