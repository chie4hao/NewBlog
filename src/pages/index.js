import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import BlogList from "../components/BlogList"
import SeoHead from "../components/SeoHead"

const IndexPage = ({ data }) => {
  const posts = data.allMdx.edges

  return (
    <Layout>
      <BlogList posts={posts} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY年MM月DD日")
            title
            description
            tags
            cover {
              childImageSharp {
                gatsbyImageData(
                  width: 240
                  height: 240
                  transformOptions: {
                    cropFocus: CENTER
                    fit: COVER
                  }
                  quality: 90
                  formats: [AUTO, WEBP]
                  placeholder: BLURRED
                )
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage

export const Head = () => (
  <SeoHead
    title="chie4的博客"
    description="欢迎来到我的博客，这里记录了我在技术、音乐、键盘等领域的探索和思考。"
    pathname="/"
  />
)
