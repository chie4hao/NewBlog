import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import BlogList from "../components/BlogList"
import styled from "styled-components"

const Title = styled.h1`
  margin-bottom: 2rem;
  color: #333;
`

const TagTemplate = ({ pageContext, data }) => {
  const { tag } = pageContext
  const posts = data.allMdx.edges

  return (
    <Layout>
      <Title>标签: {tag}</Title>
      <BlogList posts={posts} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMdx(
      sort: { frontmatter: { date: DESC }}
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
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
          }
        }
      }
    }
  }
`

export default TagTemplate

export const Head = ({ pageContext }) => (
  <title>标签: {pageContext.tag}</title>
) 