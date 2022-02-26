import { Link } from "gatsby"
import React from "react"
import Logo from "./logo"

import * as styles from "./header.module.scss"
import mute from "../images/mute.svg"
import unmute from "../images/unmute.svg"

import exitFullScreen from "../images/exitFullScreen1.svg"
import enterFullScreen from "../images/enterFullScreen.svg"

const Header = props => (
  <header className={styles.header}>
    <div className={"grid-x"}>
      <div className={"cell small-6 medium-6 " + styles.image}>
        <div className={styles.logo}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
      </div>
      <div className={"cell small-6 medium-6 " + styles.buttons}>
        <Link to="/info" className={styles.button}>
          INFO
        </Link>
        <button className={styles.imgButton} onClick={props.toggleAudio} title="MUTE">
          {/*props.muteAudio ? "UN-MUTE" : "MUTE"*/}
          {props.muteAudio ? <img src={unmute} className={styles.audioIcon} alt="MUTE" /> : <img src={mute} className={styles.audioIcon} alt="MUTE"/>}
        </button>
        <button className={styles.imgButton} onClick={props.toggleFullScreen} title="FULLSCREEN">
          {props.fullScreen ? <img src={exitFullScreen} className={styles.fullScreenIcon} alt="FULLSCREEN" /> : <img src={enterFullScreen} className={styles.fullScreenIcon} alt="FULLSCREEN" />}
        </button>
      </div>
    </div>
  </header>
)

export default Header
