import React from "react"
import styles from "./footer.module.scss"
import { useStaticQuery, graphql } from "gatsby"

const Footer = props => (
  <div className={styles.footer}>
    <div className={"grid-x " + styles.inner}>
      <div
        className={
          "cell small-6 medium-3 small-order-1 medium-order-1 " + styles.left
        }
      >
        Websocket : {props.connected ? "connected" : "disconnected"}
      </div>
      <div
        className={
          "cell small-12 medium-6 small-order-3 medium-order-2 " + styles.center
        }
      >
        <a href="https://billfodl.com" target="_parent">
          backup your crypto in steel
        </a>
      </div>
      <div
        className={
          "cell small-6 medium-3 small-order-2 medium-order-3 " + styles.right
        }
      >
        Current price ${props.price}
      </div>
    </div>
  </div>
)

export default Footer
