import * as THREE from "three"
//import OrbitControls from "three-orbitcontrols"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class AbstractThree {
  constructor(quality) {
    if (quality > 2) {
      this.antialias = true
    } else {
      this.antialias = false
    }

    this._camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    )
    this._camera.position.set(0, 5, 12)
    this._camera.lookAt(0, 0, 0)

    this._scene = new THREE.Scene()
    this._scene.fog = new THREE.FogExp2(0x444444, 0.025)

    this._renderer = new THREE.WebGLRenderer({
      antialias: this.antialias,
      alpha: false,
      precision: "mediump",
    })
    this._renderer.setClearColor(0x444444)
    this._renderer.setPixelRatio(window.devicePixelRatio)
    this._renderer.setSize(window.innerWidth, window.innerHeight)
    this._renderer.domElement.id = "canvas"
    //document.body.appendChild( this._renderer.domElement );

    this._controls = new OrbitControls(this._camera, this._renderer.domElement)
    //this._controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
    this._controls.enableDamping = true
    this._controls.dampingFactor = 0.25
    this._controls.enableZoom = true

    window.addEventListener("resize", this.onWindowResize.bind(this), false)
  }

  get renderer() {
    return this._renderer
  }

  get camera() {
    return this._camera
  }

  get scene() {
    return this._scene
  }

  onWindowResize() {
    var main = document.getElementById("main")

    this._renderer.setSize(main.clientWidth, main.clientHeight)
    this._camera.aspect = main.clientWidth / main.clientHeight
    this._camera.updateProjectionMatrix()
  }

  update() {
    this._controls.update()
    this._renderer.render(this._scene, this._camera)
  }
}
