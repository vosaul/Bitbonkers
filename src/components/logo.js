import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

const Image = styled.img`
  width: 250px;
    z-index: 10;
    width: 100%;
    height: 70px;
`
export default () => {
  const data = useStaticQuery(graphql`
    query {
      prismicLoading {
        data {
          logo {
            alt
            copyright
            url
            fluid {
              src
            }
          }
        }
      }
    }
  `)
  return (
      <Image src="/images/logo.png" alt="logo" />
  )
}
