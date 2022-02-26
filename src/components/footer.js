import React from "react"
import * as styles from "./footer.module.scss"
import { useStaticQuery, graphql } from "gatsby"
//import Img from "gatsby-image"
import * as statsStyles from "./stats.module.scss"

const Stats = props => (
  <div className={statsStyles.container}>
    <div className={"grid-x"}>
      <div className={"cell small-6 medium-3"}>
        <div className={statsStyles.inner}>
          <div className={statsStyles.left}>Selected :</div>
          <div className={statsStyles.right}>
            <ul className={statsStyles.list}>
              <li>
                {"Ƀ " +
                  props.selectedValueBTC
                    .toFixed(5)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </li>
              <li>
                {"$ " +
                  props.selectedValueUSD
                    .toFixed(5)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={"cell small-6 medium-3"}>
        <div className={statsStyles.inner}>
          <div className={statsStyles.left}>Largest :</div>
          <div className={statsStyles.right}>
            <ul className={statsStyles.list}>
              <li>
                {"Ƀ " +
                  props.biggestValueBTC
                    .toFixed(4)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </li>
              <li>
                {"$ " +
                  props.biggestValueUSD
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={"cell small-6 medium-3"}>
        <div className={statsStyles.inner}>
          <div className={statsStyles.left}>Smallest :</div>
          <div className={statsStyles.right}>
            <ul className={statsStyles.list}>
              <li>
                {"Ƀ " +
                  props.smallestValueBTC
                    .toFixed(8)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </li>
              <li>
                {"$ " +
                  props.smallestValueUSD
                    .toFixed(4)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={"cell small-6 medium-3"}>
        <div className={statsStyles.inner}>
          <div className={statsStyles.left}>Session :</div>
          <div className={statsStyles.right}>
            <ul className={statsStyles.list}>
              <li>
                {"Ƀ " +
                  props.totalValueBTC
                    .toFixed(4)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </li>
              <li>
                {"$ " +
                  props.totalValueUSD
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const Footer = props => {
  const cms = useStaticQuery(graphql`
    query {
      prismicFooter {
        data {
          banner {
            url
            alt
          }
          banner_link {
            raw
          }
        }
      }
    }
  `)
  return (


  <div className={styles.footer}>
    <Stats {...props} />
    {/*
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
        <Img
          className="banner"
          fluid={cms.prismicFooter.data.banner.localFile.childImageSharp.fluid}
        />
      </div>
      <div
        className={
          "cell small-6 medium-3 small-order-2 medium-order-3 " + styles.right
        }
      >
        Current price ${props.price}
      </div>
    </div>
    */}
    <div className={"grid-x " + styles.inner}>
      <div
        className={
          "cell small-6 medium-3 small-order-1 medium-order-1"
        }
      ></div>
      <div
        className={
          "cell small-12 medium-6 small-order-3 medium-order-2 " + styles.center
        }
      >
        <div className={styles.banner}>
        <a href={cms.prismicFooter.data.banner_link.url} target="_top">
        <img
          src={cms.prismicFooter.data.banner.url}
          alt={cms.prismicFooter.data.banner.alt}
        />
        </a>
        </div>
      </div>
      <div
        className={
          "cell small-6 medium-3 small-order-2 medium-order-3 "
        }
      >
      </div>
    </div>
  </div>
  )
}

export default Footer
