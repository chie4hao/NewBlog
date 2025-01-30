import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import BlogList from "../components/BlogList"
import styled from "styled-components"

const Title = styled.h1`
  margin-bottom: 2rem;
  color: #333;
`

const IndexPage = ({ data }) => {
  const posts = data.allMdx.edges

  return (
    <Layout>
      <Title>最新文章</Title>
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

export const Head = () => <title>首页</title>
