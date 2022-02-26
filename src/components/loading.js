import React from "react"
/* import Logo from "./logo" */
import { useStaticQuery, graphql } from "gatsby"

import * as styles from "./loading.module.scss"

const buttonClick = (clickHandler, size) => {
  clickHandler(size)
}

export default props => {
  const data = useStaticQuery(graphql`
    query {
      prismicLoading {
        data {
          top {
            text
          }
          bottom {
            html
          }
        }
      }
    }
  `)
  return (
    <div
      className={styles.container}
      style={props.play ? { display: "none" } : { display: "block" }}
    >
      <h1>{data.prismicLoading.data.top.text}</h1>
      <div className={styles.logo}>
        <img src="/images/logo.png" />
      </div>
      <div
        className={styles.loading}
        style={props.loaded ? { display: "none" } : { display: "" }}
      >
        Loading...
      </div>
      <div
        className={styles.options}
        style={props.loaded ? { display: "block" } : { display: "" }}
      >
        <button onClick={buttonClick.bind(null, props.buttonClick, 1)}>
          low
        </button>
        <button onClick={buttonClick.bind(null, props.buttonClick, 2)}>
          medium
        </button>
        <button onClick={buttonClick.bind(null, props.buttonClick, 3)}>
          high
        </button>
      </div>
      <div
        className={styles.bottomText}
        dangerouslySetInnerHTML={{
          __html: data.prismicLoading.data.bottom.html,
        }}
      />
    </div>
  )
}
