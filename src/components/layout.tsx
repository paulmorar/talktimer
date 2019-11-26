/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"

import "./layout.css"

interface Props {
  children: Node
  style?: object
}

const Layout = ({ children, style = {} }: Props) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div style={style}>
        <main>{children}</main>
      </div>
    )}
  />
)

export default Layout
