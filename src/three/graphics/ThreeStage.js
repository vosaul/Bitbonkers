import * as THREE from "three"
import AbstractThree from "./AbstractThree"
import roughTexture from "./../textures/rough.jpg"

export default class ThreeStage extends AbstractThree {
  constructor(quality) {
    super(quality)

    this._raycaster = new THREE.Raycaster()
    this._mouse = new THREE.Vector2()

    this._renderer.shadowMap.enabled = true

    if (quality === 3) {
      this._renderer.shadowMap.type = THREE.PCFSoftShadowMap
      this.anistropy = 16
    } else if (quality === 2) {
      this._renderer.shadowMap.type = THREE.PCFSoftShadowMap
      this.anistropy = 4
    } else {
      this._renderer.shadowMap.type = THREE.PCFShadowMap
      this.anistropy = 4
    }

    this.anistropy = 0

    this._ballContainer = new THREE.Group()
    this._scene.add(this._ballContainer)

    this.addPlatform(quality)
    this.addLights(quality)
    //this.addDome();
  }

  addDome() {
    var sides = 18

    var geometry = new THREE.SphereBufferGeometry(40, sides, sides)
    var material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x9dc1c9),
      metalness: 0.2,
      roughness: 0.8,
      side: THREE.BackSide,
      flatShading: true,
    })
    var dome = new THREE.Mesh(geometry, material)
    this._scene.add(dome)
  }

  addLights() {
    var light1 = new THREE.DirectionalLight(0xffffff, 0.8)
    light1.position.set(10, 20, 10)
    light1.target.position.set(0, 0, 0)
    light1.castShadow = true
    light1.shadow.camera.near = 10
    light1.shadow.camera.far = 30
    light1.shadow.bias = 0.0001

    var d = 7
    light1.shadow.camera.left = -d
    light1.shadow.camera.right = d
    light1.shadow.camera.top = d
    light1.shadow.camera.bottom = -d

    light1.shadow.mapSize.width = light1.shadow.mapSize.height = 1024
    this._scene.add(light1)

    //this._scene.add( new THREE.CameraHelper( light.shadow.camera ) );

    this._scene.add(new THREE.AmbientLight(0x999999))
  }

  addPlatform(quality) {
    //#########################
    // MATERIAL
    //#########################

    var boxMaterial = []

    if (quality > 1) {
      //#########################
      // CANVAS GRADIENT MAP
      //#########################

      var width = 1024
      var height = 1024

      var mapCanvas = document.createElement("canvas")
      mapCanvas.width = width
      mapCanvas.height = height

      var mapCTX = mapCanvas.getContext("2d")

      var gradient = mapCTX.createRadialGradient(512, 512, 512, 512, 512, 0)
      gradient.addColorStop(0, "#535353")
      gradient.addColorStop(1, "#8a8a8a")

      mapCTX.fillStyle = gradient
      mapCTX.fillRect(0, 0, width, height)

      var topMap = new THREE.Texture(mapCanvas)
      topMap.anisotropy = this.anistropy
      topMap.needsUpdate = true

      //#########################
      // TEXTURE ROUGH
      //#########################

      var roughTextureTop = new THREE.TextureLoader().load(roughTexture)
      roughTextureTop.wrapS = THREE.RepeatWrapping
      roughTextureTop.wrapT = THREE.RepeatWrapping
      roughTextureTop.repeat.set(2, 2)
      roughTextureTop.anisotropy = this.anistropy

      var roughTextureSide = new THREE.TextureLoader().load(roughTexture)
      roughTextureSide.wrapS = THREE.RepeatWrapping
      roughTextureSide.wrapT = THREE.RepeatWrapping
      roughTextureSide.repeat.set(2, 0.1)
      roughTextureSide.anisotropy = this.anistropy

      //#########################
      // MATERIAL
      //#########################

      // boxMaterial = new THREE.MeshStandardMaterial({
      //   color: 0xffffff,
      //   map: topMap,
      //   metalness: 0.5,
      //   roughness: 0.5,
      //   roughnessMap: roughTextureTop,
      //   bumpScale: 0.1,
      //   bumpMap: bumpTextureTop,
      // })

      boxMaterial = [
        new THREE.MeshStandardMaterial({
          color: 0x535353,
          metalness: 0.5,
          roughness: 1,
          roughnessMap: roughTextureSide,
          bumpScale: 0.01,
          bumpMap: roughTextureSide,
          precision: "highp",
        }),
        new THREE.MeshStandardMaterial({
          color: 0x535353,
          metalness: 0.5,
          roughness: 1,
          roughnessMap: roughTextureSide,
          bumpScale: 0.01,
          bumpMap: roughTextureSide,
          precision: "highp",
        }),
        //###### TOP ######
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
          map: topMap,
          metalness: 0.5,
          roughness: 1,
          roughnessMap: roughTextureTop,
          bumpScale: 0.02,
          bumpMap: roughTextureTop,
          precision: "highp",
        }),
        //###### BOTTOM ######
        new THREE.MeshStandardMaterial({
          color: 0x535353,
          metalness: 0.5,
          roughness: 1,
          precision: "highp",
        }),
        new THREE.MeshStandardMaterial({
          color: 0x535353,
          metalness: 0.5,
          roughness: 1,
          roughnessMap: roughTextureSide,
          bumpScale: 0.01,
          bumpMap: roughTextureSide,
          precision: "highp",
        }),
        new THREE.MeshStandardMaterial({
          color: 0x535353,
          metalness: 0.5,
          roughness: 1,
          roughnessMap: roughTextureSide,
          bumpScale: 0.01,
          bumpMap: roughTextureSide,
          precision: "highp",
        }),
      ]
    } else {
      boxMaterial = new THREE.MeshLambertMaterial({
        color: 0x444444,
      })
    }

    var size = 10

    var boxGeometry = new THREE.BoxBufferGeometry(size, 0.5, size)

    var boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
    boxMesh.position.set(0, 0.25, 0)
    boxMesh.receiveShadow = true
    boxMesh.castShadow = true
    this._scene.add(boxMesh)
  }

  get ballContainer() {
    return this._ballContainer
  }
}
