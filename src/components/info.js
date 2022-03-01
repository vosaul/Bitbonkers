import React from "react"
import styled from "styled-components"

const Infoline = styled.p`
  font-size: 14px;
  font-family: sans-serif;
  text-align: center;
  * {
    color: #fff;}
  b {
    background-color: #008080;
    padding: 10px;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 100;
  }
`
const Info = () => (
  <Infoline>
    <b
      style={{
        position: "fixed",
        top: "0",
        color: "white",
        zIndex: "100",
      }}
    >
      Shop our Most Popular Product the
      <a href="/products/the-billfodl/"> Billfodl</a>! (Free Domestic Shipping)
    </b>
  </Infoline>
)
export default Info
