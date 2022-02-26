import React from "react"
import styles from "./stats.module.scss"

const Stats = props => (
  <div className={styles.container}>
    <div className={"grid-x"}>
      <div className={"cell small-6 medium-3"}>
        <div className={styles.inner}>
          <div className={styles.left}>Selected :</div>
          <div className={styles.right}>
            <ul className={styles.list}>
              <li>
                {"Ƀ " +
                  props.selectedValueBTC
                    .toFixed(5)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </li>
              <li>
                {"$ " + props.selectedValueUSD
                    .toFixed(1)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={"cell small-6 medium-3"}>
        <div className={styles.inner}>
          <div className={styles.left}>Largest :</div>
          <div className={styles.right}>
            <ul className={styles.list}>
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
        <div className={styles.inner}>
          <div className={styles.left}>Smallest :</div>
          <div className={styles.right}>
            <ul className={styles.list}>
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
        <div className={styles.inner}>
          <div className={styles.left}>Session :</div>
          <div className={styles.right}>
            <ul className={styles.list}>
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

export default Stats
