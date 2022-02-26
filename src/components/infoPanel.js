import React from "react"
import * as styles from "./infoPanel.module.scss"
import { useStaticQuery, graphql } from "gatsby"

const InfoPanel = (props) => {
  const Cms = useStaticQuery(graphql`
    query {
      prismicPanel {
        data {
          transaction {
            html
          }
          block {
            html
          }
        }
      }
    }
  `)

  const transaction = () => {
    //var inVal = props.selected.userData.inVal;
    var outVal = props.selected.userData.outVal
    var fee = props.selected.userData.fee
    var tx = props.selected.userData.tx
    var size = props.selected.userData.tx.size
    var time = new Date(props.selected.userData.tx.time * 1000).toUTCString()
    var coinjoin = props.selected.userData.coinjoin
    var address

    const inputs = []
    const outputs = []

    if (coinjoin) {
      coinjoin = [
        <>
          <div className={"grid-x " + styles.inner}>
            <div className={"cell small-12 medium-12"}>
              This is a possible coinjoin transaction
            </div>
          </div>
          <hr />
        </>,
      ]
    }

    for (const [index, value] of tx.inputs.entries()) {
      inputs.push(
        <>
          <div
            className={"cell small-9 medium-9 " + styles.address}
            key={index}
          >
            {value.prev_out.addr}
          </div>
          <div className={"cell small-3 medium-3"}>
            <span className={styles.right}>
              {(value.prev_out.value / 100000000).toFixed(8)} BTC
            </span>
          </div>
        </>
      )
    }

    for (const [index, value] of tx.out.entries()) {
      if (value.addr !== null) {
        address = value.addr
      } else {
        address = "OP_RETURN"
      }
      outputs.push(
        <>
          <div
            className={"cell small-9 medium-9 " + styles.address}
            key={index}
          >
            {address}
          </div>
          <div className={"cell small-3 medium-3"}>
            <span className={styles.right}>
              {(value.value / 100000000).toFixed(8)} BTC
            </span>
          </div>
        </>
      )
    }

    return (
      <>
        <div className={styles.info}>
          <div className={"grid-x " + styles.inner}>
            <div className={"cell small-12 medium-12"}>Transaction Hash</div>
          </div>
          <div className={"grid-x " + styles.inner}>
            <div className={"cell small-12 medium-12 " + styles.hash}>
              {tx.hash}
            </div>
          </div>
          <hr />
          <div className={"grid-x " + styles.inner}>
            <div className={"cell small-12 medium-12"}>
              Value<span className={styles.right}>{outVal.toFixed(8)} BTC</span>
            </div>
          </div>
          <hr />
          <div className={"grid-x " + styles.inner}>
            <div className={"cell small-12 medium-12"}>
              Fee<span className={styles.right}>{fee.toFixed(8)} BTC</span>
            </div>
          </div>
          <hr />
          <div className={"grid-x " + styles.inner}>
            <div className={"cell small-12 medium-12"}>
              Size<span className={styles.right}>{size} B</span>
            </div>
          </div>
          <hr />
          <div className={"grid-x " + styles.inner}>
            <div className={"cell small-12 medium-12"}>
              Time<span className={styles.right}>{time}</span>
            </div>
          </div>
          <hr />
          {coinjoin}
          <div className={"grid-x " + styles.inner}>
            <div className={"cell small-12 medium-12"}>
              Inputs({tx.inputs.length})
            </div>
          </div>
          <div className={"grid-x " + styles.inner}>{inputs}</div>
          <hr />
          <div className={"grid-x " + styles.inner}>
            <div className={"cell small-12 medium-12"}>
              Outputs({tx.out.length})
            </div>
          </div>
          <div className={"grid-x " + styles.inner}>{outputs}</div>
          <hr />
        </div>
        <div className={styles.marketing}>
          <div className={"grid-x " + styles.inner}>
            <div
              className={"cell small-12 medium-12"}
              dangerouslySetInnerHTML={{
                __html: Cms.prismicPanel.data.transaction.html,
              }}
            />
          </div>
        </div>
      </>
    )
  }

  const block = () => {
    var hash = props.selected.userData.block.hash
    var height = props.selected.userData.block.height
    var value = props.selected.userData.value
    var foundBy = props.selected.userData.block.foundBy.description
    var nTx = props.selected.userData.block.nTx
    var time = new Date(props.selected.userData.block.time * 1000).toUTCString()
    var size = props.selected.userData.block.size / 1000
    var difficulty = props.selected.userData.block.difficulty

    return (
      <>
        <div className={styles.info}>
          <div className={"grid-x " + styles.inner}>
            <div className={"cell small-12 medium-12"}>Block Hash</div>
          </div>
          <div className={"grid-x " + styles.inner}>
            <div className={"cell small-12 medium-12 " + styles.hash}>
              {hash}
            </div>
          </div>
          <hr />
          <div className={"grid-x " + styles.inner}>
            <div className={"cell small-12 medium-12"}>
              Height<span className={styles.right}>{height}</span>
            </div>
          </div>
          <hr />
          <div className={"grid-x " + styles.inner}>
            <div className={"cell small-12 medium-12"}>
              Size<span className={styles.right}>{size}KB</span>
            </div>
          </div>
          <hr />
          <div className={"grid-x " + styles.inner}>
            <div className={"cell small-12 medium-12"}>
              Difficulty<span className={styles.right}>{difficulty}</span>
            </div>
          </div>
          <hr />
          <div className={"grid-x " + styles.inner}>
            <div className={"cell small-12 medium-12"}>
              Found by<span className={styles.right}>{foundBy}</span>
            </div>
          </div>
          <hr />
          <div className={"grid-x " + styles.inner}>
            <div className={"cell small-12 medium-12"}>
              Time<span className={styles.right}>{time}</span>
            </div>
          </div>
          <hr />
          <div className={"grid-x " + styles.inner}>
            <div className={"cell small-12 medium-12"}>
              No. Tx<span className={styles.right}>{nTx}</span>
            </div>
          </div>
          <hr />
          <div className={"grid-x " + styles.inner}>
            <div className={"cell small-12 medium-12"}>
              Total BTC Sent<span className={styles.right}>{value}</span>
            </div>
          </div>
          <hr />
        </div>
        <div className={styles.marketing}>
          <div className={"grid-x " + styles.inner}>
            <div
              className={"cell small-12 medium-12"}
              dangerouslySetInnerHTML={{
                __html: Cms.prismicPanel.data.block.html,
              }}
            />
          </div>
        </div>
      </>
    )
  }

  var content = ""

  if (
    props.selected !== undefined &&
    props.selected.userData.type === "transaction"
  ) {
    content = transaction()
  }

  if (
    props.selected !== undefined &&
    props.selected.userData.type === "block"
  ) {
    content = block()
  }

  return (
    <div className={styles.sidebarInner}>
      <div className={styles.head}>
        <button className={styles.button} onClick={props.closePanel}>
          CLOSE
        </button>
      </div>
      <div className={styles.content}>{content}</div>
    </div>
  )
}
export default InfoPanel;