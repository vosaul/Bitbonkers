import React, { Component } from "react"
import * as THREE from "three"
import "./../components/app.css"
import "./../components/foundation.min.css"

import ThreeStage from "./graphics/ThreeStage"
import CannonStage from "./physics/CannonStage"
import BlockchainWebsocket from "./controls/BlockchainWebsocket"
import ThreeBlock from "./graphics/ThreeBlock"
import ThreeTransaction from "./graphics/ThreeTransaction"
import Marker from "./graphics/Marker"
import Audio from "./controls/Audio"
import loadImage from "image-promise"
import delay from "delay"

import Loading from "./../components/loading"
import Header from "../components/header.js"
//import Stats from "./../components/stats"
import Footer from "./../components/footer"
import InfoPanel from "./../components/infoPanel"

import roughTexture from "./textures/rough.jpg"
import bitcoinTexture from "./textures/bitcoinTx.png"

export default class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      biggestValueBTC: 0,
      smallestValueBTC: 100000,
      selectedValueBTC: 0,
      totalValueBTC: 0,
      biggestValueUSD: 0,
      smallestValueUSD: 100000,
      selectedValueUSD: 0,
      totalValueUSD: 0,
      loaded: false,
      play: false,
      connected: false,
      muteAudio: false,
      focused: true,
      price: 0,
      firstRun: false,
      quality: 0,
      panelOpen: false,
      fullScreen: false,
    }

    this.backlog = 0
  }

  closePanel = () => {
    this.setState({ panelOpen: false })
    ;(async () => {
      await delay(10)
      window.dispatchEvent(new Event("resize"))
    })()
  }

  render = () => {
    const { children } = this.props
    return (
      <>
        <div
          id="main"
          ref={mount => {
            this.mount = mount
          }}
          className={this.state.panelOpen ? "panelOpen" : null}
        >
          <Loading
            buttonClick={this.init.bind(this)}
            loaded={this.state.loaded}
            play={this.state.play}
          />
          <Header
            muteAudio={this.state.muteAudio}
            toggleAudio={this.toggleAudio.bind(this)}
            fullScreen={this.state.fullScreen}
            toggleFullScreen={this.toggleFullScreen.bind(this)}
          />
          {children}
          <Footer {...this.state} />
        </div>
        <div id="sidebar">
          <InfoPanel
            selected={this._selected}
            closePanel={this.closePanel.bind(this)}
          />
        </div>
      </>
    )
  }

  componentDidMount = () => {
    this.elem = document.documentElement;

    if (this.state.firstRun === false) {
      loadImage([bitcoinTexture, roughTexture])
        .then(
          function(allImgs) {
            this.roughImg = allImgs[1]
            // IMAGES LOADED, MAKE BUTTONS AVAILABLE
            this.setState({ loaded: true })
          }.bind(this)
        )
        .catch(function(e) {
          console.error("There was an error loading, please try later")
          console.log(e)
        })

      this.setState({ firstRun: true })
    }
  }

  init = quality => {
    this.setState({ play: true })
    this.setState({ quality: quality })

    //this.openFullscreen()

    //UPDATE PRICE EVERY MINUTE
    this.price()
    setInterval(() => {
      this.price()
    }, 60000)

    this.bodies = []

    this._raycaster = new THREE.Raycaster()
    this._mouse = new THREE.Vector2()

    this.callbacks = {
      addTransaction: this.addTransaction.bind(this),
      addBlock: this.addBlock.bind(this),
      connectionStatus: this.connectionStatus.bind(this),
    }

    new BlockchainWebsocket(this.callbacks)

    this.audio = new Audio()
    this.audio.muteSound(this.state.muteAudio)

    this.cannonStage = new CannonStage(quality)
    this.threeStage = new ThreeStage(quality)
    this.threeTransaction = new ThreeTransaction(quality)
    this.threeBlock = new ThreeBlock(this.roughImg, quality)
    this.marker = new Marker(this.threeStage.scene)

    this._mouseDown = 0
    this._selected = undefined

    if (/*@cc_on!@*/ false) {
      // check for Internet Explorer
      document.onfocusin = this.onFocus.bind(this)
      document.onfocusout = this.onBlur.bind(this)
    } else {
      window.onfocus = this.onFocus.bind(this)
      window.onblur = this.onBlur.bind(this)
    }

    var canvas = this.threeStage.renderer.domElement
    canvas.id = "canvas"
    this.mount.appendChild(canvas)

    canvas.addEventListener("mousedown", this.onMouseDown.bind(this), false)
    canvas.addEventListener("mouseup", this.onMouseUp.bind(this), false)
    canvas.addEventListener("touchstart", this.onTouchStart.bind(this), false)

    document.addEventListener(
      "keydown",
      function(e) {
        if (e.keyCode === 32) {
          e.preventDefault()
          this.jumbleScene()
        }
      }.bind(this)
    )

    this.animate()
  }

  animate = time => {
    requestAnimationFrame(this.animate.bind(this))

    this.cannonStage.update(time)

    var body,
      i = this.bodies.length

    while (i--) {
      body = this.bodies[i]

      if (!body.cannon.sleepState) {
        body.three.position.copy(body.cannon.position)
        body.three.quaternion.copy(body.cannon.quaternion)

        if (body.three.position.y < -40) {
          body.three.geometry.dispose()
          body.three.material.dispose()
          this.threeStage.ballContainer.remove(body.three)
          this.cannonStage.world.removeBody(body.cannon)
          this.bodies.splice(i, 1)
        }
      }
    }

    if (this._selected) {
      this.marker.update(this._selected)
    }

    this.threeStage.update()
  }

  addTransaction = data => {
    var inLen = data.inputs.length
    var inVal = 0
    for (var i = 0; i < inLen; i++) {
      inVal += data.inputs[i].prev_out.value
    }
    inVal = inVal / 100000000

    var outLen = data.out.length
    var outVal = 0
    for (var j = 0; j < outLen; j++) {
      outVal += data.out[j].value
    }
    outVal = outVal / 100000000

    // UI STATS
    if (outVal > this.state.biggestValueBTC) {
      this.setState({ biggestValueBTC: outVal })
    }
    if (outVal * this.state.price > this.state.biggestValueUSD) {
      this.setState({ biggestValueUSD: outVal * this.state.price })
    }
    if (outVal < this.state.smallestValueBTC) {
      this.setState({ smallestValueBTC: outVal })
    }
    if (outVal * this.state.price < this.state.smallestValueUSD) {
      this.setState({ smallestValueUSD: outVal * this.state.price })
    }
    this.setState({ totalValueBTC: this.state.totalValueBTC + outVal })
    this.setState({
      totalValueUSD: this.state.totalValueUSD + outVal * this.state.price,
    })

    //IF BROWSER WINDOW IS NOT FOCUSSED LIMIT TX BACKLOG AND SPACE OUT PLACEMENT
    if (this.state.focused === false) {
      this.backlog++
      //console.log(this.backlog);
      if (this.backlog > 500) {
        return
      }
    } else if (this.state.focused === true && this.backlog > 0) {
      this.backlog = 0
    }

    var body = this.cannonStage.addTransaction(outVal, this.backlog)

    var volume = 0
    var speed = 0

    if (outVal > 1000) {
      volume = 5
      speed = 0.4 + Math.random() * 0.05
    } else if (outVal > 100) {
      volume = 4
      speed = 0.45 + Math.random() * 0.05
    } else if (outVal > 10) {
      volume = 3
      speed = 0.5 + Math.random() * 0.05
    } else if (outVal > 1) {
      volume = 2
      speed = 0.55 + Math.random() * 0.05
    } else if (outVal > 0.1) {
      volume = 1
      speed = 0.6 + Math.random() * 0.05
    } else {
      volume = 0
      speed = 0.65 + Math.random() * 0.05
    }

    body.userData = {}
    body.userData.volume = volume
    body.userData.speed = speed

    var that = this

    body.addEventListener("collide", function handler(e) {
      if (e.contact.getImpactVelocityAlongNormal() > 5) {
        that.audio.playSound(this.userData.speed, this.userData.volume)
      }
    })

    var coinjoin = this.isCoinJoinLike(data)

    var mesh = this.threeTransaction.transaction(outVal, coinjoin)
    this.threeStage.ballContainer.add(mesh)

    mesh.userData.type = "transaction"
    mesh.userData.outVal = outVal
    mesh.userData.inVal = inVal
    mesh.userData.fee = inVal - outVal
    mesh.userData.tx = data
    mesh.userData.coinjoin = coinjoin

    this.bodies.push({
      cannon: body,
      three: mesh,
    })
  }

  addBlock = data => {
    var value = data.totalBTCSent / 100000000
    var height = data.height

    var body = this.cannonStage.addBlock(value)

    var that = this

    body.addEventListener("collide", function handler(e) {
      if (e.contact.getImpactVelocityAlongNormal() < 5) {
        this.removeEventListener("collide", handler)
      } else {
        that.audio.playSound(0.5 + Math.random() * 0.1, 4)
      }
    })

    var mesh = this.threeBlock.block(value, height)
    this.threeStage.ballContainer.add(mesh)

    mesh.userData.type = "block"
    mesh.userData.value = value
    mesh.userData.block = data

    this.bodies.push({
      cannon: body,
      three: mesh,
    })
  }

  counter = (T = {}) => key => (T[key] = (T[key] || 0) + 1)

  isCoinJoinLike = tx => {
    const inc = this.counter(),
      target = Math.min(Math.max((tx.out.length / 2) | 0, 2), 5)
    return tx.inputs.length > 1 && tx.out.some(out => inc(out.value) >= target)
  }

  connectionStatus = status => {
    this.setState({ connected: status })
  }

  toggleAudio = () => {
    this.audio.muteSound(!this.state.muteAudio)
    this.setState({ muteAudio: !this.state.muteAudio })
  }

  onTouchStart = event => {
    event.preventDefault()

    event.clientX = event.touches[0].clientX
    event.clientY = event.touches[0].clientY
    this.onMouseDown(event)
  }

  onMouseDown = event => {
    event.preventDefault()

    var main = document.getElementById("main")

    this._mouse.x = (event.clientX / main.clientWidth) * 2 - 1
    this._mouse.y = -(event.clientY / main.clientHeight) * 2 + 1

    this._raycaster.setFromCamera(this._mouse, this.threeStage._camera)

    var intersects = this._raycaster.intersectObjects(
      this.threeStage.ballContainer.children
    )

    if (intersects.length > 0) {
      this._selected = intersects[0].object

      if (this._selected.userData.type === "block") {
        this.setState({ selectedValueBTC: this._selected.userData.value })
        this.setState({
          selectedValueUSD: this._selected.userData.value * this.state.price,
        })
      } else {
        this.setState({ selectedValueBTC: this._selected.userData.outVal })
        this.setState({
          selectedValueUSD: this._selected.userData.outVal * this.state.price,
        })
      }

      if (!this.state.panelOpen) {
        this.setState({ panelOpen: true })
        ;(async () => {
          await delay(10)
          window.dispatchEvent(new Event("resize"))
        })()
      }
    }

    this._mouseDown = 1
  }

  onMouseUp = event => {
    event.preventDefault()
    this._mouseDown = 0
  }

  onBlur = () => {
    this.setState({ focused: false })
  }

  onFocus = () => {
    this.setState({ focused: true })
  }

  price = () => {
    fetch("https://blockchain.info/ticker")
      .then(response => response.json())
      .then(json => {
        this.setState({ price: json.USD.last })
      })
      .catch(err => console.log(err))
  }

  jumbleScene = () => {
    var len = this.bodies.length
    for (var i = 0; i < len; i++) {
      this.cannonStage.jumble(this.bodies[i].cannon)
    }
  }

  toggleFullScreen = () => {
    console.log("fullscreen toggle")
    if(this.state.fullScreen === true){
      this.closeFullscreen()
    }else{
      this.openFullscreen()
    }
  }

  openFullscreen = () => {
    console.log("open fullscreen")
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) { /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) { /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
    this.setState({ fullScreen: true })
  }

  closeFullscreen = () => {
    console.log("close fullscreen")
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
    this.setState({ fullScreen: false })
  }
}
