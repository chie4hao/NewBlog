import React from "react"
import { Link, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import Layout from "../components/Layout"
import styled from "styled-components"
import MDXComponents from "../components/mdx"

const Article = styled.article`
  max-width: 700px;
  margin: 0 auto;
`

const Header = styled.header`
  margin-bottom: 1.5rem;
`

const Title = styled.h1`
  margin-bottom: 0.5rem;
`

const Meta = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`

const Content = styled.div`
  line-height: 1.8;
  
  pre {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    margin: 1.5rem 0;
  }
  
  code {
    background: #f5f5f5;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-size: 0.9em;
  }
  
  blockquote {
    border-left: 4px solid #ddd;
    padding-left: 1rem;
    margin-left: 0;
    color: #666;
  }
  
  p > code, li > code, a > code {
    padding: 0.2rem 0.4rem;
    display: inline;
  }
  
  pre code {
    padding: 0.2rem 0.4rem;
    display: block;
  }
`

const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 2rem 0;
`

const Tag = styled(Link)`
  background: #f0f0f0;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  font-size: 0.8rem;
  color: #666;
  text-decoration: none;
  &:hover {
    background: #e0e0e0;
  }
`

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
`

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  &:hover {
    color: #666;
  }
`

const BlogPostTemplate = ({ data, children, pageContext }) => {
  const post = data.mdx
  const { previous, next } = pageContext

  return (
    <Layout>
      <Article>
        <Header>
          <Title>{post.frontmatter.title}</Title>
          <Meta>
            <time>{post.frontmatter.date}</time>
            {post.frontmatter.updateDate && (
              <span>更新于 {post.frontmatter.updateDate}</span>
            )}
          </Meta>
          {post.frontmatter.description && (
            <p
              style={{
                color: '#666',
                fontSize: '0.9rem',
                fontStyle: 'italic',
                marginTop: '1rem',
                marginBottom: '1rem',
              }}
            >
              {post.frontmatter.description}
            </p>
          )}
        </Header>
        <Content>
          <MDXProvider components={MDXComponents}>
            {children}
          </MDXProvider>
        </Content>
        {post.frontmatter.tags && (
          <Tags>
            {post.frontmatter.tags.map(tag => (
              <Tag key={tag} to={`/tags/${tag}`}>
                {tag}
              </Tag>
            ))}
          </Tags>
        )}
        <Navigation>
          <div>
            {previous && (
              <NavLink to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </NavLink>
            )}
          </div>
          <div>
            {next && (
              <NavLink to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </NavLink>
            )}
          </div>
        </Navigation>
      </Article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "YYYY年MM月DD日")
        updateDate(formatString: "YYYY年MM月DD日")
        description
        tags
      }
    }
  }
`

export default BlogPostTemplate

export const Head = ({ data }) => (
  <title>{data.mdx.frontmatter.title}</title>
) 