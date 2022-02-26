import React from "react"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import "./info.module.scss"

const InfoPage = ({ data: { prismicInfo } }) => (
  <div className='background'>
    <SEO title="Info" />
    <div className='content'>
      <h1>{prismicInfo.data.title.text}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: prismicInfo.data.content.html }}
      />
      <div>
        <p>
          <Link to="/" className='button'>
            CLOSE
          </Link>
        </p>
      </div>
    </div>
  </div>
)

export default InfoPage

export const pageQuery = graphql`
  query InfoQuery {
    prismicInfo {
      data {
        title {
          text
        }
        content {
          html
        }
      }
    }
  }
`
